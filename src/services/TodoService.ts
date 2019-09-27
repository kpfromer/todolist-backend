import { Todo, TodoModel } from '../models/todo';
import { CreatedTodoDTO, TodoDTO } from '../types/todo';
import { ModelType } from '@hasezoey/typegoose';

export default new (class TodoService {
  getDate(value: string): Date {
    return new Date();
  }

  private getCreatedTodo(todo: InstanceType<ModelType<TodoModel>>): CreatedTodoDTO {
    return {
      _id: todo.id,
      title: todo.title,
      description: todo.description,
      duedate: todo.duedate,
      completed: todo.completed,
      project: todo.toObject().project as string // id of project
    };
  }

  async getAll(userId: string): Promise<CreatedTodoDTO[]> {
    const todos = await Todo.find({ user: userId }).exec();
    return todos.map(this.getCreatedTodo);
  }

  async getById(userId: string, id: string): Promise<CreatedTodoDTO | null> {
    const todo = await Todo.findOne({ user: userId, id }).exec();
    if (!todo) {
      return null;
    }
    return this.getCreatedTodo(todo);
  }

  async createTodo(userId: string, details: TodoDTO): Promise<CreatedTodoDTO> {
    const todo = await Todo.create({ ...details, user: userId });
    return this.getCreatedTodo(todo);
  }

  async updateTodo(userId: string, id: string, details: TodoDTO): Promise<null | CreatedTodoDTO> {
    const todo = await Todo.findOneAndUpdate({ _id: id, user: userId }, details).exec();
    if (!todo) {
      return null;
    }
    return this.getCreatedTodo(todo);
  }

  async deleteTodo(userId: string, id: string): Promise<null | true> {
    const todo = await Todo.findOneAndDelete({ _id: id, user: userId }).exec();
    if (!todo) {
      return null;
    }
    return true;
  }
})();
