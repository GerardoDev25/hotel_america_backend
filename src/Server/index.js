import cors from 'cors';
import http from 'http';
import express from 'express';

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.serverApp = http.createServer(this.app);
    this.middlewares();
  }

  middlewares() {
    this.app.use(cors());
  }

  listen() {
    this.serverApp.listen(this.port, () => {
      console.log('server run in port ', this.port);
    });
  }
}

export default Server;
