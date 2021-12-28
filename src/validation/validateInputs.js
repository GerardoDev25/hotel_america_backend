import { validationResult } from 'express-validator';
import { STATUS } from '../settings';

export const validataInputs = (req, res, next) => {
  const errors = validationResult(req);
  console.log({errors});
  if (!errors.isEmpty()) return res.status(STATUS.badRequest).json(errors);
  next();
};
