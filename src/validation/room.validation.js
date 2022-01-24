import { check } from 'express-validator';
import { haveRole, validataInputs, validateJWT } from './validateInputs';

const verifyId = [check('roomId', 'roomId is required or kind of wrong data type - MongoId').isMongoId().notEmpty(), validataInputs];

const create = [
  validateJWT,
  haveRole('role_admin'),
  check('maxGuest', 'maxGuest is required or kind of wrong data type - Numeric').isNumeric().notEmpty(),
  check('kindOfRoom', 'kindOfRoom is required or kind of wrong data type - String').isString().notEmpty(),
  check('numberRoom', 'numberRoom is required or kind of wrong data type - Numeric').isNumeric().notEmpty(),
  validataInputs,
];
export default { verifyId, create };
