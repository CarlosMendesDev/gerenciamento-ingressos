import express from 'express';
import routerEvents from './routes/EventRoutes.js';
import routerUsers from './routes/UserRoutes.js';
import routerTickets from './routes/TicketRoutes.js';

class App {
  constructor() {
    this.server = express();
    this.server.use(express.json());
    this.server.use([routerEvents, routerUsers, routerTickets]);
  };
};

export default new App().server;
