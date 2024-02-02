import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createAcivity,
  fetchActiviy,
} from '../../redux/apiCalls/activityApiCall';
import Activitylist from '../../components/adminComponent/ActivityList';
import SimpleImageSlider from 'react-simple-image-slider';
import Sidebar from '../../components/adminComponent/sidebar';
import { toast, ToastContainer } from 'react-toastify';
import Modal from 'react-modal';
import { RotatingLines } from 'react-loader-spinner';
import '../../Styles/places.css';
import '../../Styles/activities.css';
import '../../Styles/createEndroit.css';

Modal.setAppElement('#root');

export default function Activities() {
  const dispatch = useDispatch();
  const { activities, loading } = useSelector((state) => state.activity);

  useEffect(() => {
    dispatch(fetchActiviy());
  }, [dispatch]);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    if (name.trim() === '') return toast.error('name is required');
    if (description.trim() === '') return toast.error('description is required');
    if (!file) return toast.error('image is required');

    const formData = new FormData();
    formData.append('image', file);
    formData.append('name', name);
    formData.append('description', description);

    dispatch(createAcivity(formData));
    setFile(null);
    setName('');
    setDescription('');
    setIsFormOpen(false);
  };

  const handleCreateActivity = () => {
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
        <div className="right-Part">
          <div className="right-Part-header">
            <button className="create-btn" onClick={handleCreateActivity}>
              <i className="bi bi-plus-lg"></i> Add new activity
            </button>
            <div className="placepage-title">
              <h4>
                TUNISIA <span>Activities</span>
              </h4>
            </div>
          </div>
          <hr className="line"></hr>

          <SimpleImageSlider width={250} images={activities} showNavs={true} />
          <Activitylist activities={activities} className="activity-list" />
          <section className="create-activity">
            <ToastContainer theme="colored" position="top-center" />

            <Modal
              isOpen={isFormOpen}
              onRequestClose={closeModal}
              contentLabel="Create Activity"
              className="create-activity-modal"
              overlayClassName="create-activity-modal-overlay"
            >
              <button className="modal-close" onClick={closeModal}>
                &times;
              </button>
              <form onSubmit={submitHandler} className="create-activity-form">
                <h1 className="create-endroit-title">Create new Activity</h1>
                <input
                  type="text"
                  placeholder="activity name"
                  className="create-activity-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <textarea
                  placeholder="activity description"
                  className="create-activity-textarea"
                  rows="5"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

                <input
                  type="file"
                  name="file"
                  className="create-activity-upload"
                  onChange={(e) => setFile(e.target.files[0])}
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
