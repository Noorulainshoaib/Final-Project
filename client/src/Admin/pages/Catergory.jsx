import React, { useEffect, useState } from 'react';
import CategoryModal from '../components/CategoryModal';
import axios from 'axios';
import { BsFillPencilFill } from 'react-icons/bs';
import { AiFillDelete } from 'react-icons/ai';
import { AppRoute } from '../../App';

export default function Category() {
  const [category, setCategory] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios
      .get('/api/get-all-categories')
      .then((response) => setCategory(response.data.category))
      .catch((error) => console.log(error));
  };

  const deleteCategory = (_id) => {
    axios
      .delete('/api/delete-category', { data: { _id } })
      .then(() => {
        fetchCategories();
        setSuccessMessage('Category deleted successfully');
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000); // Display for 3 seconds
      })
      .catch((error) => console.log(error));
  };

  const updateCategory = (_id, newData) => {
    axios
      .put('/api/update-category', { _id, ...newData })
      .then(() => {
        fetchCategories();
        setSuccessMessage('Category updated successfully');
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000); // Display for 3 seconds
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="container" >
      <div className="position-fixed top-0 end-0 p-3">
        {successMessage && (
          <div className="alert alert-success" role="alert">
            {successMessage}
          </div>
        )}
      </div>
      <div className="d-flex justify-content-between align-items-center bg-primary my-2 p-2">
        <span className="fs-4 fw-bold text-white">Categories</span>
        <CategoryModal recallData={setCategory} />
      </div>
      <div className="container">
        <table className="table text-white">
          <thead>
            <tr >
              <th scope="col">#</th>
              <th scope="col">ID</th>
              <th scope="col">Category Name</th>
              <th scope="col">Category Image</th>
              <th scope="col" >Actions</th>
            </tr>
          </thead>
          <tbody>
            {category.map((val, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <th scope="row">{val._id}</th>
                <td>{val.CategoryName}</td>
                <td><img src={val.CategoryImage} className='img-fluid rounded-circle' style={{height: '70px', width: '90px' }} alt="" /></td>
                <td>
                  <button
                    className="btn btn-light mx-1" style={{ width: '50px' }}
                    onClick={() => {
                      const newCategoryName = prompt('Enter new Category Name:', val.CategoryName);
                      const newCategoryImage = prompt('Enter new Category Image URL:', val.CategoryImage);
                      if (newCategoryName && newCategoryImage) {
                        updateCategory(val._id, {
                          CategoryName: newCategoryName,
                          CategoryImage: newCategoryImage,
                        });
                      }
                    }}
                  >
                    <BsFillPencilFill />
                  </button>
                  <button className='btn btn-light mx-1' style={{ width: '50px' }} onClick={() => deleteCategory(val._id)}>
                    <AiFillDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}