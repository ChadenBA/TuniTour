import React, { useState, useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, createCategory } from '../../redux/apiCalls/categoryApiCall';
import Sidebar from '../../components/adminComponent/sidebar';
import CategoryList from '../../components/adminComponent/categoryList';
import { toast, ToastContainer } from 'react-toastify';
import { RotatingLines } from 'react-loader-spinner';
import Modal from 'react-modal';
import '../../Styles/category.css';
import '../../Styles/createEndroit.css';

Modal.setAppElement('#root');

export default function Category() {
  const [title, setTitle] = useState();
  const [isFormOpen, setIsFormOpen] = useState(false);
 
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.category);

  const submitHandler = (e) => {
    e.preventDefault();
    if (title.trim() === '') return toast.error('name is required');

    dispatch(createCategory({ title }));
    setTitle('');
    setIsFormOpen(false);  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCreateCategory = () => {
    setIsFormOpen(true);
  };

  const closeModal = () => {
    setIsFormOpen(false);
  };

  return (
    <div className="categorypage">
      <div className="categorypage-container">
        <div className="sidePart">
          <Sidebar />
        </div>

        <div className="cat-right-Part">
        <div className='right-Part-header'>
          <button className="create-btn" onClick={handleCreateCategory}>
            <i className="bi bi-plus-lg"></i> Add new category
          </button>
          <div className="placepage-title">
            <h4>
              {" "}
              TUNISIA <span>Categories</span>
            </h4>
         
          </div>
          </div>
          <hr className="line"></hr>
          <CategoryList categories={categories} className="category-list" />

          <section className="create-cat">
            <ToastContainer theme="colored" position="top-center" />
            
            
            <Modal
              isOpen={isFormOpen}
              onRequestClose={closeModal}
              contentLabel="Create Category"
              className="create-activity-modal"
              overlayClassName="create-activity-modal-overlay"
            >
              <button className="modal-close" onClick={closeModal}>
                &times;
              </button>
              <form onSubmit={submitHandler} className="create-activity-form">
              <h1 className="create-endroit-title">Create new category</h1>
                <input
                  type="text"
                  placeholder="category title"
                  className="create-activity-input"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
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
