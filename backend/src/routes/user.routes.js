import { Router } from "express";
import UserController from "../controllers/user.controller.js";


const router = Router();

router.get('/:username', UserController.getUser);


export default router;
