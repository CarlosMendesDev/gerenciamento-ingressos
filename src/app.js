import express from 'express';
import routerEvents from './routes/EventRoutes.js'
import routerUsers from './routes/UserRoutes.js'

class App {
  constructor() {
    this.server = express();
    this.server.use(express.json());
    this.server.use([routerEvents, routerUsers]);
  };
};

export default new App().server;
