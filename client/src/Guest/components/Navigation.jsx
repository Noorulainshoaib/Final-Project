import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaHome, FaShoppingCart, FaEnvelope } from 'react-icons/fa';
import { BiPackage } from 'react-icons/bi';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Cookies from 'js-cookie';

function Navigation({ loggedIn }) {

  useEffect(() => {
    AOS.init({
      easing: 'linear',
      duration: 1500,
      once: false,
    });
  }, []);
  
  const handleLogout = () => {
    Cookies.remove('token');
    console.log("token removed from guest");
    window.location.href = '/login'; 
  };

  return (
    <Navbar expand="lg" className="navbar-light px-4 border-bottom top-fixed stylish-navbar side-in" style={{ backgroundColor: "#34495e", color: "white"}} >
      <Container>
        <Navbar.Brand href="#home">
          <span className="text-light" data-aos="fade-right">
            <b>Shoping World</b>
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link className="nav-link text-light stylish-link" to="/">
              <FaHome />Home {/* Home icon */}
            </Link>
            <Link className="nav-link text-light stylish-link" to="/products">
              <BiPackage /> Products{/* Products (shopping cart) icon */}
            </Link>

            <Link className="nav-link text-light stylish-link" to="/cart">
              <FaShoppingCart /> {/* Cart icon */}
            </Link>
            
            <Link className="nav-link text-light stylish-link" onClick={handleLogout}>
              <BiPackage /> Logout{/* Products (shopping cart) icon */}
            </Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
