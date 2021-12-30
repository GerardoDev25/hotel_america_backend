import { check } from 'express-validator';
import { validataInputs } from './validateInputs';

const verifyId = [check('registerId', 'registerId is required or kind of wrong data type - MongoId').isMongoId().notEmpty(), validataInputs];

const create = [
  check('price', 'price is required or kind of wrong data type - Numeric').isNumeric().notEmpty(),
  check('checkOut', 'checkOut is required or kind of wrong data type - Numeric').isNumeric().notEmpty(),
  check('numberRoom', 'numberRoom is required or kind of wrong data type - Numeric').isNumeric().notEmpty(),

  check('roomId', 'roomId is required or kind of wrong data type - MongoId').isMongoId().notEmpty(),
  check('staffId', 'staffId is required or kind of wrong data type - MongoId').isMongoId().notEmpty(),
  validataInputs,
];

export default { verifyId, create };
