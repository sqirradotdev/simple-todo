import React, { SyntheticEvent } from "react"
import Todo from "./Todo";
import TodoModel from "./TodoModel";

interface TodoListProps {
    todoState: Array<TodoModel>
    addTodo(name: string): any
    setTodoDone(id: number, isDone: boolean): any
}

export default function TodoList({ todoState, addTodo, setTodoDone}: TodoListProps) {
    function onInputBlur(e: any) {
        if (e.target.value !== "") {
            addTodo(e.target.value as string)
        }
        e.target.value = ""
    }

    return (
        <div className='list-group todo-list'>
            {todoState.map(todo => {
                return (
                    <Todo todo={todo} setTodoDone={setTodoDone} key={todo.id}></Todo>
                )
            })}
            <label className='list-group-item d-flex gap-2'>
                <input
                    className='form-check-input flex-shrink-0'
                    type='checkbox'
                    disabled={true} 
                />
                <input
                    className='add-todo-field'
                    type='text'
                    placeholder='Click to add todo...'
                    onBlur={onInputBlur}
                />
            </label>
        </div>
    )
}