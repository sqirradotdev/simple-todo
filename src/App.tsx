import React, { useEffect, useState } from 'react';
import Todo from './Todo';
import TodoList from './TodoList';
import TodoModel from './TodoModel';

const TODO_LOCAL_STORAGE_ID = "simple-todo.todos"

let appTitle: string = "Simple To-do App";

export default function App() {
    const [todoState, setTodoState] = useState(new Array<TodoModel>());

    function addTodo(todo: TodoModel) {
        if (todo.name !== "") {
            setTodoState([...todoState, todo])
        }
    }

    function modifyTodo(todo: TodoModel) {
        const idx = todoState.findIndex((value, index, obj) => value.name === todo.name)
        setTodoState([
            ...todoState.slice(0, idx),
            todo,
            ...todoState.slice(idx + 1),
        ])
    }

    function clearTodos() {
        setTodoState([])
    }

    function clearCompletedTodos() {
        const currentTodos = todoState.filter((value, index, array) => {
            return !value.isDone
        })
        setTodoState(currentTodos)
    }

    useEffect(() => {
        const todosJson = localStorage.getItem(TODO_LOCAL_STORAGE_ID)
        if (todosJson != null) {
            const todosParsed = JSON.parse(todosJson)
            setTodoState(todosParsed)
            console.log("To-do local storage found.")
        }
        else {
            console.log("Creating to-do local storage...")
            localStorage.setItem(TODO_LOCAL_STORAGE_ID, "[]")
        }
    }, [])

    useEffect(() => {
        localStorage.setItem(TODO_LOCAL_STORAGE_ID, JSON.stringify(todoState))
        document.title = `(${todoState.length}) ${appTitle}`
    })

    document.title = appTitle;

    return (
        <div className="App">
            <TodoList todoState={todoState} addTodo={addTodo} modifyTodo={modifyTodo}></TodoList>
            <div className='d-grid gap-2 d-sm-flex justify-content-sm-center'>
                <button className='btn btn-secondary' onClick={clearCompletedTodos}>Clear Completed</button>
                <button className='btn btn-danger' onClick={clearTodos}>Clear All</button>
            </div>
        </div>
    );
}
