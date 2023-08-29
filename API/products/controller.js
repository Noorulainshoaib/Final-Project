const Product = require('./model');
const { connect } = require('mongoose')
require('dotenv').config()

const getAllProducts = (req, res) => {
    
  res.json({
    products : [
        {"id":1,"title":"iPhone 9","description":"An apple mobile which is nothing like apple","price":549,"discountPercentage":12.96,"rating":4.69,"stock":94,"brand":"Apple","category":"smartphones","thumbnail":"https://i.dummyjson.com/data/products/1/thumbnail.jpg","images":["https://i.dummyjson.com/data/products/1/1.jpg","https://i.dummyjson.com/data/products/1/2.jpg","https://i.dummyjson.com/data/products/1/3.jpg","https://i.dummyjson.com/data/products/1/4.jpg","https://i.dummyjson.com/data/products/1/thumbnail.jpg"]},{"id":2,"title":"iPhone X","description":"SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...","price":899,"discountPercentage":17.94,"rating":4.44,"stock":34,"brand":"Apple","category":"smartphones","thumbnail":"https://i.dummyjson.com/data/products/2/thumbnail.jpg","images":["https://i.dummyjson.com/data/products/2/1.jpg","https://i.dummyjson.com/data/products/2/2.jpg","https://i.dummyjson.com/data/products/2/3.jpg","https://i.dummyjson.com/data/products/2/thumbnail.jpg"]},
    ]
  })
}

const createProduct = async (req, res) => {
    const { ProductName, ProductImage } = req.body;
    console.log('ProductName:', ProductName);
    console.log('ProductImage:', ProductImage);

    if (!ProductName || !ProductImage) {
        console.log('Missing Required Field');
        res.status(400).json({
            message: 'Missing Required Field'
        });
    } else {
        try {
            await connect(process.env.MONGO_URL);
            console.log('DB Connected');
            await Product.create({ ProductName, ProductImage });

            const allProduct = await Product.find();;
            res.json({
                message: 'Added Successfully',
                product: allProduct
            })
        } catch (error) {
            res.status(400).json({
                message: error.message
            });
        }
    }
};

//update Product


const updateProduct = async (req, res) => {
    const { _id, ...updateData } = req.body;
    const filter = { _id };
    try {
        await connect(process.env.MONGO_URL);

        const updatedProduct = await Product.findOneAndUpdate(filter, updateData, {
            new: true,
        });

        if (!updatedProduct) {
            return res.status(404).json({
                message: 'Product not found',
            });
        }

        const allProducts = await Product.find(); 

        res.json({ message: 'Success', product: updatedProduct, allProducts });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

//delete products

const deleteProduct = async (req, res) => {
    const { _id } = req.body; 
    try {
        await connect(process.env.MONGO_URL);
        await Product.findByIdAndDelete(_id); 
        const allProducts = await Product.find(); 

        res.status(200).json({
            message: "Product deleted successfully",
            allProducts
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
    
module.exports = {getAllProducts , createProduct ,updateProduct ,deleteProduct}