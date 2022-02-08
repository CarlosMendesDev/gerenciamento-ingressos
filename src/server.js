import 'dotenv/config';
import server from './app.js';
import sequelize from './services/DatabaseConnection.js';
import './models/Event.js';
import './models/User.js';
import './models/Ticket.js';

sequelize.sync().catch((err) => {
  console.log(err);
});

server.listen(process.env.PORT, () => {
  console.log(`Start server on port ${process.env.PORT}! :D`);
});
