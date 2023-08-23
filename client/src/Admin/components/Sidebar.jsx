import React, { useState, useEffect } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { BiCategory } from 'react-icons/bi';
import { TbBrandSolidjs } from 'react-icons/tb';
import { Link, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useJwt } from 'react-jwt';
import { Offcanvas } from 'react-bootstrap';

export default function SideBar() {
  const location = useLocation();

  const NavItems = [
    {
      tab: "Home",
      url: "/",
      icon: <AiOutlineHome />
    },
    {
      tab: "Categories",
      url: "/category",
      icon: <BiCategory />
    },
    {
      tab: "Products",
      url: "/products",
      icon: <TbBrandSolidjs />
    }
  ];

  const [adminName, setAdminName] = useState('');
  const { decodedToken } = useJwt(Cookies.get('token'));

  useEffect(() => {
    if (decodedToken) {
      setAdminName(decodedToken.username);
    }
  }, [decodedToken]);

  const [showSidebar, setShowSidebar] = useState(false);

  const handleLogout = () => {
    Cookies.remove('token');
    // Navigate to the home page after logout
    window.location.href = '/'; // Change this to your home URL
  };

  return (
    <>
      <button
        className="btn btn-outline-light p-2" style={{width: "50px", height: '50px', marginTop: '10px'}}
        onClick={() => setShowSidebar(!showSidebar)}
      >
        ☰
      </button>

      <Offcanvas show={showSidebar} onHide={() => setShowSidebar(false)} style={{ maxWidth: '300px' }}>
        <Offcanvas.Header closeButton className="bg-primary text-white" >
        <Offcanvas.Title>
      <div className='bg-primary p-1 mx-2 d-flex text-white justify-content-between '>
        <div>
          <span>{adminName}</span>
        </div>
        <div className="ms-auto">
          <button className="btn btn-outline-light mx-2" style={{ width: '70px' }} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          

          <ul className="nav flex-column pt-1">
            {NavItems.map((val, key) => (
              <li
                key={key}
                className={`nav-item m-2 ${
                  location.pathname === val.url ? 'bg-dark rounded' : ''
                }`}
              >
                <Link
                  className='Nav-link d-flex align-items-center gap-3 text-decoration-none  mb-2'
                  to={val.url}
                  onClick={() => setShowSidebar(false)}
                >
                  <span>{val.icon}</span>
                  <span> {val.tab}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}