import React from 'react'
import { useState } from 'react';
import { AiFillDelete } from 'react-icons/ai'
import { Modal } from 'react-bootstrap'
import axios from 'axios';
import { AppRoute } from '../../../App';

export default function DeleteCategory() {
    const [show, setShow] = useState(false);
    const [categoryName, setCategoryName] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const deleteCategory = (e) => {
        e.preventDefault();
        const payload = { CategoryName: categoryName };
        axios.delete(`/api/delete-category/${categoryName}`, payload)
            .then(json => { console.log(json.data) })
            .catch(err => console.log(err));
        setShow(false)
    }

    return (

        <>
            <button className='bg-white rounded nav-item d-flex btn bg-white text-primary m-5 ' onClick={handleShow}><AiFillDelete /></button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={deleteCategory}>
                        <div className='mb-3'>
                            <label htmlFor='inputCategoryName' className='form-label'>
                                Category Name
                            </label>
                            <input
                                type='text'
                                className='form-control'
                                id='inputCategoryName'
                                aria-describedby='categorynameHelp'
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                            />
                        </div>
                        <button type='submit' className='btn btn-primary'>
                            Delete Category
                        </button>
                    </form>
                </Modal.Body>
            </Modal>
        </>

    )
}