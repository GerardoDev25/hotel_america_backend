import { check } from 'express-validator';
import { validateRole, verifyId, validataInputs } from '../helpers/validateInputs';

const getById = verifyId('staffId');

const create = [
  ...validateRole(['role_admin']),
  check('role', 'role is required or kind of wrong data type - String').isString().notEmpty(),
  check('age', 'age is required or kind of wrong data type - Numeric').isNumeric().notEmpty(),
  check('name', 'name is required or kind of wrong data type - String').isString().notEmpty(),
  check('phone', 'phone is required or kind of wrong data type - Numeric').isNumeric().notEmpty(),
  check('password', 'password is required or kind of wrong data type - String').isString().notEmpty(),
  validataInputs,
];

const update = [...validateRole(['role_admin']), ...verifyId('staffId')];

const del = [...validateRole(['role_admin']), ...verifyId('staffId')];

export default { create, getById, update, del };
