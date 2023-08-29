/*import React from "react";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home"
import Category from "./pages/Category";
import Products from "./pages/Products";
import './Admin.css';

import {
    Route,
    Routes,
  } from "react-router-dom";
  


export default function Admin(){
    return(
        <div className="row m-0 p-0">
        <div className="col-md-3 m-0 p-0 bg-dark" style={{ height: '100vh' }}>
            <Sidebar />
        </div>
        <div className='col-md-9 '>
  <Routes>
  <Route path="/" element={<Home />} />
                    <Route path="/category" element={<Category />} />
                    <Route path="/product" element={<Products />} />

                    <Route path="*" element={<Home />} />
  </Routes>
        </div>
        </div>
          
    )
}*/
/*import React from 'react';
import SideBar from './components/SideBar';
import Home from './pages/Home';
//import Category from './pages/Category';

import Products from './pages/Products';
import { Route, Routes } from 'react-router-dom';
import './Admin.css'; // Import the CSS file

export default function Admin() {
  return (
    <div className="admin-container">
      <div className="stars"></div>
      <div className='row m-0 p-0'>
        <SideBar />
        <div className='col-md-11' style={{ paddingLeft: '60px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category" element={<Category />} />
           
            <Route path="/products" element={<Products />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}*/import React from 'react'
import AdminNav from './components/AdminNav'
import { Route, Routes } from 'react-router-dom'
import AdminHome from './pages/AdminHome'; // Use correct casing

import Category from './pages/Category/Category'
import Products from './pages/Products/Products'

export default function App() {
    return (
        <>
            <AdminNav />
            <div>
                <Routes>
                    <Route path='/admin/home' element={<AdminHome />} />
                    <Route path='/admin/category' element={<Category />} />
                    <Route path='/admin/products' element={<Products/>} />
                </Routes>

            </div>
        </>
    )
}
