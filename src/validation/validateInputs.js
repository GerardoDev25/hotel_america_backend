import { request, response } from 'express';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

import { STATUS, MESSAGE, SECRETORPRIVATEKEY } from '../settings';

export const validataInputs = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(STATUS.badRequest).json(errors);
  next();
};

export const validateJWT = async (req = request, res = response, next) => {
  // const token = req.headers('token');
  const token = req.header('token');

  // * if there is no token
  if (!token) return res.status(STATUS.unauthorized).json({ msg: MESSAGE.undefined, ko: false, data: [] });

  const { role } = jwt.verify(token, SECRETORPRIVATEKEY);
  if (!role) return res.status(STATUS.unauthorized).json({ msg: MESSAGE.undefined, ko: false, data: [] });

  req.role = role;
  next();
};

export const haveRole = (...roles) => {
  return (req = request, res = response, next) => {
    //
    if (!req.role) return res.status(STATUS.unauthorized).json({ msg: MESSAGE.undefined, ko: false, data: [] });

    const { role } = req;

    if (!roles.includes(role)) {
      return res.status(STATUS.unauthorized).json({ msg: MESSAGE.undefined, ko: false, data: [] });
    }

    next();
  };
};
