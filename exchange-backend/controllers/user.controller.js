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
      const user = await User.findByPk(id, {
        attributes: ['user_id', 'first_name', 'last_name', 'email', 'profile_picture', 'bio', 'skills', 'interests']
      });

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
    // Build an object with only the fields that are provided in the request
    const updateFields = {};
    if (req.body.bio !== undefined) {
      updateFields.bio = req.body.bio;
    }
    if (req.body.profile_picture !== undefined) {
      updateFields.profile_picture = req.body.profile_picture;
    }
    // Optionally, update first_name and last_name if provided
    if (req.body.first_name !== undefined) {
      updateFields.first_name = req.body.first_name;
    }
    if (req.body.last_name !== undefined) {
      updateFields.last_name = req.body.last_name;
    }
    if (req.body.skills !== undefined) {
      updateFields.skills = req.body.skills;
    }
    if (req.body.interests !== undefined) {
      updateFields.interests = req.body.interests;
    }

    const [updated] = await User.update(updateFields, {
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