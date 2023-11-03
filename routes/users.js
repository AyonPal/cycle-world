const express = require('express');
const router = express.Router();
const UserController = require('../controllers/users');


router.post('/register', UserController.register);
router.post('/', UserController.login);

module.exports = router;
