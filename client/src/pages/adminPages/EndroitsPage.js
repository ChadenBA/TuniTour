import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../redux/apiCalls/categoryApiCall';
import Sidebar from '../../components/adminComponent/sidebar';
import EndroitList from '../../components/adminComponent/endroitList';
import { toast, ToastContainer } from 'react-toastify';
import Modal from 'react-modal';
import CreateEndroit from '../../components/adminComponent/createPlace';
import '../../Styles/places.css';
import { fetchEndroit } from '../../redux/apiCalls/endroitApiCal';

Modal.setAppElement('#root');

const EndroitPage = () => {
  const dispatch = useDispatch();
  const { endroits} = useSelector(state => state.endroit);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  useEffect(() => {
    dispatch(fetchEndroit());
  }, [dispatch]);

  const handleCreateEndroit = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="endroitpage">
      <div className="endroitpage-container">
        <div className="place-sidePart">
          <Sidebar />
        </div>
        <div className="right-Part">
          <div className="right-Part-header">
            <button className="create-btn" onClick={handleCreateEndroit}>
              <i className="bi bi-plus-lg"></i> Add New Place
            </button>
            <div className="placepage-title">
              <h4>
                TUNISIA <span>Places</span>
              </h4>
            </div>
          </div>
          <hr className="line"></hr>
          <EndroitList endroits={endroits} 
          className="endroit-list" />
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Create Endroit"
            className="create-endroit-modal"
            overlayClassName="create-endroit-modal-overlay"
          >
            <button className="modal-close" onClick={closeModal}>
              &times;
            </button>
            <CreateEndroit closeModal={closeModal} />
          </Modal>
        </div>
      </div>
      <ToastContainer theme="colored" position="top-center" />
    </div>
  );
};

export default EndroitPage;


