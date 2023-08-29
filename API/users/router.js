const express = require('express')
const router = express.Router()
const {signup , login , allUsers} = require ('./controller')

router.post('/signup', signup)
router.post('/login', login)
router.get('/getallusers', allUsers);


module.exports = router