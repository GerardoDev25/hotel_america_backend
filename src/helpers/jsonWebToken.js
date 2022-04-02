import { request, response } from 'express';
import jwt from 'jsonwebtoken';

import { MESSAGE, STATUS, SECRET_PRIVATE_KEY } from './settings';

/**
 * @module JWT
 */

/**
 * parseJwt function return info of the token
 * @param {string} token auth
 * @returns {object|null}
 */
export const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

/**
 * generateJWT function that genera a token
 * @param {{staffId:string, role:string, name:string}} params
 * @returns {Promise<string>}
 */
export const generateJWT = ({ staffId = '', role = '', name = '' }) =>
  new Promise((resolve, reject) => {
    const payload = { staffId, role, name };

    jwt.sign(
      payload,
      SECRET_PRIVATE_KEY,
      {
        expiresIn: '9h',
      },
      (err, token) => {
        if (err) {
          console.error(err);
          reject('Error to generate jwt');
        } else resolve(token);
      }
    );
  });

/**
 * validateJWT function
 * @param {request} req
 * @param {response} res
 * @param {Function} next
 */
export const validateJWT = async (req = request, res = response, next) => {
  const token = req.header('token');
  try {
    //

    if (!token) return res.status(STATUS.unauthorized).json({ msg: MESSAGE.msgUndefined, ko: false, data: [] });

    // @ts-ignore
    const { role } = jwt.verify(token, SECRET_PRIVATE_KEY);
    // @ts-ignore
    req.role = role;

    next();

    //
  } catch (error) {
    //TokenExpiredError

    console.log({ step: 'error validateJWT', error: error.toString() });
    return res.status(STATUS.unauthorized).json({ msg: error.toString(), ko: false, data: [] });
  }
};
