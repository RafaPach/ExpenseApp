import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes/index.js';
import connection from './db/connection.js';

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 5000;

//mongoDB connection

connection.then((db) => {
  if (!db) return process.exit(1);
  app.listen(port, () => {
    console.log('Running on port 5000 and connected to DB');
  });
});

app.use('/', routes);
