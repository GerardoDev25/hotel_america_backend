import { check } from 'express-validator';
import { validataInputs, validateRole, verifyId } from '../helpers/validateInputs';

const getById = verifyId('goestId');

const create = [
  ...validateRole(['role_reception']),
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

const update = [...validateRole(['role_reception']), ...verifyId('goestId')];

const del = [...validateRole(['role_reception']), ...verifyId('goestId')];

export default { create, getById, update, del };
