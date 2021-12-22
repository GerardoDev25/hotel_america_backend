import 'colors';
import mongoose from 'mongoose';
import { dbConnectionUrl } from '../settings';

 const dbConnection = async () => {
  try {
    await mongoose.connect(dbConnectionUrl+'/hotel');
    console.log('db online'.green);
  } catch (error) {}
  dbConnectionUrl;
};

export default dbConnection