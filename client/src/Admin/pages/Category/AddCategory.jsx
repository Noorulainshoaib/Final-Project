import React from 'react'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { storage } from '../../utils/FirebaseConfig';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { AppRoute } from '../../../App';


export default function AddCategory() {
    const [show, setShow] = useState(false);
    const [CategoryName, setCategoryName] = useState("");
    const [categoryImage, setCategoryImage] = useState("");


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const addCategory = (e) => {
        e.preventDefault();

        const storageRef = ref(storage, `images/categories/${categoryImage.name}`);
        uploadBytes(storageRef, categoryImage).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                const payload = { CategoryName: CategoryName, CategoryImage: url };

                axios.post(`/api/create-category`, payload)
                    .then(json => {
                        // console.log(json.data);
                    })
                    setShow(false)
                    .catch(err => console.log(err));
            })
                .catch((error) => {
                    // Handle any errors
                });
        });
    }

    return (
        <>
            <button className='bg-white rounded nav-item d-flex btn bg-white text-primary ms-2' onClick={handleShow}>Add Category</button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={addCategory}>
                        <div className='mb-3'>
                            <label htmlFor='inputEmail' className='form-label'>
                                Category Name
                            </label>
                            <input
                                className='form-control'
                                id='inputEmail'
                                aria-describedby='categorynameHelp'
                                value={CategoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="formFile" className="form-label">
                                Category Image
                            </label>
                            <input className="form-control" onChange={(e) => setCategoryImage(e.target.files[0])} type="file" id="formFile" />
                        </div>
                        <button type='submit' className='btn btn-primary'>
                            Add Category
                        </button>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}