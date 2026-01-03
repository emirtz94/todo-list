import { prisma } from '../lib/prisma';
import { TodoCreate, TodoUpdate } from '../types/todo.types';
import { Todo } from '../generated/browser';

class TodoService {
  public async getTodos(): Promise<Todo[]> {
    return prisma.todo.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  public async getById(id: number): Promise<Todo | null> {
    return prisma.todo.findFirst({
      where: {
        id,
      },
    });
  }

  public async create({ title, description }: TodoCreate) {
    return prisma.todo.create({
      data: {
        title,
        description,
      },
    });
  }

  public async update(id: number, { title, description }: TodoUpdate) {
    const todo = await prisma.todo.findFirst({ where: { id } });

    if (!todo) {
      throw new Error('Todo not found');
    }

    return prisma.todo.update({
      where: { id },
      data: { title, description },
    });
  }

  public async delete(id: number) {
    return prisma.todo.deleteMany({ where: { id } });
  }
}

export const todoService = new TodoService();
