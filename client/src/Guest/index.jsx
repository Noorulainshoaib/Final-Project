import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CategoryPage from './pages/CategoryPage';
import Navigation from './components/Navigation';
import LoginForm from './form/LoginForm';
import Footer from './components/Footer';

export default function Guest() {

  const [user, setUser] = useState(false);

  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        {user ? (
          <>
            <Route path="/products" element={<ProductPage />} />
            <Route path="/products/category/:categoryName" element={<CategoryPage />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace={true} />} />
        )}
      </Routes>
      <Footer />
    </>
  );
};



