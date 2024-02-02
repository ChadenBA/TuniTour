import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCity, fetchCities } from '../../redux/apiCalls/cityApiCall';
import Sidebar from '../../components/adminComponent/sidebar';
import CityList from '../../components/adminComponent/cityList';
import { toast, ToastContainer } from 'react-toastify';
import { RotatingLines } from 'react-loader-spinner';
import Modal from 'react-modal';
import '../../Styles/places.css';
import '../../Styles/cities.css';
import '../../Styles/createEndroit.css';

Modal.setAppElement('#root');

export default function Cities() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedPictures, setSelectedPictures] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { loading } = useSelector((state) => state.city);
  const dispatch = useDispatch();
  const { cities } = useSelector((state) => state.city);

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    setSelectedPictures(files);
  };

  const formData = new FormData();
  formData.append('name', name);
  formData.append('description', description);

  selectedPictures.forEach((picture) => {
    formData.append('image', picture);
  });

  useEffect(() => {
    dispatch(fetchCities());
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (name.trim() === '') return toast.error('name is required');
    if (description.trim() === '') return toast.error('description is required');

    dispatch(createCity(formData));
    setName('');
    setDescription('');
    setSelectedPictures([]);
    setIsFormOpen(false);
  };

  const handleCreateCity = () => {
    setIsFormOpen(true);
  };

  const closeModal = () => {
    setIsFormOpen(false);
  };

  return (
    <div className="endroitpage">
      <div className="endroitpage-container">
        <div className="sidePart">
          <Sidebar />
        </div>
        <div className="right-part">
        <div className='right-Part-header'>
          <button className="create-btn" onClick={handleCreateCity}>
            <i className="bi bi-plus-lg"></i> Add new city
          </button>
          <div className="placepage-title">
            <h4>
              {" "}
              TUNISIA <span>Cities</span>
            </h4>
         
          </div>
          </div>
          <hr className="line"></hr>
          <CityList cities={cities} className="city-list" />

          <section className="create-city">
            <ToastContainer theme="colored" position="top-center" />
          
          
            <Modal
              isOpen={isFormOpen}
              onRequestClose={closeModal}
              contentLabel="Create City"
              className="create-activity-modal"
              overlayClassName="create-activity-modal-overlay"
            >
              <button className="modal-close" onClick={closeModal}>
                &times;
              </button>
              <form onSubmit={submitHandler} className="create-activity-form">
              <h1 className="create-endroit-title">Create new City</h1>
                <input
                  type="text"
                  placeholder="city name"
                  className="create-activity-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <textarea
                  placeholder="city description"
                  className="create-activity-textarea"
                  rows="5"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

                <input
                  multiple
                  type="file"
                  name="file"
                  className="create-activity-upload"
                  placeholder="choose a picture"
                  onChange={handleFileSelect}
                />

                <button type="submit" className="create-activities-btn">
                  {loading ? (
                    <RotatingLines
                      strokeColor="grey"
                      strokeWidth="5"
                      animationDuration="0.75"
                      width="50"
                      visible={true}
                    />
                  ) : (
                    'Add'
                  )}
                </button>
              </form>
            </Modal>
          </section>
        </div>
      </div>
    </div>
  );
}
