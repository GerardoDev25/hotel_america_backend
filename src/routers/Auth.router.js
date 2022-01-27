import { Router } from 'express';

import Service from '../services';
import Validator from '../validation';

const router = Router();

router.post('/login', Validator.Auth.login, Service.Auth.login);

export default router;
