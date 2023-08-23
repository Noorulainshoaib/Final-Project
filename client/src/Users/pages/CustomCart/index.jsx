
import React, { useContext, useState, useEffect } from 'react';
import './cart.css';
import { CartContext } from '../../CartContext/context';
import axios from 'axios';
import { GlobalContext } from '../../../Context/context'
import { decodeToken } from 'react-jwt'
import { Modal, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import Navigation from '../../components/Navigation';

export default function CustomCart() {
    const { cart_state, cart_dispatch } = useContext(CartContext);
    const { state } = useContext(GlobalContext);
    const user = decodeToken(state.token);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [address, setAddress] = useState('');
    const [contact, setContact] = useState('');

    const products = cart_state.cart;

    const increaseQuantity = (index) => {
        const updatedProducts = [...products];
        updatedProducts[index].quantity += 1;
        cart_dispatch({
            type: "UPDATE_CART",
            cart: updatedProducts
        });
    };

    const decreaseQuantity = (index) => {
        const updatedProducts = [...products];
        if (updatedProducts[index].quantity > 1) {
            updatedProducts[index].quantity -= 1;
            cart_dispatch({
                type: "UPDATE_CART",
                cart: updatedProducts
            });
        }
    };

    const removeProduct = (index) => {
        const updatedProducts = [...products];
        updatedProducts.splice(index, 1);
        cart_dispatch({
            type: "REMOVE_FROM_CART",
            cart: updatedProducts
        });
    };

    const calculateSubtotal = () => {
        return products.reduce((total, product) => total + product.price * product.quantity, 0);
    };

    const calculateTax = () => {
        return calculateSubtotal() * 0.05;
    };

    const calculateTotal = () => {
        return calculateSubtotal() + calculateTax() + 5;
    };

    const checkout = () => {
        setIsModalOpen(true);
    };

    const closeModal = async () => {
        setIsModalOpen(false);
        setIsLoading(true);

        const payload = {
            items: cart_state.cart,
            totalBill: calculateTotal(),
            customerAddress: address,
            customerContact: contact,
            customerName: user.username,
            customerEmail: user.email,
        };

        try {
            const response = await axios.post('/api/create-order', payload);
            console.log(response.data);
            Swal.fire({
                icon: 'success',
                title: 'Order Placed Successfully!',
                text: 'Check your email for order details.',
                confirmButtonText: 'OK'
            });
        } catch (err) {
            console.log(err.message);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while placing the order.',
                confirmButtonText: 'OK'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="custom-cart">
            <Navigation />
            <header id="site-header">
                <div className="container" style={{ marginTop: "30px" }}>
                    <h1>Shopping Cart</h1>
                </div>
            </header>

            <div className="container">
                <section id="cart">
                    {products.map((product, index) => (
                        <article key={index} className="product">
                            <header>
                                <div className="remove" onClick={() => removeProduct(index)}>
                                    <img src={product.thumbnail} alt={product.title} />
                                    <h3>Remove product</h3>
                                </div>
                            </header>

                            <div className="content">
                                <h1>{product.title}</h1>
                                <p>{product.description}</p>
                                <p>Quantity: {product.quantity}</p>
                            </div>

                            <footer className="content">
                                <span className="qt-minus" onClick={() => decreaseQuantity(index)}>-</span>
                                <span className="qt">{product.quantity}</span>
                                <span className="qt-plus" onClick={() => increaseQuantity(index)}>+</span>
                                <h2 className="full-price">{product.price * product.quantity}</h2>
                            </footer>
                        </article>
                    ))}
                </section>
            </div>

            <footer id="site-footer">
                <div className="container clearfix">
                    <div className="left">
                        <h2 className="subtotal">Subtotal: {calculateSubtotal()}€</h2>
                        <h3 className="tax">Taxes (5%): {calculateTax()}€</h3>
                        <h3 className="shipping">Shipping: 5.00€</h3>
                    </div>

                    <div className="right">
                        <h1 className="total">Total: {calculateTotal()}€</h1>
                        <a className="btn" onClick={checkout}>
                            Checkout
                        </a>
                    </div>
                </div>
            </footer>

            <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Your Order Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Customer Name: {user.username}</p>
                    <p>Customer Email: {user.email}</p>
                    <label>Customer Address:
                        <input required placeholder='Enter Your Address' type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                    </label>
                    <label>Customer Contact:
                        <input required placeholder='Enter Your Number' type="text" value={contact} onChange={(e) => setContact(e.target.value)} />
                    </label>
                    <p>Total Bill: {calculateTotal()}€</p>
                </Modal.Body>
                <Modal.Footer>
                    {isLoading ? (
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    ) : (
                        <Button variant="secondary" onClick={closeModal} disabled={isLoading}>
                            Confirm
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
        </div>
    );
}