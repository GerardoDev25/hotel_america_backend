import { check } from 'express-validator';
import { validataInputs, validateRole, verifyId } from '../helpers/validateInputs';

const getById = verifyId('cafeId');

const create = [
  ...validateRole(['role_reception']),
  check('totalAmount', 'maxGuest is required or kind of wrong data type - Numeric').isNumeric().notEmpty(),
  check('role', 'kindOfRoom is required or kind of wrong data type - String').isString().notEmpty(),
  check('staffId', 'staffId is required or kind of wrong data type - MongoId').isMongoId().notEmpty(),
  check('registerId', 'registerId is required or kind of wrong data type - MongoId').isMongoId().notEmpty(),
  validataInputs,
];

const update = [...validateRole(['role_Cafe']), ...verifyId('cafeId')];

const del = [...validateRole(['role_reception']), ...verifyId('cafeId')];

export default { create, update, del, getById };
