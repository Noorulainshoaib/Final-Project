import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { GlobalContext } from '../../Context/context';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert
import { AppRoute } from '../../App';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [signupMode, setSignupMode] = useState(true); // Reversed the initial state

  const { state, dispatch } = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token');
    if(token !== "undefined"){
      // console.log('token available', token);
      navigate('/');
    }else{
      console.log('login pppppp', token);
    }
  }, []);
  

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const payload = { email, password };

    if (signupMode) {
      // Signup mode
      payload.username = username;

      axios
        .post('/api/signup', payload)
        .then((json) => {
          console.log('Signup success:', json.data);
          
          Swal.fire({
            icon: 'success',
            title: 'SignUp Successful',
            showConfirmButton: false,
            timer: 1500 // Display for 1.5 seconds
          }).then(() => {
            navigate('/login');
          });
        })
        .catch((error) => {
          console.log('Signup error:', error.response.data);
          // Handle signup error
        });
    } else {
    
      axios
        .post('/api/login', payload)
        .then((json) => {
         
          Cookies.set('token', json.data.token);
          console.log('login success:', json.data);
          dispatch({
            type: 'USER_LOGIN',
            token: json.data.token
          });

         
          Swal.fire({
            icon: 'success',
            title: 'Login Successful',
            showConfirmButton: false,
            timer: 1500 
          }).then(() => {
            navigate('/');
          });
        })
        .catch((error) => {
          console.log('Login error:', error.response.data);

          if (!email && !password) {
            // Show SweetAlert error message for user not found
            Swal.fire({
              icon: 'error',
              title: 'User Not Found',
              text: 'Please check your login details.',
              confirmButtonText: 'OK'
            });
          } else if (error.response && error.response.status === 401) {
            // Show SweetAlert error message for invalid credentials
            Swal.fire({
              icon: 'error',
              title: 'Invalid Credentials',
              text: 'Please check your login details.',
              confirmButtonText: 'OK'
            });
          } else {
            // Show SweetAlert error message for other errors
            Swal.fire({
              icon: 'error',
              title: 'Login Error',
              text: 'An error occurred during login. Please try again later.',
              confirmButtonText: 'OK'
            });
          }
        });
    }
  };

  return (
    <div className="container">.
    
      <div className="d-flex justify-content-center align-items-center  background-image" style={{ height: '100vh', width: '100%' }}>
        <div className="p-5 bg-dark rounded text-white form-container ">
          {signupMode ? (
            <form onSubmit={handleFormSubmit}>
              <div className="mb-3">
                <label htmlFor="exampleInputUsername" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  style={{ width: '300px' }}
                  id="exampleInputUsername"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-3" style={{ width: '300px' }}>
                <label htmlFor="exampleInputEmail2" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail2"
                  aria-describedby="emailHelp"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div id="emailHelp" className="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="exampleInputPassword2" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  style={{ width: '300px' }}
                  id="exampleInputPassword2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" style={{ width: '100px' }} className="btn btn-primary mx-1">
                Sign Up
              </button>
              <button
                type="button"
                style={{ width: '80px' }}
                className="btn btn-link mx-1"
                onClick={() => setSignupMode(false)}
              >
                Login
              </button>
            </form>
          ) : (
            <form onSubmit={handleFormSubmit}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  style={{ width: '300px' }}
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div id="emailHelp" className="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  style={{ width: '300px' }}
                  id="exampleInputPassword1"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" style={{ width: '80px' }} className="btn btn-primary mx-1">
                Login
              </button>
              <button
                type="button"
                style={{ width: '100px' }}
                className="btn btn-link mx-1"
                onClick={() => setSignupMode(true)}
              >
                Sign Up
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}