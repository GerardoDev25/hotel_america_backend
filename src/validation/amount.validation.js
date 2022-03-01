import { check } from 'express-validator';
import helpers from '../helpers';

const getById = helpers.verifyId('amountId');

const create = [
  ...helpers.validateRole(['role_laundry', 'role_reception']),
  check('type', 'type is required or kind of wrong data type - String').isString().notEmpty(),
  check('staffId', 'staffId is required or kind of wrong data type - MongoId').isMongoId().notEmpty(),
  check('totalAmount', 'maxGuest is required or kind of wrong data type - Numeric').isNumeric().notEmpty(),
  check('registerId', 'registerId is required or kind of wrong data type - MongoId').isMongoId().notEmpty(),
  helpers.validataInputs,
];

const update = [...helpers.validateRole(['role_laundry', 'role_reception']), ...helpers.verifyId('amountId')];

const del = [...helpers.validateRole(['role_laundry', 'role_reception']), ...helpers.verifyId('amountId')];

export default { create, update, del, getById };
