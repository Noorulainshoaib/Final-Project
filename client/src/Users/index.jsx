/*import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Navbigation from './components/Navigation';
import Footer from './components/Footer';
import Slider from './components/Slider';
import CategoriesSection from './components/CategorySection';
//import Home from './pages/Home';
//import About from './pages/Aboutus';
//import Contact from './pages/Contact';
//import ProductPage from './pages/ProductPage';
//import CategoryPage from './pages/CategoryPage';
//import Profile from '../Users/components/ProfileCard/Profile'
//import CustomCart from './pages/CustomCart'


export default function Users() {


  return (
    <>
    <Navbigation />
    <Slider />
    <CategoriesSection />
    <Footer/>
    </>
  );
}*/

import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";

import ProductPage from "./pages/ProductPage";
import CategoryPage from "./pages/CategoryPage";
import CustomCart from "./pages/CustomCart";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
export default function Users() {

  console.log("called in user");
  useEffect(() => {
  }, []);

  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:productID" element={<ProductPage />} />
        <Route
          path="/products/category/:categoryName"
          element={<CategoryPage />}
        />
        <Route path="/cart" element={<CustomCart />} />
      </Routes>
      <Footer />
    </>
  );
}
