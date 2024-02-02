import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { createEndroit } from "../../redux/apiCalls/endroitApiCal";
import { RotatingLines } from "react-loader-spinner";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCall";
import { fetchCities } from "../../redux/apiCalls/cityApiCall";
import { fetchActiviy } from "../../redux/apiCalls/activityApiCall";
import Modal from "react-modal";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";



Modal.setAppElement('#root');


const CreateEndroit = ({ closeModal }) => {
  const dispatch = useDispatch();
  const { loading, isEndroitCreated } = useSelector((state) => state.endroit);
  const { categories } = useSelector((state) => state.category);
  const { cities } = useSelector((state) => state.city);
  const { activities } = useSelector((state) => state.activity);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedPictures, setSelectedPictures] = useState([]);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchCities());
    dispatch(fetchActiviy());
  }, [dispatch]);

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    setSelectedPictures(files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === '') return toast.error('Name is required');
    if (description.trim() === '') return toast.error('Description is required');
    if (selectedCategories.length === 0) return toast.error('Category is required');
    if (selectedActivities.length === 0) return toast.error('Activity is required');
    if (selectedCity === null) return toast.error('City is required');
    if (!selectedPictures.length) return toast.error('Please select an image');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('city', selectedCity);

    selectedCategories.forEach((category) => {
      formData.append('categories[]', category);
    });

    selectedActivities.forEach((activity) => {
      formData.append('activities[]', activity);
    });

    selectedPictures.forEach((picture) => {
      formData.append('image', picture);
    });

    dispatch(createEndroit(formData));
  };

  useEffect(() => {
    if (isEndroitCreated) {
      closeModal();
      toast.success('Endroit created successfully');
    }
  }, [isEndroitCreated, closeModal]);

  return (
    <div className="create-endroit">
      <h1 className="create-endroit-title">Create New Place</h1>
      <form onSubmit={handleSubmit} className="create-endroit-form">
        <input
          className="create-endroit-input"
          type="text"
          placeholder="Place Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <FormControl>
          <InputLabel id="category-label">Categories</InputLabel>
          <Select
            className="select"
            labelId="category-label"
            multiple
            value={selectedCategories}
            onChange={(e) => setSelectedCategories(e.target.value)}
          >
            {categories.map((category) => (
              <MenuItem key={category._id} value={category._id}>
                {category.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <textarea
          className="create-endroit-textarea"
          placeholder="Place Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <FormControl>
          <InputLabel id="activity-label">Activities</InputLabel>
          <Select
            className="select"
            labelId="activity-label"
            multiple
            value={selectedActivities}
            onChange={(e) => setSelectedActivities(e.target.value)}
          >
            {activities.map((activity) => (
              <MenuItem key={activity._id} value={activity._id}>
                {activity.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
        <input
          type="file"
          name="file"
          multiple
          onChange={handleFileSelect}
          className="create-endroit-upload"
          placeholder="Choose File (Sélectionner un fichier)"
        />
        <FormControl>
          <InputLabel id="city-label">City</InputLabel>
          <Select
            className="select"
            labelId="city-label"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            {cities.map((city) => (
              <MenuItem key={city._id} value={city._id}>
                {city.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <button className="create-endroit-btn" type="submit">
          {loading ? (
            <RotatingLines
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="0.75"
              width="30"
              visible={true}
            />
          ) : (
            'Add'
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateEndroit;



