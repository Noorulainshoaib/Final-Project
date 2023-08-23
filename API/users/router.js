const express = require('express')
const router = express.Router()

const { login, signup ,deleteUser} = require ('./controller')

router.post('/signup', signup)
router.post('/login', login)
router.delete("/delete-user", deleteUser);


module.exports = router