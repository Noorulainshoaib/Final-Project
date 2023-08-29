const { Schema, model } = require('mongoose')

const ProductSchema = new Schema(
    {
        ProductName: {
            type: String,
            unique: true,
            required: true
        },
        ProductImage: {
            type: String,
            required: true
        }
    }
)

const Products = model('product', ProductSchema)
module.exports = Products