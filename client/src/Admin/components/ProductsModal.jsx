import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { storage } from '../utils/FirebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { AppRoute } from '../../App';

function ProductsModal({ recallData }) {
  const [show, setShow] = useState(false);
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const MultipleImageUpload = async () => {
    const promises = images.map((val) => {
      const imageRef = ref(storage, `/images/products/${productName}/${val.name}`);
      return uploadBytes(imageRef, val).then((snapshot) => {
        return getDownloadURL(snapshot.ref);
      });
    });
    return Promise.all(promises);
  };

  const AddProduct = async (e) => {
    e.preventDefault();

    try {
      const uploadImageUrls = await MultipleImageUpload();

      const payload = {
        productName,
        price,
        images: uploadImageUrls,
      };

      const response = await axios.post('/api/create-product', payload);
      setShow(false);
      recallData(response.data.products);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <>
      <Button variant="dark" style={{ width: '140px' }} onClick={handleShow}>
        Add Product
      </Button>

      <Modal show={show} onHide={handleClose} centered backdrop="static" size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={AddProduct}>
            {/* Product Name */}
            <Form.Control
              type="text"
              placeholder="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />

            {/* Product Price */}
            <Form.Control
              type="number"
              placeholder="Product Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />

            {/* Images */}
            {images.map((val, key) => (
              <div key={key}>
                <img
                  style={{ height: '100px', objectFit: 'contain' }}
                  src={URL.createObjectURL(val)}
                  alt=""
                />
              </div>
            ))}
            <input
              type="file"
              onChange={(e) => setImages([...images, e.target.files[0]])}
              required
            />

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ProductsModal;
