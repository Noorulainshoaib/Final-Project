import React from 'react';
import { Button, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../Context/context'
import { useContext } from 'react';
import { useState } from 'react';
import { useJwt } from 'react-jwt';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

function AdminNav() {
    const { state, dispatch } = useContext(GlobalContext)

    const [adminName, setAdminName] = useState('');
    const { decodedToken } = useJwt(Cookies.get('token'));

    useEffect(() => {
        if (decodedToken) {
            setAdminName(decodedToken.username);
        }
    }, [decodedToken]);

    return (
        <div className="d-flex bg-primary p-3 text-white">
            <div className="container-fluid d-flex justify-content-between align-items-center">
                <div>

                    <a href="#login" className="text-dark"> {adminName}</a>
                    <Button className='btn bg-white text-primary ms-2' onClick={() => dispatch({ type: "USER_LOGOUT" })}>Logout</Button>
                </div>
                <Nav className='bg-white rounded nav-item d-flex'>
                    <Link to='/admin/home' className='nav-link'>
                        Home
                    </Link>
                    <Link to='/admin/category' className='nav-link'>
                        Category
                    </Link>
                    <Link to='/admin/products' className='nav-link'>
                        Products
                    </Link>
                </Nav>
            </div>
        </div>
    );
}

export default AdminNav;