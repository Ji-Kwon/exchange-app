const express = require('express');
const labelController = require('../controllers/label.controller');

const router = express.Router();

router.get('/', labelController.getAllLabels);

router.get('/:id', labelController.getLabelById);

router.post('/', labelController.createLabel);

router.put('/:id', labelController.updateLabel);

router.delete('/:id', labelController.deleteLabel);

module.exports = router;
