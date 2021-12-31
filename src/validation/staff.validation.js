import { check } from 'express-validator';
import { validataInputs } from './validateInputs';

const verifyId = [check('staffId', 'staffId is required or kind of wrong data type - MongoId').isMongoId().notEmpty(), validataInputs];

const create = [
  check('name', 'name is required or kind of wrong data type - String').isString().notEmpty(),
  check('age', 'age is required or kind of wrong data type - Numeric').isNumeric().notEmpty(),
  check('role', 'role is required or kind of wrong data type - String').isString().notEmpty(),
  check('phone', 'phone is required or kind of wrong data type - Numeric').isNumeric().notEmpty(),
  check('password', 'password is required or kind of wrong data type - String').isString().notEmpty(),
  validataInputs,
];

export default { verifyId, create };
