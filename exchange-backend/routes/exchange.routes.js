const express = require('express');
const exchangeController = require('../controllers/exchange.controller');

const router = express.Router();

router.get('/', exchangeController.getAllExchanges);

router.get('/:id', exchangeController.getExchangeById);

router.post('/', exchangeController.createExchange);

router.put('/:id', exchangeController.updateExchange);

router.delete('/:id', exchangeController.deleteExchangeById);

module.exports = router;