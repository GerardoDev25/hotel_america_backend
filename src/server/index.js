import 'colors';
import cors from 'cors';
import express from 'express';

import Router from '../routers';
import dbConnection from '../database';
import { PORT, PATH } from '../helpers/settings';

class Server {
  constructor() {
    this.app = express();
    this.port = PORT;

    this.connection();
    this.middlewares();
    this.routerApp();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static('./src/public'));
  }

  routerApp() {
    this.app.use(PATH.auth, Router.auth);
    this.app.use(PATH.room, Router.room);
    this.app.use(PATH.cafe, Router.cafe);
    this.app.use(PATH.staff, Router.staff);
    this.app.use(PATH.goest, Router.goest);
    this.app.use(PATH.amount, Router.amount);
    this.app.use(PATH.lodging, Router.lodging);
    this.app.use(PATH.register, Router.register);
  }

  async connection() {
    await dbConnection();
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('*'.blue + `*********************************`.blue + '*'.blue);
      console.log('*'.blue + `---- server run in port ${this.port} ----`.bgCyan.black + '*'.blue);
    });
  }
}

export default Server;
