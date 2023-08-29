const express = require('express'); 
const router = express.Router(); 
const { demoMail ,addOrders, allorders  } = require('./controller')

router.post('/send-demo-mail', demoMail);
router.post('/create-order', addOrders);
router.get('/all-orders' , allorders)

module.exports = router;