const ExperienceLabel = require('../models/experienceLabel.model');

// Get all experience labels
exports.getAllExperienceLabels = async (req, res) => {
    try {
        const experienceLabels = await ExperienceLabel.findAll();
        res.status(200).json(experienceLabels);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get experience label by ID
exports.getExperienceLabelById = async (req, res) => {
    try {
        const { id } = req.params;
        const experienceLabel = await ExperienceLabel.findByPk(id);

        if (!experienceLabel) {
            return res.status(404).json({ error: 'Experience Label not found' });
        }

        res.status(200).json(experienceLabel);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new experience label
exports.createExperienceLabel = async (req, res) => {
    try {
        const newExperienceLabel = await ExperienceLabel.create(req.body);
        res.status(201).json(newExperienceLabel);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update experience label
exports.updateExperienceLabel = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await ExperienceLabel.update(req.body, {
            where: { experience_label_id: id }
        });

        if (!updated) {
            return res.status(404).json({ error: 'Experience Label not found' });
        }

        const updatedExperienceLabel = await ExperienceLabel.findByPk(id);
        res.status(200).json(updatedExperienceLabel);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete experience label
exports.deleteExperienceLabel = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await ExperienceLabel.destroy({
            where: { experience_label_id: id }
        });

        if (!deleted) {
            return res.status(404).json({ error: 'Experience Label not found' });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
