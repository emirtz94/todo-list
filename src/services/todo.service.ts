import { prisma } from '../lib/prisma';
import { TodoCreate, TodoUpdate } from '../types/todo.types';
import { Todo } from '../generated/browser';

class TodoService {
  public async getTodos(userId: number): Promise<Todo[]> {
    return prisma.todo.findMany({
      where: {
        userId,
      },
      orderBy: {
        position: 'asc',
      },
    });
  }

  public async getById(id: number, userId: number): Promise<Todo | null> {
    return prisma.todo.findFirst({
      where: {
        id,
        userId
      },
    });
  }

  public async create(userId: number, { title, description }: TodoCreate) {
    const maxPosition = await prisma.todo.aggregate({
      where: { userId },
      _max: { position: true },
    });

    const nextPosition = (maxPosition._max.position ?? -1) + 1;

    return prisma.todo.create({
      data: {
        title,
        description,
        position: nextPosition,
        userId
      },
    });
  }

  public async update(id: number, userId: number, { title, description }: TodoUpdate) {
    const todo = await prisma.todo.findFirst({ where: { id, userId } });

    if (!todo) {
      throw new Error('Todo not found');
    }

    return prisma.todo.update({
      where: { id, userId },
      data: { title, description },
    });
  }

  public async delete(id: number, userId: number) {
    return prisma.todo.deleteMany({ where: { id, userId } });
  }

  public async toggle(id: number, userId: number) {
    const todo = await prisma.todo.findFirst({
      where: {
        id,
        userId
      },
    });

    if (!todo) {
      throw new Error('Todo not found');
    }

    return prisma.todo.update({
      where: { id, userId },
      data: { completed: !todo.completed },
    });
  }

  public async reorder(orderedIds: number[]) {
    await prisma.$transaction(
      orderedIds.map((id, index) =>
        prisma.todo.update({
          where: { id },
          data: { position: index },
        })
      )
    );
  }
}

export const todoService = new TodoService();
