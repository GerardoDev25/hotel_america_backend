import jwt from 'jsonwebtoken';
import { SECRETORPRIVATEKEY } from '../settings';

export const generateJWT = ({ staffId = '', role = '', name = '' }) =>
  new Promise((resolve, reject) => {
    const payload = { staffId, role, name };

    jwt.sign(
      payload,
      SECRETORPRIVATEKEY,
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
