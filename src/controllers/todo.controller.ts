import { Request, Response } from 'express';
import { todoService } from '../services/todo.service';

class TodoController {
  public getTodos = async (req: Request, res: Response) => {
    const todos = await todoService.getTodos();
    res.render('todos', { todos });
  };

  public postTodo = async (req: Request, res: Response) => {
    const { title, description } = req.body;
    await todoService.create({ title, description });
    res.redirect('/todos');
  };

  public getEdit = async (req: Request, res: Response) => {
    const todo = await todoService.getById(parseInt(req.params.id));

    if (!todo) {
      return res.redirect('/todos');
    }

    res.render('edit-todo', { todo });
  };

  public postEdit = async (req: Request, res: Response) => {
    const { title, description } = req.body;

    await todoService.update(parseInt(req.params.id), { title, description });
    res.redirect('/todos');
  };

  public postDelete = async (req: Request, res: Response) => {
    await todoService.delete(parseInt(req.params.id));
    res.redirect('/todos');
  }

  public postToggle = async (req: Request, res: Response) => {
    await todoService.toggle(parseInt(req.params.id));
    res.redirect('/todos');
  }
}

export const todoController = new TodoController();
