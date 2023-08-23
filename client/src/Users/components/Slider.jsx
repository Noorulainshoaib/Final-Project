import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

function DarkVariantExample() {
  return (
    <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://www.shutterstock.com/image-photo/banner-laptop-mug-coffee-credit-260nw-1805989006.jpg"
          alt="First slide"
          style={{ maxHeight: "500px", objectFit: "cover" }}
        />
        <Carousel.Caption>
          <h2 style={{ color: "black" }}>Shop with Ease</h2>
          <p style={{ color: "black" }}>Discover a wide range of products online.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://img.freepik.com/premium-psd/smartphone-sale-banner-template_185005-374.jpg"
          alt="Second slide"
          style={{ maxHeight: "500px", objectFit: "cover" }}
        />
        <Carousel.Caption>
          <h2 style={{ color: "black" }}>Online Shopping</h2>
          <p style={{ color: "black" }}>Browse and shop from the comfort of your home.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://marketplace.canva.com/EAFYElY5EE4/1/0/1600w/canva-brown-and-white-modern-fashion-banner-landscape-Ap8IU9nEbh8.jpg"
          alt="Third slide"
          style={{ maxHeight: "500px", objectFit: "cover" }}
        />
        <Carousel.Caption>
          <h2 style={{ color: "black" }}>Fashion Trends</h2>
          <p style={{ color: "black" }}>Stay updated with the latest fashion trends.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default DarkVariantExample;
