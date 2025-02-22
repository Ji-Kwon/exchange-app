const Label = require('../models/label.model');

// Get all labels
exports.getAllLabels = async (req, res) => {
    try {
        const labels = await Label.findAll();
        res.status(200).json(labels);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get label by ID
exports.getLabelById = async (req, res) => {
    try {
        const { id } = req.params;
        const label = await Label.findByPk(id);

        if (!label) {
            return res.status(404).json({ error: 'Label not found' });
        }

        res.status(200).json(label);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new label
exports.createLabel = async (req, res) => {
    try {
        const newLabel = await Label.create(req.body);
        res.status(201).json(newLabel);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update label
exports.updateLabel = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Label.update(req.body, {
            where: { label_id: id }
        });

        if (!updated) {
            return res.status(404).json({ error: 'Label not found' });
        }

        const updatedLabel = await Label.findByPk(id);
        res.status(200).json(updatedLabel);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete label
exports.deleteLabel = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Label.destroy({
            where: { label_id: id }
        });

        if (!deleted) {
            return res.status(404).json({ error: 'Label not found' });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
