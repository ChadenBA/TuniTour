import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import swal from 'sweetalert';
import Link from '@material-ui/core/Link';
import FormControl from '@material-ui/core/FormControl';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { FormLabel } from '@material-ui/core';
import {
  deleteActiivty,
  fetchActiviy,
  updateActivity,
  updateActivityPicture,
} from '../../redux/apiCalls/activityApiCall';

function ActivityCard({ activity }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setname] = useState(activity.name);
  const [file, setFile] = useState(activity.description);
  const [description, setDescription] = useState('');

  useEffect(() => {
    setname(activity.name);
    setDescription(activity.description);
  }, [activity.name, activity.description]);

  // update endroit
  const formSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(updateActivity({ name, description }, activity?._id) , fetchActiviy(),[dispatch]);
    setIsEditing(false);
  };

  //update endoit image submithandler
  const updateImageSubmitHandler = (e) => {
    e.preventDefault();
    if (!file) return toast.warning('there is no file');
    const data = new FormData();
    data.append('image', file);
    dispatch(updateActivityPicture(data, activity?._id));
  };

  // // Delete Post Handler
  const deleteActivityHandler = () => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this activity!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteActiivty(activity?._id));
      } else {
        swal('Something went wrong!');
      }
    });
  };

  const MAX_DESCRIPTION_LENGTH = 20; // Maximum length of truncated description

  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription((prevState) => !prevState);
    swal({
      title: 'Description',
      text: activity.description,
    });
  };

  const getDescription = () => {
    if (activity.description.length <= MAX_DESCRIPTION_LENGTH) {
      return activity.description;
    }
    return `${activity.description.substring(0, MAX_DESCRIPTION_LENGTH)}...`;
  };

  return (
    <Card className="card">
      <ToastContainer theme="colored"></ToastContainer>
      {isEditing && (
        <FormControl className="image-form">
          <FormLabel htmlFor="file" className=" upload-photo-icon">
            <i className="bi bi-image-fill" />
            select new picture
          </FormLabel>
          <TextField
            style={{ display: 'none' }}
            type="file"
            name="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button onClick={updateImageSubmitHandler} className="upload-photo-btn" type="submit">
            upload
          </Button>
        </FormControl>
      )}

      {!isEditing && (
        <>
          <CardMedia
            className="activity-card-image"
            component="img"
            alt="green iguana"
            height="270"
            src={activity?.picture.url}
          />

          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {activity.name}
            </Typography>
            <Typography gutterBottom variant="subtitle2" component="div">
              {getDescription()}
            </Typography>
            {activity.description.length > MAX_DESCRIPTION_LENGTH && (
              <Link onClick={toggleDescription}>
                {' '}
                <Button className="link-btn"> Show More</Button>
              </Link>
            )}
          </CardContent>
          {!activity.readOnly && (
            <>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => {
                    setIsEditing(true);
                    setname(activity?.name);
                    setFile('');
                    setDescription(activity.description);
                  }}
                  startIcon={<EditIcon />}
                >
                  Edit
                </Button>
                <Button size="small" onClick={deleteActivityHandler} startIcon={<DeleteIcon />}>
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
              '& > :not(style)': { m: 1 },
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
              placeholder="activity name "
            />
            <TextField
              autoFocus
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              className="form-control form-control-sm"
              value={description}
              placeholder="activity description"
            />
          </Box>
          <Button size="small" type="submit" onClick={formSubmitHandler}>
            Save
          </Button>{' '}
          <Button size="small" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        </FormControl>
      )}
    </Card>
  );
}

export default ActivityCard;
