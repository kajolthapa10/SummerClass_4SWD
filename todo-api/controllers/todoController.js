// controllers/todoController.js
import { todos, nextId, incrementNextId } from "../data/todos.js";

// GET /api/todos — return all todos
export function getAllTodos(req, res) {
  res.status(200).json(todos);
}

// GET /api/todos/:id — return a single todo
export function getTodoById(req, res) {
  const id = Number(req.params.id);
  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }

  res.status(200).json(todo);
}

// POST /api/todos — create a new todo
export function createTodo(req, res) {
  const { title, deadline, isUrgent } = req.body;

  // Basic validation
  if (!title || typeof title !== "string" || title.trim() === "") {
    return res
      .status(400)
      .json({ error: "Title is required and must be a non-empty string" });
  }

  if (!deadline || isNaN(Date.parse(deadline))) {
    return res
      .status(400)
      .json({ error: "Deadline is required and must be a valid date" });
  }

  if (typeof isUrgent !== "boolean") {
    return res
      .status(400)
      .json({ error: "isUrgent is required and must be true or false" });
  }

  const newTodo = {
    id: nextId,
    title: title.trim(),
    deadline,
    isUrgent,
  };

  todos.push(newTodo);
  incrementNextId();

  res.status(201).json(newTodo);
}

// PUT /api/todos/:id — update an existing todo
export function updateTodo(req, res) {
  const id = Number(req.params.id);
  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }

  const { title, deadline, isUrgent } = req.body;

  if (title !== undefined) {
    if (typeof title !== "string" || title.trim() === "") {
      return res
        .status(400)
        .json({ error: "Title must be a non-empty string" });
    }
    todo.title = title.trim();
  }

  if (deadline !== undefined) {
    if (isNaN(Date.parse(deadline))) {
      return res.status(400).json({ error: "Deadline must be a valid date" });
    }
    todo.deadline = deadline;
  }

  if (isUrgent !== undefined) {
    if (typeof isUrgent !== "boolean") {
      return res.status(400).json({ error: "isUrgent must be true or false" });
    }
    todo.isUrgent = isUrgent;
  }

  res.status(200).json(todo);
}

// DELETE /api/todos/:id — remove a todo
export function deleteTodo(req, res) {
  const id = Number(req.params.id);
  const index = todos.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Todo not found" });
  }

  const deleted = todos.splice(index, 1);

  res.status(200).json({ message: "Todo deleted", todo: deleted[0] });
}