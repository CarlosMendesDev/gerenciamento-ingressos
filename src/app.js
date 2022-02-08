import express from 'express';
import router from './routes/EventRoutes.js'

class App {
  constructor() {
    this.server = express();
    this.server.use(express.json());
    this.server.use(router);
  };
};

export default new App().server;
