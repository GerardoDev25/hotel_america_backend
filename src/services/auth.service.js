import bcryptjs from 'bcryptjs';
import { response, request } from 'express';

import helpers from '../helpers';
import { MESSAGE, STATUS } from '../helpers/settings';

import Controller from '../controllers';

/**
 * @module Auth/service
 */

/**
 * login service function handle login
 * @param {request} req param of type request
 * @param {response} res param of type response
 * @returns {Promise}
 */

const login = async (req, res) => {
  try {
    //

    const fiels = req.body;
    const { username, password } = fiels;

    const { statusCode, data, ok } = await Controller.Staff.getOne({ username });
    if (!ok) return res.status(statusCode).json({ data, msg: MESSAGE.authError, ok });

    const [user] = data;

    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) return res.status(STATUS.badRequest).json({ data: [], ok: false, msg: MESSAGE.authError });

    const { _id, role, name } = user;
    const token = await helpers.generateJWT({ staffId: _id, role, name });

    res.status(statusCode).json({ token, ok, msg: MESSAGE.authSuccess });

    //
  } catch (error) {
    console.log({ step: 'error loginAuthService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: error.toString(), ok: false, error: true });
  }
};


/**
 * renew service function handle renovate token 
 * @param {request} req param of type request
 * @param {response} res param of type response
 * @returns {Promise}
 */

const renew = async (req, res) => {
  try {
    //

    const { token } = req.body;
    const { staffId } = helpers.parseJwt(token);

    const { statusCode, data, ok } = await Controller.Staff.getById(staffId);
    if (!ok) return res.status(statusCode).json({ data, msg: MESSAGE.authError, ok });

    const [user] = data;

    const { _id, role, name } = user;
    const newToken = await helpers.generateJWT({ staffId: _id, role, name });

    res.status(statusCode).json({ token: newToken, ok, msg: MESSAGE.authSuccess });

    //
  } catch (error) {
    console.log({ step: 'error renewAuthService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: error.toString(), ok: false, error: true });
  }
};

export default { login, renew };
