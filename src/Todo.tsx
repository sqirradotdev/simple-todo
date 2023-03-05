import React from "react";
import TodoModel from "./TodoModel";

interface TodoProps {
    todo: TodoModel
    modifyTodo(todo: TodoModel): any
}

export default function Todo({ todo, modifyTodo }: TodoProps) {
    function onInputChange(e: any) {
        todo.isDone = e.target.checked as boolean
        modifyTodo(todo)
    }

    return (
        <label className='list-group-item d-flex gap-2'>
            <input className='form-check-input flex-shrink-0' type='checkbox' checked={todo.isDone} onChange={onInputChange} />
            <span className={todo.isDone ? "todo-done" : ""}>{todo.name}</span>
        </label>
    )
}
