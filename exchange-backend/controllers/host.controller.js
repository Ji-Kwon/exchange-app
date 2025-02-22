const Host = require('../models/host.model');

// Get all hosts
exports.getAllHosts = async (req, res) => {
    try {
        const hosts = await Host.findAll();
        res.status(200).json(hosts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get host by ID
exports.getHostById = async (req, res) => {
    try {
        const { id } = req.params;
        const host = await Host.findByPk(id);

        if (!host) {
            return res.status(404).json({ error: 'Host not found' });
        }

        res.status(200).json(host);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new host
exports.createHost = async (req, res) => {
    try {
        const newHost = await Host.create(req.body);
        res.status(201).json(newHost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update host
exports.updateHost = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Host.update(req.body, {
            where: { host_id: id }
        });

        if (!updated) {
            return res.status(404).json({ error: 'Host not found' });
        }

        const updatedHost = await Host.findByPk(id);
        res.status(200).json(updatedHost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete host
exports.deleteHost = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Host.destroy({
            where: { host_id: id }
        });

        if (!deleted) {
            return res.status(404).json({ error: 'Host not found' });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
