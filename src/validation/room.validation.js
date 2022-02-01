import { check } from 'express-validator';
import { validataInputs, validateRole, verifyId } from '../helpers/validateInputs';

const getById = verifyId('roomId');

const create = [
  ...validateRole(['role_admin', 'role_reception']),
  check('maxGuest', 'maxGuest is required or kind of wrong data type - Numeric').isNumeric().notEmpty(),
  check('kindOfRoom', 'kindOfRoom is required or kind of wrong data type - String').isString().notEmpty(),
  check('numberRoom', 'numberRoom is required or kind of wrong data type - Numeric').isNumeric().notEmpty(),
  validataInputs,
];

const update = [...validateRole(['role_admin']), ...verifyId('roomId')];

const del = [...validateRole(['role_admin']), ...verifyId('roomId')];

export default { create, getById, update, del };
