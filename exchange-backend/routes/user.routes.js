const express = require('express');
const userController = require('../controllers/user.controller');
const verifyToken = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', verifyToken, userController.getAllUsers);

router.get('/:id', verifyToken, userController.getUserById);

router.post('/', verifyToken, userController.createUser);

router.put('/:id', verifyToken, userController.updateUser);

router.delete('/:id', verifyToken, userController.deleteUser);

module.exports = router;