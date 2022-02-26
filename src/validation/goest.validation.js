import { check } from 'express-validator';
import helpers from '../helpers';

const getById = helpers.verifyId('goestId');

const create = [
  ...helpers.validateRole(['role_reception']),
  check('name', 'name is required or kind of wrong data type - String').isString().notEmpty(),
  check('origin', 'origin is required or kind of wrong data type - String').isString().notEmpty(),
  check('posting', 'posting is required or kind of wrong data type - String').isString().notEmpty(),
  check('lastName', 'lastName is required or kind of wrong data type - String').isString().notEmpty(),
  check('dateOfBirth', 'dateOfBirth is required or kind of wrong data type - Numeric').isNumeric().notEmpty(),
  check('ci', 'ci is required or kind of wrong data type - String').isString().notEmpty(),
  check('numberRoom', 'numberRoom is required or kind of wrong data type - Numeric').isNumeric().notEmpty(),

  check('registerId', 'registerId is required or kind of wrong data type - MongoId').isMongoId().notEmpty(),
  helpers.validataInputs,
];

const update = [...helpers.validateRole(['role_reception']), ...helpers.verifyId('goestId')];

const del = [...helpers.validateRole(['role_reception']), ...helpers.verifyId('goestId')];

export default { create, getById, update, del };
