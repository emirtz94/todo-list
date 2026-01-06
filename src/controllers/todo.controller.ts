import { Request, Response } from 'express';
import { todoService } from '../services/todo.service';

class TodoController {
  public getTodos = async (req: Request, res: Response) => {
    const userId = req.session.userId!;
    const todos = await todoService.getTodos(userId);
    res.render('todos', { todos });
  };

  public postTodo = async (req: Request, res: Response) => {
    const { title, description } = req.body;
    const userId = req.session.userId!;

    await todoService.create(userId, { title, description });
    res.redirect('/todos');
  };

  public getEdit = async (req: Request, res: Response) => {
    const userId = req.session.userId!;

    const todo = await todoService.getById(parseInt(req.params.id), userId);

    if (!todo) {
      return res.redirect('/todos');
    }

    res.render('edit-todo', { todo });
  };

  public postEdit = async (req: Request, res: Response) => {
    const { title, description } = req.body;
    const userId = req.session.userId!;

    await todoService.update(parseInt(req.params.id), userId, { title, description });
    res.redirect('/todos');
  };

  public postDelete = async (req: Request, res: Response) => {
    const userId = req.session.userId!;

    await todoService.delete(parseInt(req.params.id), userId);
    res.redirect('/todos');
  };

  public postToggle = async (req: Request, res: Response) => {
    const userId = req.session.userId!;

    await todoService.toggle(parseInt(req.params.id), userId);
    res.redirect('/todos');
  };

  public postReorder = async (req: Request, res: Response) => {
    const { orderIds } = req.body;

    if (Array.isArray(orderIds)) {
      await todoService.reorder(orderIds.map(Number));
    }
    res.json({ success: true });
  };
}

export const todoController = new TodoController();
