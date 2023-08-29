import React from 'react'
import { useState } from 'react';
import { AiFillDelete } from 'react-icons/ai'
import { Modal } from 'react-bootstrap'
import axios from 'axios';
import { AppRoute } from '../../../App';


export default function DeleteProduct() {
  const [show, setShow] = useState(false);
  const [ProductName, setProductName] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteProduct = (e) => {
    e.preventDefault();

    axios.delete(`/api/delete-product/${ProductName}`)
      .then(json => {
        console.log(json.data);
        setShow(false);
      })
      .catch(err => {
        console.log(err);
      });
  };
}