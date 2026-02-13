import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'

const App = () => {
  const [note, setNote] = useState([])
  function getData() {
    axios.get('http://localhost:3000/notes')
      .then((res) => {
        setNote(res.data.note)
      })
      .catch(() => {
        console.log("Not get");

      })
  }
  useEffect(() => {
    getData()

  }, [])

  function handleSubmit(e) {
    e.preventDefault()

    const { title, desc } = e.target.elements
    console.log(title.value, desc.value);

    axios.post('http://localhost:3000/notes', {
      title: title.value,
      desc: desc.value
    })
      .then((res) => {
        console.log(res.data);

        getData()
      })
  }

  function handleDelete(noteId) {
    console.log(noteId);
    axios.delete(`http://localhost:3000/notes/${noteId}`)
      .then(() => {

        getData()
      })
  }

  function handleUpdate(noteId) {
    console.log(noteId);
    
    const newTitle = prompt("Enter new title")
    const newDesc = prompt("Enter new description")
    axios.put('http://localhost:3000/notes/'+noteId,
      {
        title : newTitle,
        desc : newDesc
      }
    )
    .then(()=>{
      getData()
    })
  }

  return (
    <div className='w-full h-screen bg-black text-white'>
      <form className='p-2 flex justify-center gap-2 focus:border-0 target:border-0 active:border-0' onSubmit={handleSubmit}>
        <input name='title' className='bg-white p-2 text-black border-0'></input>
        <input name='desc' className='bg-white p-2 text-black border-0'></input>
        <button className='border px-3'>Submit</button>
      </form>
      <div className="flex flex-wrap justify-center mt-3">
        {
          note.map((note) => {
            return <div className='p-3 rounded-2xl gap-4 border-2 m-2 w-50 h-fit'>
              <h1>{note.title}</h1>
              <h2>{note.desc}</h2>
              <button className='bg-green-600 mr-5 mt-2 p-1 px-3 rounded-md' onClick={() => {
                handleUpdate(note._id)
              }}>Update</button>
              <button className='bg-red-600 p-1 px-3 rounded-md' onClick={() => {
                handleDelete(note._id)
              }}>Delete</button>
            </div>
          })
        }
      </div>
    </div>
  )
}

export default App