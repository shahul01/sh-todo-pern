import { Router } from "express";
import TodoController from "../controllers/todo.controllers.js";

const router = Router();

router.get('/', TodoController.getTodos);

router.delete('/:id', TodoController.deleteTodo);


export default router;
