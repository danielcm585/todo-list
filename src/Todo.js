import React from 'react'

export default function Todo({todo, toggleTodo}) {
  function todoClick() {
    toggleTodo(todo.id)
  }

  return (
    <label>
      <input type="checkbox" checked={todo.completed} onChange={todoClick} />
      {todo.name}
    </label>
  )
}
