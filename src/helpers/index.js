import jwt from 'jsonwebtoken';
import Controller from '../controllers';

import { SECRET_PRIVATE_KEY } from './settings';

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

export const existItems = async (ids = {}) => {
  //

  const values = Object.entries(ids);
  let existBool = true;

  try {
    const querys = [];

    for (const value of values) {
      switch (value[0]) {
        case 'amountId':
          const amountId = value[1];
          querys.push(Controller.Amount.getById(amountId));

        case 'goestId':
          const goestId = value[1];
          querys.push(Controller.Goest.getById(goestId));
          break;

        case 'registerId':
          const registerId = value[1];
          querys.push(Controller.Register.getById(registerId));
          break;

        case 'roomId':
          const roomId = value[1];
          querys.push(Controller.Room.getById(roomId));
          break;

        case 'staffId':
          const staffId = value[1];
          querys.push(Controller.Staff.getById(staffId));
          break;

        default:
          throw new Error(`invalid param: ${value[0]}`);
      }
    }

    const existArr = await Promise.all([...querys]);

    existArr.forEach((e) => {
      if (!e.ok) existBool = false;
    });
    return existBool;

    //
  } catch (error) {
    console.log({ step: 'error existItems.helpers', error: error.toString() });
    return false;
  }
};
