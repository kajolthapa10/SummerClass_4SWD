const todoList = [];

const createIdGenerator = (start = 1) => {
  let counter = start;
  return {
    nextId: () => counter++,
    currentId: () => counter,
  };
};

const idGen = createIdGenerator();

export const TodoModel = {
  getAll: () => todoList,

  getById: (id) => todoList.find((t) => t.id === id),

  create: ({ title, deadline, isUrgent }) => {
    const newTodo = {
      id: idGen.nextId(),
      title,
      deadline,
      isUrgent,
    };
    todoList.push(newTodo);
    return newTodo;
  },

  findIndexById: (id) => todoList.findIndex((t) => t.id === id),

  deleteByIndex: (idx) => todoList.splice(idx, 1)[0],
};
