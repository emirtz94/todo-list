import { Todo } from '../generated/browser';
export type TodoCreate = Pick<Todo, 'title' | 'description'>;
export type TodoUpdate = TodoCreate;