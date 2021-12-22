import { Router } from 'express';
import { userService } from '../services/user.service';

const router = Router();

router.get('/', userService);

export default router;
