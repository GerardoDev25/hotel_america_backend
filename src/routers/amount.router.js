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
router.get('/', Service.Amount.getAll);

/**
 * get one item
 * @name search a item
 * @path {GET} /search/
 * @body {object} params for make match
 */
router.get('/search/', Service.Amount.getOne);

/**
 * get a few items that make match
 * @name getWhere
 * @path {POST} /where
 * @body {object} fiels for make match
 */
router.post('/where', Service.Amount.getWhere);

/**
 *  get a item by id
 * @name getByid
 * @path {GET} /:amountId
 * @params {string} amountId item's id
 */
router.get('/:amountId', Validator.Amount.getById, Service.Amount.getById);

/**
 *  create a item
 * @name create
 * @path {POST} /
 * @auth
 * @header {string} token authentication
 * @body {object} fiels to create
 */
router.post('/', Validator.Amount.create, Service.Amount.create);

/**
 * update a item
 * @name update
 * @path {PUT} /:amountId
 * @auth
 * @header {string} token authentication
 * @params {string} amountId item's id
 * @body {object} fiels to update
 * */
router.put('/:amountId', Validator.Amount.update, Service.Amount.update);

/**
 * delete a item by id
 * @name delete
 * @path {DELETE} /:amountId
 * @auth
 * @header {string} token authentication
 * @params {string} amountId item's id
 */
router.delete('/:amountId', Validator.Amount.del, Service.Amount.del);

export default router;
