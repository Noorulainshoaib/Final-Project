import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function CategoryPage() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    axios.get(`https://dummyjson.com/products/category/${categoryName}`).then((json) => {
      setProducts(json.data.products);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    });
  }, [categoryName]);

  return (
    <div className="container">
      <div className="my-5 text-center">
        <h1 style={{ marginTop: '100px' }}>{categoryName.toUpperCase()}</h1>
        <p className="text-secondary">
        Explore our wide range of products and enjoy exclusive discounts and deals on your favorite items.
        </p>
      </div>
      <section>
        <div className="pricing-table">
          {isLoading ? (
            <motion.div
              className="loading-animation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="loading-dot"></div>
              <div className="loading-dot"></div>
              <div className="loading-dot"></div>
            </motion.div>
          ) : (
            products &&
            products.map((val, key) => (
              <Link className="text-decoration-none" to={`/products/${val.id}`} key={key}>
                <div className="pricing-table__item">
                  <h3 className="pricing-table__title">{val.title}</h3>
                  <p className="pricing-table__subtitle">{val.subtitle}</p>
                  <div className="pricing-table__thumbnail">
                    <img
                      src={val.thumbnail}
                      alt={val.title}
                      style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                    />
                  </div>
                  <div className="pricing-table__plan">
                    <span className="pricing-table__plan-currency">$</span>
                    <span className="pricing-table__plan-price">{val.price}</span>
                  </div>
                  <p className="pricing-table__description">{val.description}</p>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
