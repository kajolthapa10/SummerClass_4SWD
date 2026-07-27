import { TodoModel } from "../models/todoModel.js";

export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
    this.statusCode = 400;
  }
}

const validateTitle = (title) => {
  if (!title || typeof title !== "string" || title.trim() === "") {
    throw new ValidationError("Title is required and must be non empty");
  }
};

const validateDeadline = (deadline) => {
  if (!deadline || isNaN(Date.parse(deadline))) {
    throw new ValidationError("Deadline is required and must be a valid date");
  }
};

const validateIsUrgent = (isUrgent) => {
  if (typeof isUrgent !== "boolean") {
    throw new ValidationError("isUrgent is required and must be true or false");
  }
};

export const TodoService = {
  getAllTodos: () => TodoModel.getAll(),

  getTodoById: (id) => TodoModel.getById(id),

  createTodo: (data) => {
    validateTitle(data.title);
    validateDeadline(data.deadline);
    validateIsUrgent(data.isUrgent);

    return TodoModel.create({
      title: data.title,
      deadline: data.deadline,
      isUrgent: data.isUrgent,
    });
  },

  updateTodo: (id, data) => {
    const todo = TodoModel.getById(id);
    if (!todo) return null;

    if (data.title !== undefined) {
      if (typeof data.title !== "string" || data.title.trim() === "") {
        throw new ValidationError("Title must be a non-empty string");
      }
      todo.title = data.title.trim();
    }

    if (data.deadline !== undefined) {
      if (isNaN(Date.parse(data.deadline))) {
        throw new ValidationError("Deadline must be a valid date");
      }
      todo.deadline = data.deadline;
    }

    if (data.isUrgent !== undefined) {
      if (typeof data.isUrgent !== "boolean") {
        throw new ValidationError("isUrgent must be true or false");
      }
      todo.isUrgent = data.isUrgent;
    }

    return todo;
  },

  deleteTodo: (id) => {
    const idx = TodoModel.findIndexById(id);
    if (idx === -1) return null;
    return TodoModel.deleteByIndex(idx);
  },
};