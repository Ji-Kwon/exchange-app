const VolunteerLabel = require('../models/volunteerLabel.model');

// Get all volunteer labels
exports.getAllVolunteerLabels = async (req, res) => {
    try {
        const volunteerLabels = await VolunteerLabel.findAll();
        res.status(200).json(volunteerLabels);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get volunteer label by ID
exports.getVolunteerLabelById = async (req, res) => {
    try {
        const { id } = req.params;
        const volunteerLabel = await VolunteerLabel.findByPk(id);

        if (!volunteerLabel) {
            return res.status(404).json({ error: 'Volunteer Label not found' });
        }

        res.status(200).json(volunteerLabel);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new volunteer label
exports.createVolunteerLabel = async (req, res) => {
    try {
        const newVolunteerLabel = await VolunteerLabel.create(req.body);
        res.status(201).json(newVolunteerLabel);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete volunteer label
exports.deleteVolunteerLabel = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await VolunteerLabel.destroy({
            where: { volunteer_label_id: id }
        });

        if (!deleted) {
            return res.status(404).json({ error: 'Volunteer Label not found' });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
