const express = require('express')
const router = express.Router()
const {signup , login, deleteUser } = require ('./controller')

router.post('/signup', signup);
router.post('/login', login);
router.delete('/user', deleteUser);
// router.get('/getallusers', allUsers);


module.exports = router