import { Form } from 'react-bootstrap';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Signin({setUser}) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const saveUserDataToLocalStorage = (username, isLoggedIn) => {
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
    localStorage.setItem('confirm Password', confirmPassword);
    localStorage.setItem('loggedIn', isLoggedIn.toString());
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);

    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrorMessage('');

    Swal.fire({
      title: 'Login Successful!',
      icon: 'success',
      timer: 1500,
      showConfirmButton: false
    }).then(() => {
      saveUserDataToLocalStorage(username, true);
      setUser(true)
      navigate('/');
    });
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match");
      return;
    }

    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);

    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrorMessage('');

    Swal.fire('Success', 'Sign up successful!', 'success').then(() => {
      setUsername('');
      setPassword('');
      setConfirmPassword('');

      saveUserDataToLocalStorage(username, true);
      setUser(true)

      navigate('/');
    });
  };

  return (
    <>
      
      <div className="custom-container">
        <input type="checkbox" id="custom-check" />
        <div className="custom-login-form">
          <header>Login</header>
          <form action="#" onSubmit={handleLoginSubmit}>
            <label htmlFor="username">User Name</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <label htmlFor="useremail">Email</label>
            <input
              type="email"
              id="useremail"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
    
              title="Please enter a valid email address with the domain 'gmail.com'"

              required
            />

            <div style={{ position: 'relative', bottom: '20px' }}>
              <Form.Text style={{ color: 'black' }} >
                We'll never share your email with anyone else.
              </Form.Text>
            </div>

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="signup-password"
              pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
              title="Use at least 8 characters (including uppercase, lowercase, and numbers)"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />


            <a href="#">Forgot password?</a>
            <input type="submit" className="custom-button" value="Login" />
          </form>
          <div className="custom-signup">
            <span className="custom-signup-text">
              Don't have an account?
              <label htmlFor="custom-check">Signup</label>
            </span>
          </div>
        </div>
        <div className="custom-registration-form">
          <header>Signup</header>
          <form action="#" onSubmit={handleSignupSubmit}>
            <label htmlFor="username">User Name</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <label htmlFor="useremail">Email</label>
            <input
              type="email"
              id="useremail"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              pattern="[a-zA-Z0-9._%+-]+@gmail\.com$"
              title="Please enter a valid email address with the domain 'gmail.com'"
              required />
            <div style={{ position: 'relative', bottom: '20px' }}>
              <Form.Text style={{ color: 'black' }} >
                We'll never share your email with anyone else.
              </Form.Text>
            </div>

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="signup-password"
              pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
              title="Use at least 8 characters (including uppercase, lowercase, and numbers)"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              placeholder="Confirm your password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <input type="submit" className="custom-button" value="Signup" />
          </form>
          <div className="custom-signup">
            <span className="custom-signup-text">
              Already have an account?
              <label htmlFor="custom-check">Login</label>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}