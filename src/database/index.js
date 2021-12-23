import 'colors';
import mongoose from 'mongoose';
import { dbConnectionUrl } from '../settings';

const dbConnection = async () => {
  try {
    await mongoose.connect(dbConnectionUrl + '/hotel');
    console.log(' db online '.bgWhite.black);
  } catch (error) {
    console.log(' db offline '.bgWhite.red);
  }
};

export default dbConnection;
