import cors from 'cors';
import express from 'express';

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.middlewares();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static('./src/public'))
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('server run in port ', this.port);
    });
  }
}

export default Server;
