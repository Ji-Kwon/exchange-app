const express = require('express');
const volunteerController = require('../controllers/volunteer.controller');

const router = express.Router();

router.get('/', volunteerController.getAllVolunteers);

router.get('/:id', volunteerController.getVolunteerById);

router.post('/', volunteerController.createVolunteer);

router.put('/:id', volunteerController.updateVolunteer);

router.delete('/:id', volunteerController.deleteVolunteer);

module.exports = router;
