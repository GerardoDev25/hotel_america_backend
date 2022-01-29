import jwt from 'jsonwebtoken';
import { request, response } from 'express';
import { validationResult } from 'express-validator';

import { STATUS, MESSAGE, SECRETORPRIVATEKEY } from '../settings';

export const validataInputs = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(STATUS.badRequest).json(errors);
  next();
};

export const validateJWT = async (req = request, res = response, next) => {
  try {
    //

    const token = req.header('token');

    if (!token) return res.status(STATUS.unauthorized).json({ msg: MESSAGE.undefined, ko: false, data: [] });
    const { role } = jwt.verify(token, SECRETORPRIVATEKEY);
    req.role = role;

    next();

    //
  } catch (error) {
    console.log({ step: 'error validateJWT', error: error.toString() });
    return res.status(STATUS.unauthorized).json({ msg: error.toString(), ko: false, data: [] });
  }
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
