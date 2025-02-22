const express = require('express');
const sequelize = require('./config/database');

const app = express();
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/message', require('./routes/message.routes'));
app.use('/api/exchange', require('./routes/exchange.routes'));
app.use('/api/review', require('./routes/review.routes'));
app.use('/api/application', require('./routes/application.routes'));
app.use('/api/volunteer', require('./routes/volunteer.routes'));
app.use('/api/host', require('./routes/host.routes'));
app.use('/api/label', require('./routes/label.routes'));
app.use('/api/volunteerLabel', require('./routes/volunteerLabel.routes'));
app.use('/api/experienceLabel', require('./routes/experienceLabel.routes'));



// Test Route
app.get('/', (req, res) => res.send('API Running'));

// Sync Database
sequelize.sync({ alter: true }).then(() => {
  console.log('Database synced.');
}).catch(err => {
  console.error('Error syncing database:', err);
});

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
