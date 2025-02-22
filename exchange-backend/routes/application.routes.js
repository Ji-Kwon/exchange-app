const express = require('express');
const applicationController = require('../controllers/application.controller');

const router = express.Router();

router.get('/', applicationController.getAllApplications);

router.get('/:id', applicationController.getApplicationByID);

router.post('/', applicationController.createApplication);

router.put('/', applicationController.updateApplication);

router.delete('/:id', applicationController.deleteApplication);

module.exports = router;