import { check } from 'express-validator';
import helpers from '../helpers';

const getById = helpers.verifyId('registerId');

const create = [
  check('price', 'price is required or kind of wrong data type - Numeric').isNumeric().notEmpty(),
  check('numberRoom', 'numberRoom is required or kind of wrong data type - Numeric').isNumeric().notEmpty(),
  check('roomId', 'roomId is required or kind of wrong data type - MongoId').isMongoId().notEmpty(),
  check('staffId', 'staffId is required or kind of wrong data type - MongoId').isMongoId().notEmpty(),
  helpers.validataInputs,
];

const update = [...helpers.validateRole(['role_reception']), ...helpers.verifyId('registerId')];

const del = [...helpers.validateRole(['role_reception']), ...helpers.verifyId('registerId')];

export default { create, getById, update, del };
