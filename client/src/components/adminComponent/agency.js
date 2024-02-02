import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../Styles/Endroit.css";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import {
  deleteAgency,
  updateAgency,
  updateAgencyPicture,
} from "../../redux/apiCalls/agencyApiCall";
import "../../Styles/agency.css";

import FormControl from "@material-ui/core/FormControl";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { FormLabel } from "@material-ui/core";


function AgencyCard({ agency }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(agency?.name);
  const [url, setUrl] = useState(agency?.url);
  const [file, setFile] = useState(agency.picture.url);
  const [deleted, setDeleted] = useState(false); 
 
  // Update agency
  const formSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(updateAgency({ name, url }, agency?._id));
    setIsEditing(false);
  };

  // Update agency image submit handler
  const updateImageSubmitHandler = (e) => {
    e.preventDefault();
    if (!file) return toast.warning("There is no file");
    const data = new FormData();
    data.append("image", file);
    dispatch(updateAgencyPicture(data, agency?._id));
  };

  // Delete agency handler
  // const deleteAgencyHandler = () => {
  //   swal({
  //     title: "Are you sure?",
  //     text: "Once deleted, you will not be able to recover this place!",
  //     icon: "warning",
  //     buttons: true,
  //     dangerMode: true,
  //   }).then((willDelete) => {
  //     if (willDelete) {
  //       dispatch(deleteAgency(agency?._id));
  //     } else {
  //       swal("Something went wrong!");
  //     }
  //   });
  // };
  const deleteAgencyHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this agency!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteAgency(agency?._id))
          .then(() => {
            setDeleted(true); // Set the deleted flag to true
          })
          .catch(() => {
            swal("Something went wrong!");
          });
      } else {
        swal("Agency not deleted!");
      }
    });
  };

  return (
    <Card className="agency-card">
      <ToastContainer theme="colored"></ToastContainer>
      {isEditing ? (
        <FormControl onSubmit={updateImageSubmitHandler} className="image-form">
          <FormLabel htmlFor="file" className="upload-photo-icon">
            <i className="bi bi-image-fill" />
            select new picture
          </FormLabel>
          <TextField
            style={{ display: "none" }}
            type="file"
            name="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          ></TextField>
          <Button
            onClick={updateImageSubmitHandler}
            className="upload-photo-btn"
            type="submit"
          >
            upload
          </Button>
        </FormControl>
      ) : (
        <>
          <CardMedia
            component="img"
            alt="green iguana"
            height="270"
            src={agency?.picture.url}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <Link to={url}>TRANSFER</Link>
          </CardContent>
          {!agency.readOnly && (
            <CardActions>
              <Button
                size="small"
                onClick={() => setIsEditing(true)}
                startIcon={<EditIcon />}
              >
                Edit
              </Button>
              <Button
                size="small"
                onClick={deleteAgencyHandler}
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </CardActions>
          )}
        </>
      )}

      {isEditing && (
        <FormControl>
          <Box
            component="form"
            sx={{ "& > :not(style)": { m: 1 } }}
            noValidate
            autoComplete="off"
          >
            <TextField
              autoFocus
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="form-control form-control-sm"
              value={name}
              placeholder="title"
            />
            <TextField
              autoFocus
              onChange={(e) => setUrl(e.target.value)}
              type="text"
              className="form-control form-control-sm"
              value={url}
              placeholder="URL"
            />
          </Box>
          <Button size="small" type="submit" onClick={formSubmitHandler}>
            Save
          </Button>{" "}
          <Button size="small" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        </FormControl>
      )}
    </Card>
  );
}

export default AgencyCard;
