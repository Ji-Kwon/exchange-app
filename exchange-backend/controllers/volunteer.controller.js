const Volunteer = require('../models/volunteer.model');

// Get all volunteers
exports.getAllVolunteers = async (req, res) => {
    try {
        const volunteers = await Volunteer.findAll();
        res.status(200).json(volunteers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get volunteer by ID
exports.getVolunteerById = async (req, res) => {
    try {
        const { id } = req.params;
        const volunteer = await Volunteer.findByPk(id);

        if (!volunteer) {
            return res.status(404).json({ error: 'Volunteer not found' });
        }

        res.status(200).json(volunteer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new volunteer
exports.createVolunteer = async (req, res) => {
    try {
        const newVolunteer = await Volunteer.create(req.body);
        res.status(201).json(newVolunteer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update volunteer
exports.updateVolunteer = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Volunteer.update(req.body, {
            where: { volunteer_id: id }
        });

        if (!updated) {
            return res.status(404).json({ error: 'Volunteer not found' });
        }

        const updatedVolunteer = await Volunteer.findByPk(id);
        res.status(200).json(updatedVolunteer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete volunteer
exports.deleteVolunteer = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Volunteer.destroy({
            where: { volunteer_id: id }
        });

        if (!deleted) {
            return res.status(404).json({ error: 'Volunteer not found' });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
