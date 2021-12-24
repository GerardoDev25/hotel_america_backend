import MODEL from '../models';
import { MESSAGE, STATUS } from '../settings';

export const getUser = async (limit = 10, offset = 0) => {
  try {
    const [total, users] = await Promise.all([
      MODEL.user.countDocuments({ state: true }),
      MODEL.user.find({ state: true }).limit(Number(limit)).skip(Number(offset)),
    ]);

    const data = {
      users,
      total,
      pageCount: Math.ceil(total / limit),
    };

    return { statusCode: STATUS.success, msg: MESSAGE.success, ok: true, data };

    //
  } catch (error) {
    console.log({
      step: 'error getUserController',
      error: error.toString(),
    });
    return { statusCode: STATUS.internalServerError, ok: false, msg: MESSAGE.internalServerError };
  }
};

export const postUser = async (fiels) => {
  try {
    const user = new MODEL.user({ ...fiels });
    await user.save();

    return { statusCode: STATUS.success, msg: MESSAGE.success, ok: true, data: user };

    //
  } catch (error) {
    console.log({
      step: 'error postUserController',
      error: error.toString(),
    });
    return { statusCode: STATUS.internalServerError, ok: false, msg: MESSAGE.internalServerError };
  }
};

export const putUser = async (fiels) => {
  try {
    const { _id, password, email, ...rest } = fiels;
    const user = await MODEL.user.findByIdAndUpdate(_id, rest);
    return { statusCode: STATUS.success, msg: MESSAGE.success, ok: true, data: user };

    //
  } catch (error) {
    console.log({
      step: 'error putUserController',
      error: error.toString(),
    });
    return { statusCode: STATUS.internalServerError, ok: false, msg: MESSAGE.internalServerError };
  }
};

export const deleteUser = async (_id) => {
  try {
    const user = await MODEL.user.findByIdAndUpdate(_id, { state: false });
    return { statusCode: STATUS.success, msg: MESSAGE.success, ok: true, data: user };

    //
  } catch (error) {
    console.log({
      step: 'error deleteUserController',
      error: error.toString(),
    });
    return { statusCode: STATUS.internalServerError, ok: false, msg: MESSAGE.internalServerError };
  }
};
