import { request, response } from 'express';
import { validationResult, check } from 'express-validator';

import { STATUS, MESSAGE } from './settings';
import { validateJWT } from './jsonWebToken';

export const validataInputs = (req, res, next) => {
  //

  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(STATUS.badRequest).json(errors);
  next();
};

export const haveRole = (roles) => {
  return (req = request, res = response, next) => {
    //

    const { role } = req;

    if (!role || !roles.includes(role)) {
      return res.status(STATUS.unauthorized).json({ msg: MESSAGE.undefined, ko: false, data: [] });
    }

    next();
  };
};

export const validateRole = (roles = []) => {
  return [validateJWT, haveRole(roles)];
};

export const verifyId = (id = '') => {
  return [check(id, `${id} is required or kind of wrong data type - MongoId`).isMongoId().notEmpty(), validataInputs];
};
