import { TodoService, ValidationError } from "../services/todoService.js";

export const getAllTodos = (req, res) => {
  res.status(200).json(TodoService.getAllTodos());
};

export const getTodoById = (req, res) => {
  const id = Number(req.params.id);
  const todo = TodoService.getTodoById(id);

  if (!todo) {
    return res.status(404).json({ error: "Todo item not found" });
  }

  res.status(200).json(todo);
};

export const createTodo = (req, res, next) => {
  try {
    const newTodo = TodoService.createTodo(req.body);
    res.status(201).json(newTodo);
  } catch (err) {
    if (err instanceof ValidationError) {
      return res.status(err.statusCode).json({ error: err.message });
    }
    next(err);
  }
};

export const updateTodo = (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const updated = TodoService.updateTodo(id, req.body);

    if (!updated) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.status(200).json(updated);
  } catch (err) {
    if (err instanceof ValidationError) {
      return res.status(err.statusCode).json({ error: err.message });
    }
    next(err);
  }
};

export const deleteTodo = (req, res) => {
  const id = Number(req.params.id);
  const deleted = TodoService.deleteTodo(id);

  if (!deleted) {
    return res.status(404).json({ error: "Todo item not found" });
  }

  res.status(200).json({ message: "Todo deleted", todo: deleted });
};
