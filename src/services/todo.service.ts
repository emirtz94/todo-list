import { prisma } from '../lib/prisma';
import { TodoCreate, TodoUpdate } from '../types/todo.types';
import { Todo } from '../generated/browser';

class TodoService {
  public async getTodos(): Promise<Todo[]> {
    return prisma.todo.findMany({
      orderBy: {
        position: 'asc',
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
    const maxPosition = await prisma.todo.aggregate({
      _max: { position: true },
    });

    const nextPosition = (maxPosition._max.position ?? -1) + 1;

    return prisma.todo.create({
      data: {
        title,
        description,
        position: nextPosition,
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

  public async toggle(id: number) {
    const todo = await prisma.todo.findFirst({
      where: {
        id,
      },
    });

    if (!todo) {
      throw new Error('Todo not found');
    }

    return prisma.todo.update({
      where: { id },
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
