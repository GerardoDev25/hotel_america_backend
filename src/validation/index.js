import { check } from 'express-validator';

import { haveRole, validataInputs, validateJWT } from './validateInputs';

import Room from './room.validation';
import Amount from './amount.validation';
import Goest from './goest.validation';
import Register from './register.validation';
import Staff from './staff.validation';
import Auth from './auth.validation';

const validateRole = (roles = []) => {
  return [validateJWT, haveRole(roles)];
};

const verifyId = (id = '') => {
  return [check(id, `${id} is required or kind of wrong data type - MongoId`).isMongoId().notEmpty(), validataInputs];
};

export default { Room, Amount, Goest, Register, Staff, Auth, validateRole, verifyId };
