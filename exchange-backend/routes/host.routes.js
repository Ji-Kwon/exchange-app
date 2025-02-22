const express = require('express');
const hostController = require('../controllers/host.controller');

const router = express.Router();

router.get('/', hostController.getAllHosts);

router.get('/:id', hostController.getHostById);

router.post('/', hostController.createHost);

router.put('/:id', hostController.updateHost);

router.delete('/:id', hostController.deleteHost);

module.exports = router;
