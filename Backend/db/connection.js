import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

const connection = mongoose
  .connect(process.env.API_URl)
  .then((db) => {
    console.log('Connected to DB via moongose');
    return db;
  })
  .catch((err) => console.log(err.message));

export default connection;
