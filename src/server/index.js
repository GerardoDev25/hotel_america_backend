import cors from 'cors';
import express from 'express';
import router from '../routers';
import { PORT, PATH } from '../settings';

class Server {
  constructor() {
    this.app = express();
    this.port = PORT;

    this.middlewares();
    this.routerApp();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static('./src/public'));
  }

  routerApp() {
    this.app.use(PATH.user, router.user);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('server run in port ', this.port);
    });
  }
}

export default Server;
