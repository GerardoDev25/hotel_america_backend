import { Router } from 'express';

import Service from '../services';
import Validator from '../validation';

/**
 * @module Amount/router
 */

const router = Router();

/** get all items
 * @name get
 * @path {GET} /
 */
router.get('/', Service.Register.getAll);

/**
 * get one item
 * @name search a item
 * @path {GET} /search/
 * @body {object} params for make match
 */
router.get('/search/', Service.Register.getOne);

/**
 * get a few items that make match
 * @name getWhere
 * @path {POST} /where
 * @body {object} fiels for make match
 */
router.post('/where', Service.Register.getWhere);

/**
 *  get a item by id
 * @name getByid
 * @path {GET} /:registerId
 * @params {string} registerId item's id
 */
router.get('/:registerId', Validator.Register.getById, Service.Register.getById);

/**
 *  create a item
 * @name create
 * @path {POST} /
 * @auth
 * @header {string} token authentication
 * @body {object} fiels to create
 */
router.post('/', Validator.Register.create, Service.Register.create);

/**
 * update a item
 * @name update
 * @path {PUT} /:registerId
 * @auth
 * @header {string} token authentication
 * @params {string} registerId item's id
 * @body {object} fiels to update
 * */
router.put('/:registerId', Validator.Register.update, Service.Register.update);

/**
 * delete a item by id
 * @name delete
 * @path {DELETE} /:registerId
 * @auth
 * @header {string} token authentication
 * @params {string} registerId item's id
 */
router.delete('/:registerId', Validator.Register.del, Service.Register.del);

export default router;
