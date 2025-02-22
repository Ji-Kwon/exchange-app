const Application = require('../models/application.model');

exports.getAllApplications = async(req, res) => {
    try{
        const applications = await Application.findAll();
        res.status(200).json(applications)
    } catch(error){
        res.status(500).json({error:error.message});
    }
};

exports.getApplicationByID = async(req, res) => {
    try{
        const { id } = req.params;
        const application = await Application.findByPk(id);
        if(!application){
            res.status(404).json({error:'Application not found'})
        }
        res.status(200).json(application);
    } catch(error){
        res.status(500).json({ error: error.message });
    }
};

exports.createApplication = async(req, res) => {
    try{
        const newApplication = await Application.create(req.body);
        res.status(201).json(newApplication);
    } catch(error){
        res.status(500).json({ error: error.message });
    }
};

exports.updateApplication = async(req, res) => {
    try{
        const { id } = req.params;
        const [updated] = await Application.update(req.body,{
            where: {application_id: id},
        });
        if(!updated){
            res.status(404).json({error: 'Application not found'});
        }
        const updatedApplication = await Application.findByPk(id);
        res.status(200).json(updatedApplication);
    } catch(error){
        res.status(500).json({ error: error.message });
    }
};

exports.deleteApplication = async(req, res) => {
    try{
        const { id } = req.params;
        const deleted = await Application.destroy({
            where: {application_id: id}
        });
        if (!deleted){
            return res.status(404).json({ error: 'Application not found' });
        }
        res.status(204).send();
    } catch(error){
        res.status(500).json({ error: error.message });
    }
};