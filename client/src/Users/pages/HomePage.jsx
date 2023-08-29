import React from 'react';
import Slider from '../components/Slider';
import CategoriesSection from '../components/CategorySection';
import Contact from './Contact';

export default function HomePage() {
  const welcomeMessageStyle = {
    textAlign: 'center',
    margin: '50px auto',
    padding: '20px',
    backgroundColor: '#f8f8f8',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  };

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
      <Contact/>
    </>
  );
}
