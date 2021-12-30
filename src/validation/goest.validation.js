import { check } from 'express-validator';
import { validataInputs } from './validateInputs';

const verifyId = [check('goestId', 'roomId is required or kind of wrong data type - MongoId').isMongoId().notEmpty(), validataInputs];

const create = [
  check('name', 'name is required or kind of wrong data type - String').isString().notEmpty(),
  check('origin', 'origin is required or kind of wrong data type - String').isString().notEmpty(),
  check('posting', 'posting is required or kind of wrong data type - String').isString().notEmpty(),
  check('lastName', 'lastName is required or kind of wrong data type - String').isString().notEmpty(),
  check('dateOfBirth', 'dateOfBirth is required or kind of wrong data type - Numeric').isNumeric().notEmpty(),
  check('ci', 'ci is required or kind of wrong data type - String').isString().notEmpty(),
  check('numberRoom', 'numberRoom is required or kind of wrong data type - Numeric').isNumeric().notEmpty(),

  check('registerId', 'registerId is required or kind of wrong data type - MongoId').isMongoId().notEmpty(),
  validataInputs,
];

export default { verifyId, create };
