import Sequelize from 'sequelize';
import sequelize from '../services/DatabaseConnection.js';

const Event = sequelize.define('Event', {
  id_event: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  type_event: Sequelize.STRING,
  name_event: Sequelize.STRING,
  max_capacity: Sequelize.INTEGER,
});

export default Event;
