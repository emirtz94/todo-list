import { Request, Response } from 'express';

class TodoController {
  public getTodos = async (req: Request, res: Response) => {
    const todos = [
      { title: 'Todo 1', description: '' },
      { title: 'Todo 2', description: 'Todo 2' },
    ];

    res.render('todos', { todos });
  };
}

export const todoController = new TodoController();
