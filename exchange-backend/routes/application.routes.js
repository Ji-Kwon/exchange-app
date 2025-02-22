const express = require('express');
const applicationController = require('../controllers/application.controller');
const verifyToken = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', verifyToken, applicationController.getAllApplications);

router.get('/:id', verifyToken, applicationController.getApplicationByID);

router.post('/', verifyToken, applicationController.createApplication);

router.put('/', verifyToken, applicationController.updateApplication);

router.delete('/:id'. verifyToken, applicationController.deleteApplication);

module.exports = router;