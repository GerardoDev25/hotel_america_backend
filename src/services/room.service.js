import { response, request } from 'express';

import Controller from '../controllers';
import { STATUS } from '../helpers/settings';

/**
 * @module Room/service
 */

/**
 * getAll service function get all items
 * @param {request} req param of type request
 * @param {response} res param of type response
 */
const getAll = async (req, res) => {
  try {
    //

    const query = req.query;

    const limit = Number(query.limit);
    const offset = Number(query.offset);

    const { msg, statusCode, data, ok } = await Controller.Room.getAll({ limit, offset });
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error getAll.RoomService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: error.toString(), ok: false, error: true });
  }
};

/**
 * getWhere service function get all items with some params
 * @param {request} req param of type request
 * @param {response} res param of type response
 */
const getWhere = async (req, res) => {
  try {
    //

    const { limit, offset, ...where } = req.body;

    const { msg, statusCode, data, ok } = await Controller.Room.getAll({ limit, offset, where });
    res.status(statusCode).json({ data, msg, ok });

    //
  } catch (error) {
    console.log({ step: 'error getWhere.RoomService', error: error.toString() });
    res.status(STATUS.conflict).json({ msg: error.toString(), ok: false, error: true });
  }
};

/**
 * getById service function get a items with a id
 * @param {request} req param of type request
 * @param {response} res param of type response
 */
const getById = async (req, res) => {
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

/**
 * getOne service function get a items with params
 * @param {request} req param of type request
 * @param {response} res param of type response
 */
const getOne = async (req, res) => {
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

/**
 * create service function
 * @param {request} req param of type request
 * @param {response} res param of type response
 */
const create = async (req, res) => {
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

/**
 * update service function
 * @param {request} req param of type request
 * @param {response} res param of type response
 */
const update = async (req, res) => {
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

/**
 * del service function delte a item
 * @param {request} req param of type request
 * @param {response} res param of type response
 */
const del = async (req, res) => {
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
