import { check } from 'express-validator';
import { validataInputs, validateRole, verifyId } from '../helpers/validateInputs';

const getById = verifyId('amountId');

const create = [
  ...validateRole(['role_laundry', 'role_reception']),
  check('totalAmount', 'maxGuest is required or kind of wrong data type - Numeric').isNumeric().notEmpty(),
  check('role', 'kindOfRoom is required or kind of wrong data type - String').isString().notEmpty(),
  check('staffId', 'staffId is required or kind of wrong data type - MongoId').isMongoId().notEmpty(),
  check('registerId', 'registerId is required or kind of wrong data type - MongoId').isMongoId().notEmpty(),
  validataInputs,
];

const update = [...validateRole(['role_laundry', 'role_reception']), ...verifyId('amountId')];

const del = [...validateRole(['role_laundry', 'role_reception']), ...verifyId('amountId')];

export default { create, update, del, getById };
