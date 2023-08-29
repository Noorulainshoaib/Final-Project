import React from 'react';
import AdminHome from '../AdminHome';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Deleteproduct from './DeleteProduct';
import AddProduct from './AddProduct';
import { useState, useEffect } from 'react';
import { AppRoute } from '../../../App';

export default function Products() {
    const [products, setproducts] = useState([]);


    useEffect(() => {
        axios.get(`/api/products`)
            .then(json => {
                setproducts(json.data.products);
            })
            .catch(err => console.log(err));
    }, []);
    return (
        <>
            <AdminHome />
            <div>
                <h3 className='d-flex justify-content-center mb-3 my-4 bg-primary p-3 text-white'>Products
                    <AddProduct />
                </h3>
            </div>
            <div>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Image</th>
                            <th>Delete products</th>
                            <th>Update products</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((val, key) =>
                                <tr key={key}>
                                    <td>{key + 1}</td>
                                    <td>{val.ProductName}</td>
                                    <td className='col-md-6 '><img style={{ width: "20vh" }} className='img-fluid' src={val.ProductImage} /></td>
                                    <td className='col-md-1'><Deleteproduct /></td>
                                    <td className='col-md-1'></td>
                                </tr>)
                        }
                    </tbody>
                </Table>
            </div>
        </>
    )
}