import { Router } from 'express';

import Service from '../services';
import Validator from '../validation';

/**
 * @module Auth/router
 */

const router = Router();

/**
 * path that make login with a username and password
 * @name login
 * @path {POST} /login
 * @body {object} fiels for make logn
 */
router.post('/login', Validator.Auth.login, Service.Auth.login);

/**
 * path for renew a token authentication
 * @name renew
 * @path {POST} /renew
 * @body {string} token
 */
router.post('/renew', Validator.Auth.renew, Service.Auth.renew);

export default router;
