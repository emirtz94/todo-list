import { Router } from 'express';
import { todoController } from '../controllers/todo.controller';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.use(requireAuth);
router.get('/', todoController.getTodos);
router.post('/', todoController.postTodo);
router.get('/:id/edit', todoController.getEdit);
router.post('/:id/edit', todoController.postEdit);
// since form (html <form> tag) does not support delete method we will use post as a workaround
router.post('/:id/delete', todoController.postDelete);
router.post('/:id/toggle', todoController.postToggle);
router.post('/reorder', todoController.postReorder);

export default router;
