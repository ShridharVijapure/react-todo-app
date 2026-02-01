import Navbar from './Components/Navbar'
import './App.css'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [editId, setEditId] = useState(null)
  const [editText, setEditText] = useState("")


  // Add Todo
  const handleAdd = () => {
    if (todo.trim() === "") return

    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
  }

  // Handle typing in input
  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  // Toggle checkbox
  const handleCheckbox = (e) => {
    const id = e.target.name

    const newTodos = todos.map(item =>
      item.id === id
        ? { ...item, isCompleted: !item.isCompleted }
        : item
    )

    setTodos(newTodos)
  }

  // Delete Todo
  const handleDelete = (id) => {
    const newTodos = todos.filter(item => item.id !== id)
    setTodos(newTodos)
  }

  //Edit Todo

  const handleEdit = (id, currentText) => {
    setEditId(id)
    setEditText(currentText)
  }

  const handleSave = (id) => {
    const updatedTodos = todos.map(item =>
      item.id === id ? { ...item, todo: editText } : item
    )

    setTodos(updatedTodos)
    setEditId(null)
    setEditText("")
  }
  const handleEditChange = (e) => {
    setEditText(e.target.value)
  }



  return (
    <>
      <Navbar />

      <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh]">
        <h2 className='font-bold text-xl my-5'>Add Todo</h2>

        <input
          type="text"
          onChange={handleChange}
          value={todo}
          className="bg-amber-50 w-1/2 p-2 rounded"
          placeholder="Enter a task..."
        />

        <button
          onClick={handleAdd}
          className='bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-md mx-6 text-sm font-bold cursor-pointer'>
          Save
        </button>

        <h2 className='text-lg font-bold py-3'>Your Todos</h2>

        <div className="todos space-y-3">
          {todos.length === 0 && <div className='m-5'>There is no todos To Display</div>}
          {todos.map((item) => (
            <div key={item.id} className="todo flex w-1/4 my-3 justify-between">
              <div className='flex gap-5  '>
                <div className="flex items-center gap-3">
                  <input
                    name={item.id}
                    type="checkbox"
                    checked={item.isCompleted}
                    onChange={handleCheckbox}
                  />

                  <div className={item.isCompleted ? "line-through text-gray-500" : ""}>
                    {item.todo}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                {editId === item.id ? (
                  <button
                    onClick={() => handleSave(item.id)}
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm font-bold">
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(item.id, item.todo)}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-bold">
                    Edit
                  </button>
                )}

                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm font-bold">
                  Delete
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
