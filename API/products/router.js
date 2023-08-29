const express = require('express');
const router = express.Router();
const { getAllProducts, createProduct , updateProduct ,deleteProduct } = require('./controller'); 

// getALLProducts
router.get('/products', getAllProducts); 

// createProduct
router.post('/create-product', createProduct);



//delete products
router.delete('/delete-product', deleteProduct);

//updateproduct
router.put('/update-product', updateProduct);

module.exports = router;