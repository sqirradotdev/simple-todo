import React, { useEffect, useState } from 'react';
import Todo from './Todo';
import TodoList from './TodoList';
import TodoModel from './TodoModel';

const TODO_LOCAL_STORAGE_ID = "simple-todo.todos"
const APP_TITLE: string = "Simple To-do App";

let increment: number = -1

export default function App() {
    const [todoState, setTodoState] = useState(new Array<TodoModel>());

    function addTodo(name: string) {
        if (name && name !== "") {
            setTodoState([...todoState, {id: ++increment, name: name, isDone: false}])
        }
    }

    function setTodoDone(id: number, isDone: boolean) {
        const idx = todoState.findIndex((value, index, obj) => value.id == id)
        let todo = todoState[idx]
        todo.isDone = isDone
        if (todo) {
            setTodoState([
                ...todoState.slice(0, idx),
                todo,
                ...todoState.slice(idx + 1),
            ])
        }
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
            const todosParsed = JSON.parse(todosJson) as Array<TodoModel>
            setTodoState(todosParsed)
            todosParsed.map((value, index, array) => {
                if (increment < value.id)
                    increment = value.id
            })
            console.log("To-do local storage found.")
        }
        else {
            console.log("Creating to-do local storage...")
            localStorage.setItem(TODO_LOCAL_STORAGE_ID, "[]")
        }
    }, [])

    useEffect(() => {
        localStorage.setItem(TODO_LOCAL_STORAGE_ID, JSON.stringify(todoState))
        document.title = `(${todoState.length}) ${APP_TITLE}`
    })

    document.title = APP_TITLE;

    return (
        <div className="App">
            <TodoList todoState={todoState} addTodo={addTodo} setTodoDone={setTodoDone}></TodoList>
            <div className='d-grid gap-2 d-sm-flex justify-content-sm-center'>
                <button className='btn btn-secondary' onClick={clearCompletedTodos}>Clear Completed</button>
                <button className='btn btn-danger' onClick={clearTodos}>Clear All</button>
            </div>
        </div>
    );
}
