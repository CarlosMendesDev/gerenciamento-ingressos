import 'dotenv/config';
import server from './app.js';
import sequelize from './service/DatabaseConnection.js';
import './model/Event.js';
import './model/User.js';
import './model/Ticket.js';

sequelize.sync().catch((err) => {
  console.log(err);
});

server.listen(process.env.PORT, () => {
  console.log(`Start server on port ${process.env.PORT}! :D`);
});
