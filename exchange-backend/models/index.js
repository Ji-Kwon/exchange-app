const sequelize = require('../config/database');
const User = require('./user.model');
const Volunteer = require('./volunteer.model');
const Host = require('./host.model');
const Exchange = require('./exchange.model');
const Label = require('./label.model');
const VolunteerLabel = require('./volunteerLabel.model');
const ExperienceLabel = require('./experienceLabel.model');
const Application = require('./application.model');
const Message = require('./message.model');
const Review = require('./review.model');

// -------------------------------------------------------------
// 1. One-to-One Relationships
// -------------------------------------------------------------
User.hasOne(Volunteer, { foreignKey: 'user_id' });
Volunteer.belongsTo(User, { foreignKey: 'user_id' });

User.hasOne(Host, { foreignKey: 'user_id' });
Host.belongsTo(User, { foreignKey: 'user_id' });

// -------------------------------------------------------------
// 2. One-to-Many Relationships
// -------------------------------------------------------------
Host.hasMany(Exchange, { foreignKey: 'host_id' });
Exchange.belongsTo(Host, { foreignKey: 'host_id' });

Exchange.hasMany(Review, { foreignKey: 'exchange_id' });
Review.belongsTo(Exchange, { foreignKey: 'exchange_id' });

Volunteer.hasMany(Review, { foreignKey: 'volunteer_id' });
Review.belongsTo(Volunteer, { foreignKey: 'volunteer_id' });

User.hasMany(Message, { foreignKey: 'sender_id' });
User.hasMany(Message, { foreignKey: 'receiver_id' });
Message.belongsTo(User, { foreignKey: 'sender_id', as: 'Sender' });
Message.belongsTo(User, { foreignKey: 'receiver_id', as: 'Receiver' });

// -------------------------------------------------------------
// 3. Many-to-Many Relationships
// -------------------------------------------------------------

// Volunteer <-> Label (Skills & Interests)
Volunteer.belongsToMany(Label, { through: VolunteerLabel, foreignKey: 'volunteer_id' });
Label.belongsToMany(Volunteer, { through: VolunteerLabel, foreignKey: 'label_id' });

// Exchange <-> Label (Required Skills & Interests)
Exchange.belongsToMany(Label, { through: ExperienceLabel, foreignKey: 'exchange_id' });
Label.belongsToMany(Exchange, { through: ExperienceLabel, foreignKey: 'label_id' });

// Volunteer <-> Exchange (Applications)
Volunteer.belongsToMany(Exchange, { through: Application, foreignKey: 'volunteer_id' });
Exchange.belongsToMany(Volunteer, { through: Application, foreignKey: 'exchange_id' });

// -------------------------------------------------------------
// 4. Exporting All Models
// -------------------------------------------------------------

module.exports = {
  sequelize,
  User,
  Volunteer,
  Host,
  Exchange,
  Label,
  VolunteerLabel,
  ExperienceLabel,
  Application,
  Message,
  Review,
};