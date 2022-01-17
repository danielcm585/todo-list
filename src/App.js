import React, { useState, useRef, useEffect } from 'react'
import TodoList from './TodoList.js'
import {v4 as uuidv4} from 'uuid'

const LOCAL_STORAGE_KEY = 'todoApp.todos'

export default function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function addTodo(e) {
    const todoName = todoNameRef.current.value
    if (todoName === '') return
    setTodos(prevTodos => {
      return [...prevTodos, {id: uuidv4(),
                             name: todoName,
                             completed: false}]
    })
    todoNameRef.current.value = null
  }

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.completed = !todo.completed
    setTodos(newTodos)
  }

  function clearTodos() {
    setTodos(todos.filter(todo => !todo.completed))
  }

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoNameRef} type="text" />
      <button onClick={addTodo}>Add</button>
      <button onClick={clearTodos}>Clear</button>
      <div>{todos.filter(todo => !todo.completed).length} left to do</div>
    </>
  );
}
