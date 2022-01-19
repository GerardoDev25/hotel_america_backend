import { check } from 'express-validator';
import { validataInputs } from './validateInputs';

const login = [check('username', 'the username is required'), check('password', 'the password is required').not().isEmpty(), validataInputs];

export default { login };
