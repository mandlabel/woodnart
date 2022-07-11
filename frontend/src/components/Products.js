import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom';
import {cartContext} from '../context/cartContext'
import { Button, Modal } from 'react-bootstrap';
import { profileContext } from "../context/profileContext";
export const Products =  () => {

    const [products, setProducts] = useState([]) // products
    const { addToCart } = useContext(cartContext);
    const { loggedIn } = useContext(profileContext)

    const deleteProduct = async (id) => {
        try {
            const { data } = await axios.delete(`/api/delete/${id}`)
            console.log(data)
            await getProducts()
        }
        catch(err) {
            console.log(err)
        }
    } 

    const [ admin, setAdmin ] = useState(undefined)
    const getAdmin = async () => {
        const { data: user } = await axios.get('/api/currentUser')
        setAdmin(user.admin)
    }

    const getProducts = async () => {
        const { data: products } = await axios.get('/api/products')
        setProducts(products.reverse())
    }
    useEffect(() => {
        getProducts()
        getAdmin()
    }, []);

    const [name, setName] = useState('')
    const [img, setImg] = useState('')
    const [desc, setDesc] = useState('')

    const [modal, setModal] = useState(false)
    const closeModal = () => setModal(false)
    const openModal = (product) => {
        setModal(true)
        setName(product.name)
        setDesc(product.desc)
        setImg(product.img)
    }

    return (
        <div>
        <div className="container">
            <div className="row">
                {products.map((product) => (
                <div key={product._id} className="col-sm col-example">
                    <div className="card-body p-2 border-dark mb-2">
                        <h5 className="card-title text-center">{product.name}</h5>
                        <b><p className="card-text  col-sm text-center col-example">{product.cost} HUF</p> </b>

                        <div className="card-header mb-3 rounded">
                        <img   src={product.img}  onClick={() => openModal(product)} className="d-block mx-auto border border-dark" maxwidth="300" height="300  " />
                        </div>
                       

                        {loggedIn === true && (
                            <>
                        <div className="text-center">    
           
                        <button type="button" className="btn border-dark" onClick={() => addToCart(product)}>
                                    Kosárba helyezés  
                        </button>
                        </div>
                            </>
                        )}
                        
                        {admin === true && (
                            <>
                        <div className="card-footer">
                            <div className="row">
                            <div className="col-xs-12 col-sm-6 col-md-3 mx-auto d-block">
                                <Link to={`/update/${product._id}`} className="text-danger">Modosítás</Link>  
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3 mx-auto d-block">
                            <button type="button" className="" onClick={() => deleteProduct(product._id)}>
                                Törlés
                            </button>
                            </div>
                            
                            </div>
                        </div>
                            </>
                        )}
                    </div>    
                    <Modal show={modal} onHide={closeModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>{name}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="modal-xl">
                            <div className = "row"> 
                        <img src={img} className="rounded  mx-auto d-block" maxwidth="500" height="400"/> 
                                            <div className="mx-auto"> <b>{desc}</b></div> 
                            </div>
                                                </Modal.Body> 
                            <Modal.Footer>
                                <Button variant="secondary" onClick={closeModal}>
                                    Bezár 
                                </Button>
                                
                                
                                
                            </Modal.Footer>
                        </Modal>  
                        
                </div>
                
                ))}  
            </div> 
        </div>   
    </div>
    )
}
