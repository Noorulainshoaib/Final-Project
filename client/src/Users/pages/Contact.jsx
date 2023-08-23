import React, { useState } from 'react';
import Swal from 'sweetalert2';


const Contact = () => {
  const [formStatus, setFormStatus] = useState('Send');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('Submitting...');

    const { name, email, message } = e.target.elements;
    const formData = {
      name: name.value,
      email: email.value,
      message: message.value,
    };


    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      console.log('Form data:', formData);
      setFormStatus('Submitted');

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Form submitted successfully!',
        customClass: {
          container: 'swal-container',
          popup: 'swal-popup',
          title: 'swal2-title',
          text: 'swal2-text',
        },
        width: '400px',
        padding: '20px',
        background: '#4CAF50', 
        color: '#fff', 
        borderRadius: '10px',
        border: '2px solid #45A049', 
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus('Error');

      
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while submitting the form.',
        customClass: {
          container: 'swal-container',
          popup: 'swal-popup',
          title: 'swal2-title',
          text: 'swal2-text',
        },
        width: '400px',
        padding: '20px',
        background: '#F44336', 
        color: '#fff', 
        borderRadius: '10px',
        border: '2px solid #D32F2F', 
      });
    }
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage: `url(${'https://st2.depositphotos.com/3252397/8388/i/450/depositphotos_83882494-stock-photo-keyboard-contact-us-black.jpg'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)', 
        color: 'white', 
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: '400px',
          padding: '30px',
          border: '2px solid white',
          borderRadius: '10px',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      >
        <h2 className="text-center mb-4">Contact Us</h2>
        <div className="mb-3">
          <input
            className="form-control"
            type="text"
            id="name"
            placeholder="Name"
            required
          />
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            type="email"
            id="email"
            placeholder="Email"
            required
          />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control"
            id="message"
            placeholder="Message"
            required
            rows="4"
          />
        </div>
        <button
          className="btn btn-danger w-100"
          type="submit"
          disabled={formStatus === 'Submitting...'}
          style={{ backgroundColor: '#34495e', borderColor: '#34495e' }}
        >
          {formStatus}
        </button>
      </form>
    </div>
  );
};

export default Contact;

