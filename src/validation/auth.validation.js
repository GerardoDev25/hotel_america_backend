import { check } from 'express-validator';
import { validataInputs } from '../helpers/validateInputs';

const login = [
  check('username', 'the username is required').not().isEmpty(),
  check('password', 'the password is required').not().isEmpty(),
  validataInputs,
];

const renew = [check('token', 'token required').not().isEmpty()];

export default { login, renew };
