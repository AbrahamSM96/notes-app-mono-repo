import React, { useState, useRef } from 'react'
import Toggable from './Toggable'

export default function NoteForm({ addNote, handleLogOut }) {
  const [newNote, setNewNote] = useState('')
  const toggableRef = useRef()
  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5
    }
    addNote(noteObject)
    setNewNote('')
    //usamos la referencia para acceder a la funcion que ese esta ejecuntando en el componente Toggable
    //Gracias a UseImperativeHandle que tiene el componente Toggable podemos usar la funcion toggleVisibility()
    toggableRef.current.toggleVisibility()
  }
  console.log(toggableRef)

  return (
    <Toggable buttonLabel="New Note" ref={toggableRef}>
      <h3>Create a new note</h3>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Write your note content"
          value={newNote}
          onChange={handleChange}
        />
        <button type="submit">save</button>
      </form>
      <div>
        <button onClick={handleLogOut}>Cerrar Sesión</button>
      </div>
    </Toggable>
  )
}
