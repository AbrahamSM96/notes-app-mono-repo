import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import Notification from './components/Notification'
import noteService from './services/notes'
import loginService from './services/login'

const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    //Aqui obtenemos todas las notas
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes)
    })
  }, [])

  useEffect(() => {
    //Obtenemos los datos del localstorage
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    //Comprobamos si existe informacion en localstorage
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      //Actualizamos el user
      setUser(user)
      //Asignamos el user.token
      noteService.setToken(user.token)
    }
  }, [])
  const addNote = (noteObject) => {
    // Aqui enviamos el token a notes.js

    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote))
    })
  }

  const handleLogOut = () => {
    setUser(null)
    noteService.setToken(null)
    window.localStorage.removeItem('loggedNoteAppUser')
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)))
      })
      .catch((error) => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const notesToShow = showAll ? notes : notes.filter((note) => note.important)

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('Submit')
    try {
      //A loginservice le enviamos los parametros para el login
      const user = await loginService.login({ username, password })
      console.log(user)
      // Guardamos los datos en LocalStorage
      window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user))

      // Aqui guardamos el token que nos proporciona el servicio
      noteService.setToken(user.token)

      //Asignamos el user
      setUser(user)
      //Reseteamos el username and password
      setUsername('')
      setPassword('')
    } catch (error) {
      setErrorMessage('Wrong credentiasl')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      {user ? (
        <NoteForm addNote={addNote} handleLogOut={handleLogOut} />
      ) : (
        <LoginForm
          username={username}
          password={password}
          handleUserNameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleLogin={handleLogin}
        />
      )}

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note, i) => (
          <Note
            key={i}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
    </div>
  )
}

export default App
