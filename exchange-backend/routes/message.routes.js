const express = require('express');
const messageController = require('../controllers/message.controller');
const verifyToken = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', messageController.getAllMessages);

router.get('/:id', messageController.getMessageById);

router.post('/', messageController.createMessage);

router.put('/:id', messageController.updateMessage);

router.delete('/:id', messageController.deleteMessage);

module.exports = router;