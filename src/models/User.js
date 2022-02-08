import Sequelize from 'sequelize';
import sequelize from '../services/DatabaseConnection.js';

const User = sequelize.define('Users', {
  id_user: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: Sequelize.STRING,
  user_login: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  user_password: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

export default User;
