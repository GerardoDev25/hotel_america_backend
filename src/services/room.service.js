import { response, request } from 'express';

import Controller from '../controllers';
import { STATUS } from '../helpers/settings';

const getAll = async (req = request, res = response) => {
  try {
    //

    const { limit, offset } = req.query;
    const { msg, statusCode, data, ok } = await Controller.Room.getAll(limit, offset);
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error getAll.RoomService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: error.toString(), ok: false, error: true });
  }
};

const getWhere = async (req = request, res = response) => {
  try {
    //

    const { limit, offset, ...where } = req.body;

    const { msg, statusCode, data, ok } = await Controller.Room.getAll(limit, offset, where);
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error getWhere.RoomService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: error.toString(), ok: false, error: true });
  }
};

const getById = async (req = request, res = response) => {
  try {
    //

    const { roomId } = req.params;
    const { msg, statusCode, data, ok } = await Controller.Room.getById(roomId);
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error getById.RoomService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: error.toString(), ok: false, error: true });
  }
};

const getOne = async (req = request, res = response) => {
  try {
    //

    const params = req.body;
    const where = { ...params };

    const { msg, statusCode, data, ok } = await Controller.Room.getOne(where);
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error getOne.RoomService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: error.toString(), ok: false, error: true });
  }
};

const create = async (req = request, res = response) => {
  try {
    //

    const fiels = req.body;
    const { msg, statusCode, data, ok } = await Controller.Room.create(fiels);
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error create.RoomService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: error.toString(), ok: false, error: true });
  }
};

const update = async (req = request, res = response) => {
  try {
    //

    const { roomId } = req.params;
    const fiels = req.body;
    const { msg, statusCode, data, ok } = await Controller.Room.update({ ...fiels, roomId });
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error updete.RoomService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: error.toString(), ok: false, error: true });
  }
};

const del = async (req = request, res = response) => {
  try {
    //

    const { roomId } = req.params;
    const { msg, statusCode, data, ok } = await Controller.Room.del(roomId);
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error delete.RoomService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: error.toString(), ok: false, error: true });
  }
};

export default { getAll, getWhere, getById, getOne, create, update, del };
