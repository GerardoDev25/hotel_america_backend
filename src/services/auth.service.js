import bcryptjs from 'bcryptjs';
import { response, request } from 'express';

import Controller from '../controllers';

import { generateJWT } from '../helpers';
import { MESSAGE, STATUS } from '../helpers/settings';

const login = async (req = request, res = response) => {
  try {
    //

    const fiels = req.body;
    const { username, password } = fiels;

    const { statusCode, data, ok } = await Controller.Staff.getOne({ username });
    if (!ok) return res.status(statusCode).json({ data, msg: MESSAGE.authError, ok });

    const [user] = data;

    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) return res.status(STATUS.badRequest).json({ data, ok, msg: MESSAGE.authError });

    const { _id, role, name } = user;
    const token = await generateJWT({ staffId: _id, role, name });

    res.json({ token, ok, msg: MESSAGE.authSuccess });

    //
  } catch (error) {
    console.log({ step: 'error loginAuthService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: MESSAGE.conflict, ok: false });
  }
};

export default { login };
