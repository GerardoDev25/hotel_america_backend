import { check } from 'express-validator';

import helpers from '../helpers';

const getById = helpers.verifyId('staffId');

const create = [
  ...helpers.validateRole(['role_admin']),
  check('role', 'role is required or kind of wrong data type - String').isString().notEmpty(),
  check('age', 'age is required or kind of wrong data type - Numeric').isNumeric().notEmpty(),
  check('name', 'name is required or kind of wrong data type - String').isString().notEmpty(),
  check('phone', 'phone is required or kind of wrong data type - Numeric').isNumeric().notEmpty(),
  check('password', 'password is required or kind of wrong data type - String').isString().notEmpty(),
  helpers.validataInputs,
];

const update = [...helpers.validateRole(['role_admin']), ...helpers.verifyId('staffId')];

const del = [...helpers.validateRole(['role_admin']), ...helpers.verifyId('staffId')];

export default { create, getById, update, del };
