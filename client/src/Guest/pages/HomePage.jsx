/*import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
//import Navbigation from './components/Navigation';
//import Footer from './components/Footer';
import Slider from './components/Slider';
//import CategoriesSection from './components/CategorySection';
//import Contact from './pages/Contact';
import HomePage from './pages/HomePage';
import CategoriesSection from '../components/CategorySection';
//import About from './pages/Aboutus';
//import Contact from './pages/Contact';
//import ProductPage from './pages/ProductPage';
//import CategoryPage from './pages/CategoryPage';
//import Profile from '../Users/components/ProfileCard/Profile'
//import CustomCart from './pages/CustomCart'


export default function HomePage() {


  return (
    <>

    <Slider />
    <CategoriesSection />
    </>
  );
}*/
import React, { useEffect } from 'react';
import Slider from '../components/Slider';
import CategoriesSection from '../components/CategorySection';
import Contact from './Contact';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  const welcomeMessageStyle = {
    textAlign: 'center',
    margin: '50px auto',
    padding: '20px',
    backgroundColor: '#f8f8f8',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  };

  useEffect(() => {
    const token = Cookies.get('token');
    if(token === 'undefined'){
      console.log('token not available');
      navigate('/login');
    }else{
      console.log('authorized pppp');
    }
  }, []);
  

  const headingStyle = {
    fontSize: '28px',
    color: '#333',
  };

  const messageStyle = {
    fontSize: '18px',
    color: '#555',
  };

  return (
    <>
      <div style={welcomeMessageStyle}>
        <h2 style={headingStyle}>Welcome to Shopping World</h2>
        <p style={messageStyle}>
          Explore our wide range of products and enjoy exclusive discounts and deals on your favorite items.
        </p>
      </div>

      <Slider />
      <CategoriesSection />
      <Contact />
    </>
  );
}
