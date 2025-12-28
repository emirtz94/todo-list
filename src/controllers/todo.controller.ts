import { Request, Response } from 'express';

class TodoController {
  public getTodos = async (req: Request, res: Response) => {
    const todos = ["Todo 1", "Todo 2"];

    res.render('todos', { todos });
  };
}

export const todoController = new TodoController();