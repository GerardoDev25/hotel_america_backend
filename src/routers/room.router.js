import { Router } from 'express';

import Service from '../services';
import Validator from '../validation';

/**
 * @module Room/router
 */

const router = Router();

/** get all items
 * @name get
 * @path {GET} /
 */
router.get('/', Service.Room.getAll);

/**
 * get one item
 * @name search a item
 * @path {GET} /search/
 * @body {object} params for make match
 */
router.get('/search/', Service.Room.getOne);

/**
 * get a few items that make match
 * @name getWhere
 * @path {POST} /where
 * @body {object} fiels for make match
 */
router.post('/where', Service.Room.getWhere);

/**
 *  get a item by id
 * @name getByid
 * @path {GET} /:roomId
 * @params {string} roomId item's id
 */
router.get('/:roomId', Validator.Room.getById, Service.Room.getById);

/**
 *  create a item
 * @name create
 * @path {POST} /
 * @auth
 * @header {string} token authentication
 * @body {object} fiels to create
 */
router.post('/', Validator.Room.create, Service.Room.create);

/**
 * update a item
 * @name update
 * @path {PUT} /:roomId
 * @auth
 * @header {string} token authentication
 * @params {string} roomId item's id
 * @body {object} fiels to update
 * */
router.put('/:roomId', Validator.Room.update, Service.Room.update);

/**
 * delete a item by id
 * @name delete
 * @path {DELETE} /:roomId
 * @auth
 * @header {string} token authentication
 * @params {string} roomId item's id
 */
router.delete('/:roomId', Validator.Room.del, Service.Room.del);

export default router;
