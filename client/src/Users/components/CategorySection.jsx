import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function CategoriesSection() {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products/categories');
        const categoryNames = response.data;
        const categoryImages = await fetchCategoryImages(categoryNames);
        const categoriesWithImages = categoryNames.map((name, index) => ({
          name: name,
          image: categoryImages[index],
        }));
        setCategories(categoriesWithImages);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchData();
  }, []);

  const fetchFirstImage = async (category) => {
    try {
      const response = await axios.get(`https://dummyjson.com/products/category/${category}`);
      const firstImage = response.data.products[0]?.thumbnail; // Get the first product's thumbnail image
      return firstImage;
    } catch (error) {
      console.error(`Error fetching first image for category '${category}':`, error);
    }
  };

  const fetchCategoryImages = async (categories) => {
    const categoryImages = await Promise.all(categories.map(category => fetchFirstImage(category)));
    return categoryImages;
  };

  return (
    <div className="container">
      <div className="my-5 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Categories
        </motion.h1>
        <p className="text-secondary">
          Explore our wide range of categories.
        </p>
      </div>

      <div className="row">
        {categories.map((category, index) => (
          <div className="col-md-4 col-sm-6 my-3" key={index}>
            <Link className="text-decoration-none" to={`/products/category/${category.name}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-light h-100">
                  {category.image && (
                    <Card.Img
                      variant="top"
                      src={category.image}
                      alt={category.name}
                      style={{ objectFit: 'cover', height: '200px' }}
                    />
                  )}
                  <Card.Body>
                    <Card.Title className="text-center color-black">
                      <div>
                        <span style={{ color: 'black', fontSize: '18px' }}>
                          {category.name.toUpperCase().replace('-', ' ')}
                        </span>
                      </div>
                    </Card.Title>
                    <div className="d-flex justify-content-center"> {/* Center the button */}
                      <Button
                        variant="primary"
                        size="sm"
                        style={{ backgroundColor: '#34495e', marginTop: '10px' }}
                        onClick={() => setShowModal(true)}
                      >
                        Shop Now
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            </Link>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Special Offer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Get 20% off on all products in the selected category!
          Use code: CATEGORY20
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}