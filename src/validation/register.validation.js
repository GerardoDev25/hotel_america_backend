import { check } from 'express-validator';
import { validataInputs, validateRole, verifyId } from '../helpers/validateInputs';

const getById = verifyId('registerId');

const create = [
  check('price', 'price is required or kind of wrong data type - Numeric').isNumeric().notEmpty(),
  check('numberRoom', 'numberRoom is required or kind of wrong data type - Numeric').isNumeric().notEmpty(),
  check('roomId', 'roomId is required or kind of wrong data type - MongoId').isMongoId().notEmpty(),
  check('staffId', 'staffId is required or kind of wrong data type - MongoId').isMongoId().notEmpty(),
  validataInputs,
];

const update = [...validateRole(['role_reception']), ...verifyId('registerId')];

const del = [...validateRole(['role_reception']), ...verifyId('registerId')];

export default { create, getById, update, del };
