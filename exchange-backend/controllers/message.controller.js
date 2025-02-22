const Message = require('../models/message.model');

exports.getAllMessages = async(req, res) => {
    try{
        const messages = await Message.findAll();
        res.status(200).json(messages);
    } catch(error){
        res.status(500).json({ error: error.message });
    }
};

exports.getMessageById = async(req, res) => {
    try{
        const { id } = req.params;
        const message = await Message.findByPk(id);
        if(!message){
            return res.status(404).json({ error: 'Message not found' });
        }
        res.status(200).json(message)
    } catch(error){
        res.status(500).json({ error: error.message });
    }
};

exports.createMessage = async(req, res) => {
    try{
        const newMessage = await Message.create(req.body);
        res.status(201).json(newMessage);
    } catch(error){
        res.status(500).json({ error: error.message });
    }
}