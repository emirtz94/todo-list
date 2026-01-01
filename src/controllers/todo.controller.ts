import { Request, Response } from 'express';
import { todoService } from '../services/todo.service';

class TodoController {
  public getTodos = async (req: Request, res: Response) => {
    const todos = await todoService.getTodos();
    res.render('todos', { todos });
  };

  public postTodo = async (req: Request, res: Response) => {
    const { title, description } = req.body;
    todoService.create({ title, description });
    res.redirect('/todos');
  };
}

export const todoController = new TodoController();
