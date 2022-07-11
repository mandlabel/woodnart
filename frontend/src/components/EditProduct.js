import React, { useState } from 'react'
import axios from 'axios'
import { useRouteMatch } from 'react-router-dom'
import { useHistory } from "react-router-dom";

export const EditProduct = () => {

    const [name, setName] = useState("New name")
    const [desc, setDesc] = useState("New desc")
    const [cost, setCost] = useState('1000')
    const [file, setFile] = useState()

    let history = useHistory('/')

    const match = useRouteMatch()
    const productid = match.params.id
    
    const editProduct = async (id) => {
        try { 
            const formData = new FormData()
            formData.append('example', file) 
            formData.append('name', name) 
            formData.append('desc', desc) 
            formData.append('cost', cost) 
            await axios.put(`/api/update/${id}`, formData)
            history.push("/");
        }
        catch(err) {
            console.error(err)
        }
    }

    return (
    <div>
    <div className="container">
    <h3 className="mx-auto text-center">Termék modosítása</h3>
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
    <button className="btn btn-success w-25 mx-auto text-center mt-3" onClick={() => editProduct(productid)}>Modosítás</button>
    </div>

    </div>
    </div>
    )
}