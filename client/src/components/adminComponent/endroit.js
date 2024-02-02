import React, { useState,  useReducer , useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import {
  deleteEndoit,
  deleteImage,
  fetchEndroit,
  updateEndoit,
  updateEndroitPicture,
} from "../../redux/apiCalls/endroitApiCal";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCall";
import { fetchActiviy } from "../../redux/apiCalls/activityApiCall";
import { fetchCities } from "../../redux/apiCalls/cityApiCall";
import Slider from "react-slick"; // import the slider library you want to use
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../Styles/Endroit.css";
import FormControl from "@material-ui/core/FormControl";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Link from "@material-ui/core/Link";
import { FormLabel } from "@material-ui/core";
import KitesurfingOutlinedIcon from "@mui/icons-material/KitesurfingOutlined";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import CategoryIcon from "@mui/icons-material/Category";

import Select from "react-select";
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};
function EndroitCard({ endroit }) {

  const { categories } = useSelector((state) => state.category);
  const { cities } = useSelector((state) => state.city);
  const { activities } = useSelector((state) => state.activity);

  const dispatch = useDispatch();
 
  const [reducer , forceUpdate]=useReducer(x=>x+1,0)
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPic, setIsEditingPic] = useState(false);
  const [name, setname] = useState("");
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [category, setCategory] = React.useState([]);
  const [activity, setActivity] = React.useState([]);
  const [city, setCity] = React.useState(null);
  //const [catId , setCatId]=useState([])
  var catId = [];
  var actId = [];
  const Categoryoptions = categories.map((cat) => ({
    value: cat._id,
    label: cat.title,
  }));

  const Cityoptions = cities.map((city) => ({
    value: city._id,
    label: city.name,
  }));
  const Activityoptions = activities.map((activity) => ({
    value: activity._id,
    label: activity.name,
  }));

  const change = async (tab) => {
    for (const c of tab) {
      catId.push(c.value);
    }
  };
  const changeAct = async (tab) => {
    for (const c of tab) {
      actId.push(c.value);
    }
  };

  // update endroit
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (category) {
      change(category)
      dispatch(updateEndoit({ catId }, endroit?._id),[reducer]);
    }
    if (activity) {
      changeAct(activity)
      dispatch(updateEndoit({ actId }, endroit?._id),[reducer]);
    }
    if (name || description || city) {
    dispatch(
      updateEndoit({ name, description, city}, endroit?._id),[reducer]
    );}
   
    setIsEditing(false);
    forceUpdate();

  };

  useEffect(() => {
    dispatch(fetchCategories(), fetchActiviy(), fetchCities(), fetchEndroit())
  }, [dispatch]);
  //update endoit image submithandler
  const updateImageSubmitHandler = (e) => {
    e.preventDefault();
    setIsEditingPic(true);
    if (!file) return toast.warning("there is no file");
    const data = new FormData();
    data.append("image", file);
    dispatch(updateEndroitPicture(data, endroit?._id),[reducer]);
    forceUpdate()
  };

  // // Delete Post Handler
  const deleteEndroitHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this place!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteEndoit(endroit?._id));
      } else {
        swal("Something went wrong!");
      }
    });
  };

  // delete  endoit image submithandler
  const handleDeleteImage = (imageId) => {
    dispatch(deleteImage(endroit?._id, imageId));
  };

  const catlist = endroit.categories.map((item) => (
    <div key={item._id} category={item}>
      {item.title}
    </div>
  ));
  const actList = endroit.activities.map((item) => (
    <div key={item._id} activity={item}>
      {item.name}
    </div>
  ));

  const MAX_DESCRIPTION_LENGTH = 20; // Maximum length of truncated description

  const [showFullDescription, setShowFullDescription] = useState(false);

  // Your component logic and state here

  const toggleDescription = () => {
    setShowFullDescription((prevState) => !prevState);
    swal({
      title: "Description",
      text: endroit.description,
    });
  };

  const getDescription = () => {
    if (endroit.description.length <= MAX_DESCRIPTION_LENGTH) {
      return endroit.description;
    }
    return `${endroit.description.substring(0, MAX_DESCRIPTION_LENGTH)}...`;
  };

  const handleChange = (e) => {
    setCategory(e);
  };

  const handleChangeAct = (e) => {
    setActivity(e);
  };
  return (
    <Card className="endroit-card">
      <ToastContainer theme="colored"></ToastContainer>
      {isEditingPic && (
        <FormControl className="image-form">
          <FormLabel htmlFor="file" className=" upload-photo-icon">
            <i className="bi bi-image-fill" />
            select new picture
          </FormLabel>
          <TextField
            style={{ display: "none" }}
            type="file"
            name="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            onClick={updateImageSubmitHandler}
            className="upload-photo-btn"
            type="submit"
          >
            Upload
          </Button>
          <Button
            
            onClick={() => setIsEditingPic(false)}
            className="upload-photo-btn"
            type="submit"
          >
            Cancel
          </Button>
        </FormControl>
      )}

      {!isEditing && !isEditingPic && (
        <>
          <Slider {...settings} className="endroit-slick-slider">
            {endroit?.pictures?.map((item, index) => (
              <div key={index} className="place-image-container">
                <img className="place-image" src={item?.url} alt="aaaa" />
                <div className="slider-icon" id={`slider-icon-${index}`}>
                  <i
                    className="bi bi-pencil icon"
                    onClick={updateImageSubmitHandler}
                  ></i>
                  <i
                    className="bi bi-trash-fill icon"
                    onClick={() => {
                      handleDeleteImage(item?.publicId);
                    }}
                  ></i>
                </div>
              </div>
            ))}
          </Slider>
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {endroit?.name}
            </Typography>
            <Typography gutterBottom variant="subtitle2" component="div">
              {getDescription()}
            </Typography>
            {endroit.description.length > MAX_DESCRIPTION_LENGTH && (
              <Link onClick={toggleDescription}> <Button className="link-btn">  Show More</Button></Link>
            )}
            <div className="listitem">
            <CategoryIcon className="sideLInk" />
              <div className="catitem"> {catlist}</div>
            </div>
            <div className="listitem">
            <KitesurfingOutlinedIcon className="sideLInk"/>
              <div className="catitem"> {actList}</div>
            </div>
            <Typography gutterBottom variant="subtitle2" component="div">
              <div className="listitem">
              <LocationCityIcon className="sideLInk" />
                {endroit?.city?.name}{" "}
              </div>
            </Typography>
          </CardContent>

          {!endroit.readOnly && (
            <>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => {
                    setIsEditing(true);
                    setname(endroit?.name);
                    setDescription(endroit?.description);
                    setCategory(endroit?.category);
                    setActivity(endroit?.activity);
                    setCity(endroit.setCity);
                    setFile("");
                  }}
                  startIcon={<EditIcon />}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  onClick={deleteEndroitHandler}
                  startIcon={<DeleteIcon />}
                >
                  {" "}
                  Delete
                </Button>
              </CardActions>
            </>
          )}
        </>
      )}

      {isEditing && (
        <FormControl>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1 },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              autoFocus
              onChange={(e) => setname(e.target.value)}
              type="text"
              className="form-control form-control-sm"
              value={name}
              placeholder="place"
            />
            <TextField
              autoFocus
              onChange={(e) => setDescription(e.target.value)}
              type="textarea"
              className="form-control form-control-sm"
              value={description}
              placeholder="place description"
            />

            <Select
              options={Categoryoptions}
              isMulti
              value={category}
              onChange={handleChange}
            />

            <Select
              options={Activityoptions}
              isMulti
              value={activity}
              onChange={handleChangeAct}
            />

            <Select
              options={Cityoptions}
              value={city}
              onChange={(Cityoptions) => setCity(Cityoptions.value)}
            />
          </Box>
          <Button
           size="small" 
            type="submit"
            onClick={formSubmitHandler}
          >
            {" "}
            Save{" "}
          </Button>{" "}
          <Button size="small" onClick={() => setIsEditing(false)}>
            {" "}
            Cancel
          </Button>
        </FormControl>
      )}
    </Card>
  );
}

export default EndroitCard;
