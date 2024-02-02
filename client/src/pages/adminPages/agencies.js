import React, { useState, useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAgency, fetchAgency } from '../../redux/apiCalls/agencyApiCall';
import Sidebar from '../../components/adminComponent/sidebar';
import { toast, ToastContainer } from 'react-toastify';
import { RotatingLines } from 'react-loader-spinner';
import Modal from 'react-modal';
import AgencyList from '../../components/adminComponent/agencyList';
import '../../Styles/agency.css';
import '../../Styles/places.css';
import '../../Styles/createEndroit.css';

Modal.setAppElement('#root');

export default function Agency() {
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  // const [reducer, forceUpdate] = useReducer((x) => x + 1, 0);
  const [name, setName] = useState('');
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { loading } = useSelector((state) => state.agency);
  const dispatch = useDispatch();
  const { agencies } = useSelector((state) => state.agency);

  const formData = new FormData();
  formData.append('image', file);
  formData.append('name', name);
  formData.append('url', url);

  useEffect(() => {
    dispatch(fetchAgency());
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (name.trim() === '') return toast.error('name is required');
    if (url.trim() === '') return toast.error('url is required');
    if (!file) return toast.error('picture is required');

    dispatch(createAgency(formData),[]);
    forceUpdate();
    // Reset the form fields
    setName('');
    setUrl('');
    setFile(null);
    setIsFormOpen(false);
  };

  const handleCreateAgency = () => {
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
          <button className="create-btn" onClick={handleCreateAgency}>
            <i className="bi bi-plus-lg"></i> Add new agency
          </button>
          <div className="placepage-title">
            <h4>
              {" "}
              TUNISIA <span>Agencies</span>
            </h4>
         
          </div>
          </div>
          <hr className="line"></hr>
          <AgencyList agencies={agencies} className="agency-list" />
          <section className="create-agency">
            <ToastContainer theme="colored" position="top-center" />
          
           
            <Modal
              isOpen={isFormOpen}
              onRequestClose={closeModal}
              contentLabel="Create Agency"
              className="create-activity-modal"
              overlayClassName="create-activity-modal-overlay"
            >
              <button className="modal-close" onClick={closeModal}>
                &times;
              </button>
              <form onSubmit={submitHandler} className="create-agency-form">
              <h1 className="create-endroit-title">Create new Agency</h1>
                <input
                  type="text"
                  placeholder="agency name"
                  className="create-activity-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <input
                  type="text"
                  placeholder="agency url"
                  className="create-activity-input"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
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
                      width="30"
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
