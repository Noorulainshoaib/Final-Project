import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaHome, FaShoppingCart, FaEnvelope } from 'react-icons/fa';
import { BiPackage } from 'react-icons/bi';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Navigation({ loggedIn, handleLogout }) {
  useEffect(() => {
    AOS.init({
      easing: 'linear',
      duration: 1500,
      once: false,
    });
  }, []);

  return (
    <Navbar expand="lg" className="navbar-light px-4 border-bottom top-fixed stylish-navbar side-in"style={{ backgroundColor: "#34495e"}} >
      <Container>
        <Navbar.Brand href="#home">
          <span className="text-dark" data-aos="fade-right">
            <b>Shoping World</b>
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link className="nav-link stylish-link" to="/">
              <FaHome />Home {/* Home icon */}
            </Link>
            <Link className="nav-link stylish-link" to="/products/:productID">
              <BiPackage /> Products{/* Products (shopping cart) icon */}
            </Link>
            <Link className="nav-link stylish-link" to="/cart">
              <FaShoppingCart /> {/* Cart icon */}
            </Link>
           
            </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
