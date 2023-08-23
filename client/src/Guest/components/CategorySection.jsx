import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function CategoriesSection() {
  const [categories, setCategories] = useState([]);

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
      const firstImage = response.data.products[1]?.thumbnail; // Get the first product's thumbnail image
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
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="my-5 text-center">
          <h1>Category</h1>
          <p className="text-secondary">
            Explore our diverse range of categories.
          </p>
        </div>
      </motion.div>

      <div className="row">
        {categories.map((category, index) => (
          <div className="col-md-4 col-sm-6 my-3" key={index}>
            <Link className="text-decoration-none" to={`/products/category/${category.name}`}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
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
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <span style={{ color: 'black', fontSize: '18px' }}>
                          {category.name.toUpperCase().replace('-', ' ')}
                        </span>
                      </motion.div>
                    </Card.Title>
                    <Card.Text className="text-center">
                      Explore our selection of products in the {category.name.toUpperCase()} category.
                    </Card.Text>
                    <div className="d-grid gap-2">
                      <Button variant="primary" size="sm" style={{ backgroundColor: '#34495e' }}>
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
    </div>
  );
}