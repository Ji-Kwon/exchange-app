const User = require('../models/user.model');

exports.getAllUsers = async(req, res) => {
    try{
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error){
        res.status(500).json({ error: error.message });
    }
};

exports.getUserById = async(req, res) => {
    try{
        const { id } = req.params;
        const user = await User.findByPk(id);

        if(!user){
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    }catch(error){
        res.status(500).json({ error: error.message });
    }
};

exports.createUser = async(req,res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
};

exports.updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const [updated] = await User.update(req.body, {
        where: { user_id: id },
      });
      if (!updated) {
        return res.status(404).json({ error: 'User not found' });
      }
      const updatedUser = await User.findByPk(id);
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await User.destroy({
        where: { user_id: id },
      });
      if (!deleted) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};