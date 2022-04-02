import { Router } from 'express';

import Service from '../services';
import Validator from '../validation';

/**
 * @module Lodging/router
 */

const router = Router();

/** get all items
 * @name get
 * @path {GET} /
 */
router.get('/', Service.Lodging.getAll);

/**
 * get a few items that make match
 * @name getWhere
 * @path {POST} /where
 * @body {object} fiels for make match
 */
router.post('/where', Service.Lodging.getWhere);

/**
 *  get a item by id
 * @name getByid
 * @path {GET} /:lodgingId
 * @params {string} lodgingId item's id
 */
router.get('/:lodgingId', Validator.Lodging.getById, Service.Lodging.getById);

/**
 *  create many items
 * @name create
 * @path {POST} /
 * @auth
 * @header {string} token authentication
 */
router.post('/', Validator.Lodging.create, Service.Lodging.lodgingCreateAll);

/**
 * update a item
 * @name update
 * @path {PUT} /:lodgingId
 * @auth
 * @header {string} token authentication
 * @params {string} lodgingId item's id
 * @body {object} fiels to update
 * */
router.put('/:lodgingId', Validator.Lodging.update, Service.Lodging.update);

/**
 * delete a item by id
 * @name delete
 * @path {DELETE} /:lodgingId
 * @auth
 * @header {string} token authentication
 * @params {string} lodgingId item's id
 */
router.delete('/:lodgingId', Validator.Lodging.update, Service.Lodging.del);

export default router;
