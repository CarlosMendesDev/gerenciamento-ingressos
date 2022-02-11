import Sequelize from 'sequelize';

const sequelize = new Sequelize(process.env.DATABASE_URI,
{
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

export default sequelize;
