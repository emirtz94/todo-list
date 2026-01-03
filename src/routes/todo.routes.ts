import { Router } from 'express';
import { todoController } from '../controllers/todo.controller';

const router = Router();

router.get('/', todoController.getTodos);
router.post('/', todoController.postTodo);
router.get('/:id/edit', todoController.getEdit);
router.post('/:id/edit', todoController.postEdit);
// since form (html <form> tag) does not support delete method we will use post as a workaround
router.post('/:id/delete', todoController.postDelete);

export default router;
