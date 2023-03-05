import React from "react";
import TodoModel from "./TodoModel";

interface TodoProps {
    todo: TodoModel
    setTodoDone(id: number, isDone: boolean): any
}

export default function Todo({ todo, setTodoDone }: TodoProps) {
    function onInputChange(e: any) {
        setTodoDone(todo.id, e.target.checked as boolean)
    }

    return (
        <label className='list-group-item d-flex gap-2'>
            <input className='form-check-input flex-shrink-0' type='checkbox' checked={todo.isDone} onChange={onInputChange} />
            <span className={todo.isDone ? "todo-done" : ""}>{todo.name}</span>
        </label>
    )
}
