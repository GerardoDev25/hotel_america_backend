import 'colors';
import cors from 'cors';
import express from 'express';

import Router from '../routers';
import dbConnection from '../database';
import { PORT, PATH } from '../helpers/settings';

/**
 * @class
 * @public
 * @example
 * const server = new Server()
 * server.listen()
 */
class Server {
  /**
   * constructor build an instance of Sever
   * @constructor
   */
  constructor() {
    this.app = express();
    this.port = PORT;

    this.connection();
    this.middlewares();
    this.routerApp();
  }

  /**
   * middlewares function make functionalities before all
   */
  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static('./src/public'));
  }

  /**
   * the router app function injects the routes from the apiRest
   */
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

  /**
   * async function that connnect with the data base
   */
  async connection() {
    await dbConnection();
  }

  /**
   * function that raises the server
   */
  listen() {
    this.app.listen(this.port, () => {
      console.log('*'.blue + `*********************************`.blue + '*'.blue);
      console.log('*'.blue + `---- server run in port ${this.port} ----`.bgCyan.black + '*'.blue);
    });
  }
}

export default Server;
