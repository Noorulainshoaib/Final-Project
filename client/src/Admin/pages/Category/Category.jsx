import React, { useEffect, useState } from 'react'
import AdminHome from '../AdminHome';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import DeleteCategory from './DeleteCategory';
import AddCategory from './AddCategory'
import { AppRoute } from '../../../App';



export default function Category() {
    const [category, setCategory] = useState([])
    useEffect(() => {
        axios.get(`/api/get-all-categories`)
            .then(response => {
                setCategory(response.data.category);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <>
            <AdminHome />
            <div >
                <h3 className='d-flex justify-content-center mb-3 my-4 bg-primary p-3 text-white'>Categories
                    <AddCategory />
                </h3>
            </div>
            <div>
                <Table striped bordered hover size>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Category Name</th>
                            <th>Image</th>
                            <th>Delete Category</th>
                            <th>Update Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            category.map((val, key) =>
                                <tr key={key}>
                                    <td>{key + 1}</td>
                                    <td>{val.CategoryName}</td>
                                    <td className='col-md-6 '><img style={{ width: "20vh" }} className='img-fluid' src={val.CategoryImage} /></td>
                                    <td className='col-md-1' ><DeleteCategory /></td>
                                    <td className='col-md-1'> </td>

                                </tr>)
                        }
                    </tbody>
                </Table>
            </div>
        </>
    )
}