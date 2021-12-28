import { Router } from 'express';

import Service from '../services';
import Validator from '../validation';

const router = Router();

router.get('/', Service.getUsers);
router.get('/:_id', Validator.getUser, Service.getUser);
router.post('/', Service.postUser);
router.put('/:_id', Service.putUser);
router.delete('/:_id', Service.deleteUser);

export default router;
