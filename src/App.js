/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { atom, Provider, useAtom } from 'jotai'
import './App.css'

const todoAtoms = atom((async) =>
  fetch('https://jsonplaceholder.typicode.com/todos').then((res) => res.json())
)
const filterAtom = atom('')

function FilterInput() {
  const [filter, filterSet] = useAtom(filterAtom)

  return (
    <input className='customInput' value={filter} onChange={(evt) => filterSet(evt.target.value)} />
  )
}

const filteredTodos = atom((get) =>
  get(todoAtoms).filter((todo) => todo.title.toLowerCase().includes(get(filterAtom).toLowerCase()))
)

function TodoTable() {
  const [todos] = useAtom(filteredTodos)

  return (
    <div>
      <ul className='todoGride'>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  )
}

function App() {
  return (
    <div className='App'>
      <FilterInput />
      <TodoTable />
    </div>
  )
}

const Bootstrap = () => (
  <Provider>
    <React.Suspense fallback={<div>loading...</div>}>
      <App />
    </React.Suspense>
  </Provider>
)

export default Bootstrap
