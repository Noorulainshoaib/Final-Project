const express = require('express'); 
const router = express.Router(); 
const { demoMail } = require('./controller')

router.post('/send-demo-mail', demoMail);

module.exports = router;