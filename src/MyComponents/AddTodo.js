import React, { useState } from 'react';

export const AddTodo = ({ addTodo }) => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");

    const submit = (e) => {
        e.preventDefault();
        if (!title || !desc) {
            alert("Title or Description cannot be blank.");
            // document.querySelector("button").style.visibility = "hidden";
        }
        else {
            addTodo(title, desc);
            setTitle("");
            setDesc("");
        }

    }

    let estyle = {
        backgroundColor: "lightyellow",
        border:"1px solid violet",
        outline: "none"
    }

    return (
        <div className="container my-3" id="add-todo-card">
            <h3>Add a Todo</h3>
            <form onSubmit={submit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Todo Title</label>
                    <input type="text" value={title} onChange={(e) => { setTitle(e.target.value) }} className="form-control" id="title" aria-describedby="emailHelp" style={estyle}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="desc" className="form-label">Todo Description</label>
                    <input type="text" value={desc} onChange={(e) => { setDesc(e.target.value) }} className="form-control" id="desc" style={estyle}/>
                </div>
                <button type="submit" className="btn">Add Todo</button>
            </form>
        </div>
    )
}

