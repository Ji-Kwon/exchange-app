const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register= async(req, res) => {
    try{
        const{email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({email, password: hashedPassword});
        res.status(201).json(newUser);
    } catch(error){
        res.status(500).json({ error: error.message });
    }
};

exports.login = async(req,res) => {
    try{
        const { email, password} = req.body;
        const user = await User.findOne({where: {email}});

        if (!user){
            return res.status(404).json({ error: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid){
            return res.status(401).json({ error: 'Invalid password' });
        }
        const token = jwt.sign({ userId: user.id }, 'YOUR_SECRET_KEY', {
            expiresIn: '1h',
          });
        res.status(200).json({ token });
    } catch(error){
        res.status(500).json({ error: error.message });
    }
}