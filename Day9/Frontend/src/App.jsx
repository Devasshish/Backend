import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'

const App = () => {
  const [note, setNote] = useState([{
    title: "title 1",
    desc: "Desc 1"
  },
  {
    title: "title 2",
    desc: "Desc 2"
  },
  {
    title: "title 3",
    desc: "Desc 3"
  },
  {
    title: "title 4",
    desc: "Desc 4"
  },
  ])

  useEffect(() => {

    axios.get('http://localhost:3000/notes')
      .then((res) => {
        setNote(res.data.note)
      })
      .catch(() => {
        console.log("Not get");

      })
  })
  return (
    <div className='w-full h-screen bg-black text-white'>

      {
        note.map((note) => {
          return note.title
        })
      }
    </div>
  )
}

export default App