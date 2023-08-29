import React from 'react'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { storage } from '../../utils/FirebaseConfig';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { AppRoute } from '../../../App';

export default function AddProduct() {
    const [show, setShow] = useState(false);
    const [ProductName, setProduct] = useState("");
    const [ProductImage, setProductImage] = useState("");


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const addProduct = (e) => {
        e.preventDefault();

        const storageRef = ref(storage, `images/products/${ProductImage.name}`);
        uploadBytes(storageRef, ProductImage).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                const payload = { ProductName: ProductName, ProductImage: url };

                axios.post(`/api/create-product`, payload)
                    .then(json => {
                        // Handle success
                    })
                    .catch(err => {
                        // Handle error
                    });

                setShow(false);
            })
                .catch((error) => {
                    // Handle any errors
                });
        });
    };


    return (
        <>
            <button className='bg-white rounded nav-item d-flex btn bg-white text-primary ms-2' onClick={handleShow}>Add Product</button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={addProduct}>
                        <div className='mb-3'>
                            <label htmlFor='inputEmail' className='form-label'>
                                Product Name
                            </label>
                            <input
                                type='text'
                                className='form-control'
                                id='inputEmail'
                                aria-describedby='ProductHelp'
                                value={ProductName}
                                onChange={(e) => setProduct(e.target.value)}
                            />

                        </div>
                        <div className="mb-3">
                            <label htmlFor="formFile" className="form-label">
                                Product Image
                            </label>
                            <input className="form-control" onChange={(e) => setProductImage(e.target.files[0])} type="file" id="formFile" />
                        </div>
                        <button type='submit' className='btn btn-primary'>
                            Add Product
                        </button>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}