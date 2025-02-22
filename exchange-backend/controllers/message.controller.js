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
};

exports.updateMessage = async (req, res) => {
    try {
      const { id } = req.params;
      const [updated] = await Message.update(req.body, {
        where: { message_id: id }
      });
  
      if (updated) {
        const updatedMessage = await Message.findByPk(id);
        return res.status(200).json(updatedMessage);
      }
  
      throw new Error('Message not found');
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.deleteMessage = async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Message.destroy({
        where: { message_id: id }
      });
  
      if (deleted) {
        return res.status(204).send();
      }
  
      throw new Error('Message not found');
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };