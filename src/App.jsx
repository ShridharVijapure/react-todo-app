import Navbar from './Components/Navbar'
import './App.css'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos")
    return saved ? JSON.parse(saved) : []
  })
  const [editId, setEditId] = useState(null)
  const [editText, setEditText] = useState("")

  // 💾 Save todos whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  // ➕ Add Todo
  const handleAdd = () => {
    if (todo.trim() === "") return
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
  }

  // ✍️ Input typing
  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  // ✅ Toggle complete
  const handleCheckbox = (e) => {
    const id = e.target.name
    setTodos(todos.map(item =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    ))
  }

  // ❌ Delete
  const handleDelete = (id) => {
    setTodos(todos.filter(item => item.id !== id))
  }

  // ✏️ Start editing
  const handleEdit = (id, currentText) => {
    setEditId(id)
    setEditText(currentText)
  }

  // 💾 Save edit
  const handleSave = (id) => {
    setTodos(todos.map(item =>
      item.id === id ? { ...item, todo: editText } : item
    ))
    setEditId(null)
    setEditText("")
  }

  // ✍️ Edit input typing
  const handleEditChange = (e) => {
    setEditText(e.target.value)
  }

  return (
    <>
      <Navbar />

      <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh]">
        <h2 className="font-bold text-xl my-5">Add Todo</h2>

        <input
          type="text"
          onChange={handleChange}
          value={todo}
          className="bg-amber-50 w-1/2 p-2 rounded"
          placeholder="Enter a task..."
        />

        <button
          onClick={handleAdd}
          className="bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-md mx-6 text-sm font-bold cursor-pointer">
          Add
        </button>

        <h2 className="text-lg font-bold py-3">Your Todos</h2>

        <div className="space-y-3">
          {todos.length === 0 && (
            <div className="m-5">There are no todos to display</div>
          )}

          {todos.map((item) => (
            <div key={item.id} className="flex justify-between items-center bg-white p-3 rounded-lg">

              <div className="flex items-center gap-3">
                <input
                  name={item.id}
                  type="checkbox"
                  checked={item.isCompleted}
                  onChange={handleCheckbox}
                />

                {editId === item.id ? (
                  <input
                    type="text"
                    value={editText}
                    onChange={handleEditChange}
                    className="border p-1 rounded"
                  />
                ) : (
                  <div className={item.isCompleted ? "line-through text-gray-500" : ""}>
                    {item.todo}
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                {editId === item.id ? (
                  <button
                    onClick={() => handleSave(item.id)}
                    className="bg-green-600 hover:bg-green-800 text-white px-3 py-1 rounded text-sm font-bold">
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(item.id, item.todo)}
                    className="bg-blue-600 hover:bg-blue-800 text-white px-3 py-1 rounded text-sm font-bold">
                    Edit
                  </button>
                )}

                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 hover:bg-red-700 px-3 py-1 text-white rounded-md text-sm font-bold">
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
