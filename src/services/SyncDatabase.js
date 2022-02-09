import sequelize from './DatabaseConnection.js';
import Event from '../models/Event.js';
import User from '../models/User.js';
import Ticket from '../models/Ticket.js';

Ticket.belongsTo(Event, { foreignKey: 'id_event' });
Ticket.belongsTo(User, { foreignKey: 'id_user' });

User.hasMany(Ticket, { onDelete: 'cascade' });
Event.hasMany(Ticket, { onDelete: 'cascade' });

sequelize.sync().catch((err) => {
  console.log(err);
});

export default sequelize;
