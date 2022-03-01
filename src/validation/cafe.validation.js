import helpers from '../helpers';

import { check } from 'express-validator';

const getById = helpers.verifyId('cafeId');

const create = [
  ...helpers.validateRole(['role_reception']),
  check('totalAmount', 'maxGuest is required or kind of wrong data type - Numeric').isNumeric().notEmpty(),
  check('role', 'kindOfRoom is required or kind of wrong data type - String').isString().notEmpty(),
  check('staffId', 'staffId is required or kind of wrong data type - MongoId').isMongoId().notEmpty(),
  check('registerId', 'registerId is required or kind of wrong data type - MongoId').isMongoId().notEmpty(),
  helpers.validataInputs,
];

const update = [...helpers.validateRole(['role_Cafe']), ...helpers.verifyId('cafeId')];

const del = [...helpers.validateRole(['role_reception']), ...helpers.verifyId('cafeId')];

export default { create, update, del, getById };
