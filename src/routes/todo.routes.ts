import { Router } from "express";
import { todoController } from "../controllers/todo.controller";

const router = Router();

router.get('/', todoController.getTodos);
router.post('/', todoController.postTodo);

export default router;