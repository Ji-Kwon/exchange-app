const express = require('express');
const volunteerLabelController = require('../controllers/volunteerLabel.controller');

const router = express.Router();

router.get('/', volunteerLabelController.getAllVolunteerLabels);

router.get('/:id', volunteerLabelController.getVolunteerLabelById);

router.post('/', volunteerLabelController.createVolunteerLabel);

router.delete('/:id', volunteerLabelController.deleteVolunteerLabel);

module.exports = router;
