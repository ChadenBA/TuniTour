import React, { useState, useReducer } from "react";

import "../../Styles/Endroit.css";
import "../../Styles/cities.css";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import {
  deleteCity,
  updateCity,
  deleteImage,
  updateCityPicture,
} from "../../redux/apiCalls/cityApiCall";

import Slider from "react-slick"; // import the slider library you want to use
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Link } from "@material-ui/core";
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
import { FormLabel } from "@material-ui/core";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

function CityCard({ city }) {
  const [reducer, forceUpdate] = useReducer((x) => x + 1, 0);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setname] = useState("");
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [isEditingPic, setIsEditingPic] = useState(false);

  // update city
  const formSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(updateCity({ name, description }, city?._id), [reducer]);
    setIsEditing(false);
    forceUpdate();
  };
  //update city image submithandler

  const updateImageSubmitHandler = (e) => {
    e.preventDefault();
    setIsEditingPic(true);
    if (!file) return toast.warning("there is no file");
    const data = new FormData();
    data.append("image", file);
    dispatch(updateCityPicture(data, city?._id, city?.pictures[0].publicId));
  };

  // // Delete city Handler
  const deleteCityHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this city!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteCity(city?._id), [reducer]);
        forceUpdate();
      } else {
        swal("Something went wrong!");
      }
    });
  };
  // delete  endoit image submithandler
  const handleDeleteImage = (imageId) => {
    dispatch(deleteImage(city?._id, imageId));
  };
  const MAX_DESCRIPTION_LENGTH = 50; // Maximum length of truncated description

  const [showFullDescription, setShowFullDescription] = useState(false);

  // Your component logic and state here

  const toggleDescription = () => {
    setShowFullDescription((prevState) => !prevState);
    swal({
      title: "Description",
      text: city.description,
    });
  };
  const getDescription = () => {
    if (city.description.length <= MAX_DESCRIPTION_LENGTH) {
      return city.description;
    }
    return `${city.description.substring(0, MAX_DESCRIPTION_LENGTH)}...`;
  };
  return (
    <Card className="city-card">
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
            upload
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
          <Slider {...settings} className="city-slick-slider">
            {city?.pictures?.map((item, index) => (
              <div key={index} className="city-image-container">
                <img className="city-image" src={item?.url} alt="aaaa" />

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
            <Typography gutterBottom variant="h5" component="div">
              {city?.name}
            </Typography>
            <Typography gutterBottom variant="subtitle2" component="div">
              {getDescription()}
            </Typography>

            {city.description.length > MAX_DESCRIPTION_LENGTH && (
              <Link onClick={toggleDescription}>
                <Button className="link-btn"> Show More</Button>
              </Link>
            )}
          </CardContent>
          {!city.readOnly && (
            <>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => {
                    setIsEditing(true);
                    setname(city?.name);
                    setDescription(city?.description);
                    setFile("");
                  }}
                  startIcon={<EditIcon />}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  onClick={deleteCityHandler}
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
              placeholder="endroit"
            />
            <TextField
              autoFocus
              onChange={(e) => setDescription(e.target.value)}
              type="textarea"
              className="form-control form-control-sm"
              value={description}
              placeholder="endroit description"
            />
          </Box>
          <Button size="small" type="submit" onClick={formSubmitHandler}>
            {" "}
            Save{" "}
          </Button>{" "}
          <Button size="small" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        </FormControl>
      )}
    </Card>
  );
}

export default CityCard;
