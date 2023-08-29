
const express = require('express'); 
const router = express.Router(); 

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
router.put('/update-category', updateCategory); 
router.delete('/delete-category', deleteCategory);

module.exports = router; 