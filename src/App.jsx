import Note from './components/Note'
import { useState, useEffect } from 'react'
import axios from 'axios'
import noteService from './services/notes'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState("")
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])



  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

  const showImportant = () => {
    setShowAll(!showAll)
  }
  const addNote = (event) => {
    event.preventDefault()

    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }

    noteService
    .create(noteObject)
    .then(returnedNote => {
      setNotes(notes.concat(returnedNote))
      setNewNote('')
    })

  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }
  return (
    <div>
      <h1>Notes</h1>
      <button onClick={showImportant}>{showAll ? "important" : "all"}</button>
      <ul>
        {notesToShow.map(note => <Note key={note.id} content={note.content}/>)}
      </ul>
      <h1>Add Note</h1>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type="submit">save</button>
      </form>  
    </div>
  )
}

export default App