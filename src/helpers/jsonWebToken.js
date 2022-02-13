import jwt from 'jsonwebtoken';

import { MESSAGE, STATUS, SECRET_PRIVATE_KEY } from './settings';

export const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

export const generateJWT = ({ staffId = '', role = '', name = '' }) =>
  new Promise((resolve, reject) => {
    const payload = { staffId, role, name };

    jwt.sign(
      payload,
      SECRET_PRIVATE_KEY,
      {
        expiresIn: '8h',
      },
      (err, token) => {
        if (err) {
          console.error(err);
          reject('Error to generate jwt');
        } else resolve(token);
      }
    );
  });

export const validateJWT = async (req = request, res = response, next) => {
  const token = req.header('token');
  try {
    //

    if (!token) return res.status(STATUS.unauthorized).json({ msg: MESSAGE.undefined, ko: false, data: [] });

    const rest = parseJwt(token);
    console.log({ exp: rest.exp, diff: rest.exp - rest.iat, now: new Date() });

    const { role } = jwt.verify(token, SECRET_PRIVATE_KEY);
    req.role = role;

    next();

    //
  } catch (error) {
    //TokenExpiredError

    console.log({ step: 'error validateJWT', error: error.toString() });
    return res.status(STATUS.unauthorized).json({ msg: error.toString(), ko: false, data: [] });
  }
};
