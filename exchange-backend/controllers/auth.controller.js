const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { first_name, last_name, email, phone_number, password } = req.body;

        if (!first_name || !last_name || !email || !password) {
            return res.status(400).json({ error: 'Please provide all required fields' });
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        const newUser = await User.create({
            first_name,
            last_name,
            email,
            phone_number,
            password: hashedPassword
        });

        res.status(201).json(newUser);
    } catch (error) {
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

        const isPasswordValid = await bcrypt.compareSync(password, user.password);
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