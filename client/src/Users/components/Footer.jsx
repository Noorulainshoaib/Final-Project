import React from 'react';
import { FaShippingFast} from 'react-icons/fa';

export default function Footer() {
  return (
    <>
      <footer className="footer bottom-fix" style={{ backgroundColor: "#34495e", marginTop: "50px", padding: "50px 0" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h2 className="company__logo" style={{ color: "black", marginBottom: "20px" }}>Shopping World</h2>
              <p className="company__description" style={{ color: "black" }}>
              Whoever said money can't buy happiness simply didn't know where to go shopping.
              </p>
            </div>
            <div className="col-md-4">
              <h2 style={{ color: "black", marginBottom: "20px" }}>Quick Links</h2>
              <ul className="footer__list" style={{ listStyle: "none", padding: 0 }}>
                <li className="footer__list-item">
                  <a href="/" className="footer__list-link" style={{ color: "black", textDecoration: "none" }}>
                    Home
                  </a>
                </li>
                <li className="footer__list-item">
                  <a href="/products" className="footer__list-link" style={{ color: "black", textDecoration: "none" }}>
                    Products
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-4">
              <h2 style={{ color: "black", marginBottom: "20px" }}>Address</h2>
              <p style={{ color: "black" }}>
                Email: ulain400@gmail.com<br />
                Home: Pakistan<br />
                Number: +9234083758
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <h2 style={{ color: "black", marginBottom: "20px" }}>Services</h2>
              <ul className="footer__list" style={{ listStyle: "none", padding: 0 }}>
                <li className="footer__list-item">
                  <a href="/services" className="footer__list-link" style={{ color: "black", textDecoration: "none" }}>
                    Product Selection
                  </a>
                </li>
                <li className="footer__list-item">
                  <a href="/services" className="footer__list-link" style={{ color: "black", textDecoration: "none" }}>
                    Personal Styling
                  </a>
                </li>
                <li className="footer__list-item">
                  <a href="/services" className="footer__list-link" style={{ color: "black", textDecoration: "none" }}>
                    Gift Wrapping
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-4">
              <h2 style={{ color: "black", marginBottom: "20px" }}>Shipping</h2>
              <p style={{ color: "black" }}>
                <FaShippingFast /> Shipping Rates: $5 flat rate<br />
                <FaShippingFast /> Estimated Delivery Time: 3-5 business days
              </p>
            </div>
            <div className="col-md-4">
              <h2 style={{ color: "black", marginBottom: "20px" }}>FAQs</h2>
              <ul className="footer__list" style={{ listStyle: "none", padding: 0 }}>
                <li className="footer__list-item">
                  <a href="/faq" className="footer__list-link" style={{ color: "black", textDecoration: "none" }}>
                    How to place an order?
                  </a>
                </li>
                <li className="footer__list-item">
                  <a href="/faq" className="footer__list-link" style={{ color: "black", textDecoration: "none" }}>
                    Returns and exchanges
                  </a>
                </li>
                <li className="footer__list-item">
                  <a href="/faq" className="footer__list-link" style={{ color: "black", textDecoration: "none" }}>
                    Payment options
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
      <div className="container-fluid copyright-section" style={{ backgroundColor: "black", padding: "10px 0", color: "white" }}>
        <p className="m-0 text-center">
          © 2023 Shopping World All Rights Reserved | Designed by Noorulain
        </p>
      </div>
    </>
  );
}

