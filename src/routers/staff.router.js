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
router.get('/', Service.Staff.getAll);

/**
 * get one item
 * @name search a item
 * @path {GET} /search/
 * @body {object} params for make match
 */
router.get('/search/', Service.Staff.getOne);

/**
 * get a few items that make match
 * @name getWhere
 * @path {POST} /where
 * @body {object} fiels for make match
 */
router.post('/where', Service.Staff.getWhere);

/**
 *  get a item by id
 * @name getByid
 * @path {GET} /:staffId
 * @params {string} staffId item's id
 */
router.get('/:staffId', Validator.Staff.getById, Service.Staff.getById);

/**
 *  create a item
 * @name create
 * @path {POST} /
 * @auth
 * @header {string} token authentication
 * @body {object} fiels to create
 */
router.post('/', Validator.Staff.create, Service.Staff.create);

/**
 * update a item
 * @name update
 * @path {PUT} /:staffId
 * @auth
 * @header {string} token authentication
 * @params {string} staffId item's id
 * @body {object} fiels to update
 * */
router.put('/:staffId', Validator.Staff.update, Service.Staff.update);

/**
 * delete a item by id
 * @name delete
 * @path {DELETE} /:staffId
 * @auth
 * @header {string} token authentication
 * @params {string} staffId item's id
 */
router.delete('/:staffId', Validator.Staff.del, Service.Staff.del);

export default router;
