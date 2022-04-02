import { Router } from 'express';

import Service from '../services';
import Validator from '../validation';

/**
 * @module Goest/router
 */

const router = Router();

/** get all items
 * @name get
 * @path {GET} /
 */
router.get('/', Service.Goest.getAll);

/**
 * get one item
 * @name search a item
 * @path {GET} /search/
 * @body {object} params for make match
 */
router.get('/search/', Service.Goest.getOne);

/**
 * get a few items that make match
 * @name getWhere
 * @path {POST} /where
 * @body {object} fiels for make match
 */
router.post('/where', Service.Goest.getWhere);

/**
 *  get a item by id
 * @name getByid
 * @path {GET} /:goestId
 * @params {string} goestId item's id
 */
router.get('/:goestId', Validator.Goest.getById, Service.Goest.getById);

/**
 *  create a item
 * @name create
 * @path {POST} /
 * @auth
 * @header {string} token authentication
 * @body {object} fiels to create
 */
router.post('/', Validator.Goest.create, Service.Goest.create);

/**
 * update a item
 * @name update
 * @path {PUT} /:goestId
 * @auth
 * @header {string} token authentication
 * @params {string} goestId item's id
 * @body {object} fiels to update
 * */
router.put('/:goestId', Validator.Goest.update, Service.Goest.update);

/**
 * delete a item by id
 * @name delete
 * @path {DELETE} /:goestId
 * @auth
 * @header {string} token authentication
 * @params {string} goestId item's id
 */
router.delete('/:goestId', Validator.Goest.del, Service.Goest.del);

export default router;
