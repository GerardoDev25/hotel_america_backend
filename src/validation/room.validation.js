import { check } from 'express-validator';
import helpers from '../helpers';

const getById = helpers.verifyId('roomId');

const create = [
  ...helpers.validateRole(['role_admin']),
  check('maxGuest', 'maxGuest is required or kind of wrong data type - Numeric').isNumeric().notEmpty(),
  check('kindOfRoom', 'kindOfRoom is required or kind of wrong data type - String').isString().notEmpty(),
  check('numberRoom', 'numberRoom is required or kind of wrong data type - Numeric').isNumeric().notEmpty(),
  helpers.validataInputs,
];

const update = [...helpers.validateRole(['role_admin', 'role_reception']), ...helpers.verifyId('roomId')];

const del = [...helpers.validateRole(['role_admin']), ...helpers.verifyId('roomId')];

export default { create, getById, update, del };
