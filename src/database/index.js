import 'colors';
import mongoose from 'mongoose';
import { dbConnectionUrl } from '../helpers/settings';

const dbConnection = async () => {
  try {
    await mongoose.connect(dbConnectionUrl + '/hotel');
    console.log('*'.blue + '----------- db online -----------'.bgCyan.black + '*'.blue);
    console.log('*'.blue + `*********************************`.blue + '*'.blue);
  } catch (error) {
    console.log(' db offline '.bgWhite.red);
    console.log(error.toString().bgWhite.red);
  }
};

export default dbConnection;
