import React, { useState } from 'react'
import axios from 'axios'

export const Upload = () => {
  const [name, setName] = useState('valami')
  const [desc, setDesc] = useState('valami')
  const [cost, setCost] = useState('1000')
  const [file, setFile] = useState()
  const uploading = async () => {
    try {
        
        const formData = new FormData()
        formData.append('example', file) 
        formData.append('name', name) 
        formData.append('desc', desc) 
        formData.append('cost', cost) 
      const { data } = await axios.post('/api/upload', 
        formData
      )
      console.log(data)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
    <div className="container">
      <h3 className="mx-auto text-center">Termék feltöltése</h3>
    </div>
    <div className="container mt-5">
      <div className="card w-75 mx-auto text-center">
      Adja meg a termék nevét:
      <input value={name} className="w-50 mt-3 mx-auto" onChange={(e) => setName(e.target.value)} />
      Adja meg a termék leírását:
      <input value={desc} className="w-50 mt-3 mx-auto" onChange={(e) => setDesc(e.target.value)} />
      Adja meg a termék árát (HUF):
      <input type="number" min='1' className="w-50 mt-3 mx-auto" value={cost} onChange={(e) => setCost(e.target.value)} />
      Töltsd fel a képet:
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])} 
        accept="image/jpeg"
        className="mx-auto mt-3 text-center btn btn-primary"
      />   
      <button className="btn btn-success w-25 mx-auto text-center mt-3" onClick={uploading}>Feltöltés</button>
      </div>
      
    </div>
    </div>
  )
}