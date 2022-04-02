import { Router } from 'express';

import Service from '../services';
import Validator from '../validation';

/**
 * @module Cafe/router
 */

const router = Router();

/** get all items
 * @name get
 * @path {GET} /
 */
router.get('/', Service.Cafe.getAll);

/**
 * get a few items that make match
 * @name getWhere
 * @path {POST} /where
 * @body {object} fiels for make match
 */
router.post('/where', Service.Cafe.getWhere);

/**
 *  create many items
 * @name create
 * @path {POST} /
 * @auth
 * @header {string} token authentication
 */
router.post('/', Validator.Cafe.create, Service.Cafe.cafeCreateAll);

/**
 * update a item
 * @name update
 * @path {PUT} /:cafeId
 * @auth
 * @header {string} token authentication
 * @params {string} amountId item's id
 * @body {object} fiels to update
 * */
router.put('/:cafeId', Validator.Cafe.update, Service.Cafe.update);

export default router;
