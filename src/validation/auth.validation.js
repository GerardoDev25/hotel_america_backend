import { check } from 'express-validator';
import helpers from '../helpers';

const login = [
  check('username', 'the username is required').not().isEmpty(),
  check('password', 'the password is required').not().isEmpty(),
  helpers.validataInputs,
];

const renew = [check('token', 'token required').not().isEmpty()];

export default { login, renew };
