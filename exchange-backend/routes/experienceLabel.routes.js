const express = require('express');
const experienceLabelController = require('../controllers/experienceLabel.controller');

const router = express.Router();

router.get('/', experienceLabelController.getAllExperienceLabels);

router.get('/:id', experienceLabelController.getExperienceLabelById);

router.post('/', experienceLabelController.createExperienceLabel);

router.put('/:id', experienceLabelController.updateExperienceLabel);

router.delete('/:id', experienceLabelController.deleteExperienceLabel);

module.exports = router;
