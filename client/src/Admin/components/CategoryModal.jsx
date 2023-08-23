import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { storage } from '../utils/FirebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';
import Spinner from 'react-bootstrap/Spinner'; // Import Spinner component
import { AppRoute } from '../../App';

function CategoryModal({ recallData }) {
  const [show, setShow] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [categoryImage, setCategoryImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addCategory = (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    const storageRef = ref(storage, `images/categories/${categoryImage.name}`);
    uploadBytes(storageRef, categoryImage).then((snapshot) => {
      getDownloadURL(snapshot.ref)
        .then((url) => {
          const payload = {
            CategoryName: categoryName,
            CategoryImage: url,
          };

          axios
            .post('/api/create-category', payload)
            .then((json) => {
              setIsLoading(false); // Stop loading
              setShow(false);
              recallData(json.data.category);
              Swal.fire({
                icon: 'success',
                title: 'Category Added Successfully',
                showConfirmButton: false,
                timer: 3000,
              });
            })
            .catch((err) => {
              setIsLoading(false); // Stop loading
              console.error(err);
              alert(err.message);
            });
        })
        .catch((error) => {
          setIsLoading(false); // Stop loading
          alert(error.message);
        });
    });
  };

  return (
    <>
      <Button variant="dark" style={{ width: '140px' }} onClick={handleShow}>
        Add Category
      </Button>

      <Modal show={show} onHide={handleClose} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isLoading ? (
            <div className="d-flex justify-content-center align-items-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <form onSubmit={addCategory}>
              <div className="mb-3">
                <label htmlFor="CategoryName" className="form-label">
                  Category Name
                </label>
                <input
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  type="text"
                  className="form-control"
                  id="CategoryName"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="formFile" className="form-label">
                  Category Image
                </label>
                <input
                  className="form-control"
                  onChange={(e) => setCategoryImage(e.target.files[0])}
                  type="file"
                  id="formFile"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CategoryModal;