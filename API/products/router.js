const express = require('express');
const router = express.Router();
const { getAllProducts, addProduct ,deleteProduct } = require('./controller'); 

// getALLProducts
router.get('/products', getAllProducts); 

// addProducts
router.post('/add-product', addProduct);



//delete products
router.delete('/delete-product', deleteProduct);


module.exports = router;