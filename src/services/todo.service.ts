import { prisma } from '../lib/prisma';
import { ToDoCreate } from '../types/todo.types';

class TodoService {
  async getTodos() {
    return prisma.todo.findMany({
      orderBy: {
        createdAt: 'asc'
      }
    })
  }

  async create({ title, description }: ToDoCreate) {
    return prisma.todo.create({
      data: {
        title,
        description,
      },
    });
  }
}

export const todoService = new TodoService();
