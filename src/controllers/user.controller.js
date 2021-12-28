import Model from '../models';
import { MESSAGE, STATUS } from '../settings';

export const getUsers = async (limit = 10, offset = 0) => {
  try {
    const [total, users] = await Promise.all([
      Model.User.countDocuments({ state: true }),
      Model.User.find({ state: true }).limit(Number(limit)).skip(Number(offset)),
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
      step: 'error getUsersController',
      error: error.toString(),
    });
    return { statusCode: STATUS.internalServerError, ok: false, msg: MESSAGE.internalServerError };
  }
};

export const getUser = async (_id) => {
  try {
    const user = await Model.User.findById(_id);

    return user
      ? { statusCode: STATUS.success, msg: MESSAGE.success, ok: true, data: [user] }
      : { statusCode: STATUS.notFound, msg: MESSAGE.notFound, ok: false, data: [] };

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
    const user = new Model.User({ ...fiels });
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
    const user = await Model.User.findByIdAndUpdate(_id, rest);
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
    const user = await Model.User.findByIdAndUpdate(_id, { state: false });
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
