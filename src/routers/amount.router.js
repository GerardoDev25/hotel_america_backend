import { Router } from 'express';

import Service from '../services';
import Validator from '../validation';

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
 */
router.get('/search/', Service.Amount.getOne);

/**
 * get a few items that make match
 * @name getWhere
 * @path {POST} /where
 */
router.post('/where', Service.Amount.getWhere);

/**
 *  get a item by id
 * @name getByid
 * @path {GET} /:amountId
 */
router.get('/:amountId', Validator.Amount.getById, Service.Amount.getById);

/**
 *  create a item
 * @name create
 * @path {POST} /
 */
router.post('/', Validator.Amount.create, Service.Amount.create);

/**
 * update a item
 * @name create
 * @path {PUT} /:amountId
 */
router.put('/:amountId', Validator.Amount.update, Service.Amount.update);

/**
 * delete a item by id
 * @name delete
 * @path {DELETE} /:amountId
 */
router.delete('/:amountId', Validator.Amount.del, Service.Amount.del);

export default router;
