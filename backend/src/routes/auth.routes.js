import { Router } from 'express';
import AuthController from '../controllers/auth.controller.js';


const router = Router();

router.get('/register', AuthController.register);

router.get('/login', AuthController.login);


export default router;
