import React, { SyntheticEvent } from "react"
import Todo from "./Todo";
import TodoModel from "./TodoModel";

interface TodoListProps {
    todoState: Array<TodoModel>
    addTodo(todo: TodoModel): any
    modifyTodo(todo: TodoModel): any
}

export default function TodoList({ todoState, addTodo, modifyTodo}: TodoListProps) {
    function onInputBlur(e: any) {
        if (e.target.value !== "") {
            //setTodoState([...todoState, {name: e.target.value, isDone: false}])
            addTodo({name: e.target.value, isDone: false})
        }
        e.target.value = ""
    }

    return (
        <div className='list-group todo-list'>
            {todoState.map(todo => {
                return (
                    <Todo todo={todo} modifyTodo={modifyTodo} key={todo.name}></Todo>
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