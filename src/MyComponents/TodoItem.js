import React from 'react';

export const TodoItem = ({ todo, onDelete }) => {
    return (
        <div className="todo-item">
            <h4 className="todo-title">{todo.title}</h4>
            <p className="todo-desc">{todo.desc}</p>
            <button 
                className="btn btn-danger btn-sm"
                onClick={() => { onDelete(todo) }}
            >
                Delete
            </button>
        </div>
    );
};

