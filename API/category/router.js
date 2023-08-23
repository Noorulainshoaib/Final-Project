const express = require('express'); // Import the express module
const router = express.Router(); // Create a router instance

const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} = require('./controller');

// Define your routes using the router instance
router.get('/get-all-categories', getAllCategories);
router.get('/get-category-by-id', getCategoryById);
router.post('/create-category', createCategory);
router.put('/update-category', updateCategory); // Fixed typo in route path
router.delete('/delete-category', deleteCategory);

module.exports = router; // Export the router instance
