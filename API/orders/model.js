const {Schema , model} = require ('mongoose')

const OrderSchema = new Schema(
    {
    items: {
        type :Array ,
        require:true
        },

         totalBill: {
            type:String,
            require:true
         } ,  
         customerAdress: {
            type:String,
            require:true
         } ,  
         customerContact: {
            type:String,
            require:true
         }  , 
         customerEmail: {
            type:String,
            require:true
         } ,
         customerName: {
            type:String,
            require:true
         } ,
         order_at:{
            type: Date,
            default: Date.now
         }
}
)
const Order = model('order' , OrderSchema)
module.exports = Order
