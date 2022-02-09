import Sequelize from 'sequelize';
import sequelize from '../services/DatabaseConnection.js';

const Ticket = sequelize.define('Tickets', {
  id_ticket: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  desc_ticket: Sequelize.STRING,
  price_ticket: Sequelize.DOUBLE,
});

export default Ticket;
