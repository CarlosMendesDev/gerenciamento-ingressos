import Sequelize from 'sequelize';
import sequelize from '../services/DatabaseConnection.js';
import User from './User.js';
import Event from './Event.js';

const Ticket = sequelize.define('Tickets', {
  id_ticket: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  desc_ticket: Sequelize.INTEGER,
  price_ticket: Sequelize.DOUBLE,
});

Ticket.belongsTo(Event, { foreignKey: 'id_event' });
Ticket.belongsTo(User, { foreignKey: 'id_user' });

export default Ticket;
