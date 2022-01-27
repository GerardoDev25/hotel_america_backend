import { check } from 'express-validator';
import { validataInputs } from './validateInputs';

const create = [
  check('totalAmount', 'maxGuest is required or kind of wrong data type - Numeric').isNumeric().notEmpty(),
  check('role', 'kindOfRoom is required or kind of wrong data type - String').isString().notEmpty(),
  check('staffId', 'staffId is required or kind of wrong data type - MongoId').isMongoId().notEmpty(),
  check('registerId', 'registerId is required or kind of wrong data type - MongoId').isMongoId().notEmpty(),
  validataInputs,
];

export default { create };
