const Exchange = require('../models/exchange.model');

exports.getAllExchanges = async(req, res) => {
    try{
        const newExchange = await Exchange.findAll();
        res.status(200).json(newExchange);
    } catch (error){
        res.status(500).json({ error: error.message });
    }
};

exports.getExchangeById = async(req, res) => {
    try{
        const { id } = req.params;
        const exchange = await Exchange.findByPk(id);

        if (!exchange){
            return res.status(404).json({ error: 'Exchange not found' });
        }

        res.status(200).json(exchange);
    } catch (error){
        res.status(500).json({ error: error.message });
    }
};

exports.createExchange = async(req, res) => {
    try{
        const newExchange = await Exchange.create(req.body)
        res.status(201).json(newExchange)
    } catch(error){
        res.status(500).json({ error: error.message });
    }
};

exports.updateExchange = async(req, res) =>{
    try{
        const { id } = req.params;
        const [updated] = await Exchange.update(req.body, {
            where: { exchange_id: id },
        });

        if (!updated){
            return res.status(404).json({ error: 'Exchange not found' });
        }

        const updatedExchange = await Exchange.findByPk(id);
        res.status(200).json(updatedExchange);
    } catch(error){
        res.status(500).json({ error: error.message });
    }
};

exports.deleteExchangeById = async(req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Exchange.destroy({
            where: {exchange_id: id},
        });

        if (!deleted){
            return res.status(404).json({ error: 'Exchange not found' });
        }

        res.status(204).send();
    } catch (error){
        res.status(500).json({ error: error.message });
    }
};