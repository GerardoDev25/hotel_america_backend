import { request, response } from 'express';
import { validationResult, check } from 'express-validator';

import { STATUS, MESSAGE } from './settings';
import { validateJWT } from './jsonWebToken';

/**
 * @module Helpers
 */

/**
 * validataInputs valid inputs
 * @param {request} req
 * @param {response} res
 * @param {Function} next
 */
export const validataInputs = (req, res, next) => {
  //

  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(STATUS.badRequest).json(errors);
  next();
};

/**
 * @param {Array} roles array of roles
 * @returns {Function}
 */
export const haveRole = (roles) => {
  return (req = request, res = response, next) => {
    //

    // @ts-ignore
    const { role } = req;

    if (!role || !roles.includes(role)) {
      return res.status(STATUS.unauthorized).json({ msg: MESSAGE.msgUndefined, ko: false, data: [] });
    }

    next();
  };
};

/**
 * validateRole
 * @param {array} roles array of roles
 * @returns {array}
 */
export const validateRole = (roles = []) => {
  return [validateJWT, haveRole(roles)];
};

/**
 * verifyId function that exist item
 * @param {string} id id to verify
 * @returns {Array}
 */
export const verifyId = (id = '') => {
  return [check(id, `${id} is required or kind of wrong data type - MongoId`).isMongoId().notEmpty(), validataInputs];
};
