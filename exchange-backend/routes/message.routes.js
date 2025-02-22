const express = require('express');
const messageController = require('../controllers/message.controller');
const verifyToken = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', verifyToken, messageController.getAllMessages);

router.get('/:id', verifyToken, messageController.getMessageById);

router.post('/', verifyToken, messageController.createMessage);

router.put('/:id', verifyToken, messageController.updateMessage);

router.delete('/:id', verifyToken, messageController.deleteMessage);