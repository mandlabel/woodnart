import React, {useContext} from 'react';
import  {cartContext} from '../context/cartContext'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
export const Cart = () => {

    let history = useHistory()
    const {cart, removeFromCart } = useContext(cartContext)

    const deleteallproduct = () => {
        localStorage.clear()
        history.push('/cart')
    }

    const calculatePrice = () => {
        return cart.reduce((price, cart) => price + cart.cost, 0);
    };

    const makeOrder = async () => {
        const productlist = JSON.stringify(cart)
        await axios.put(`/api/makeorder`, productlist)
    }

    return (
        <div className="">

            <button className="btn btn-outline-danger  d-block mr-auto" onClick={() => deleteallproduct()}>
                Kosár ürítése
            </button>   
            <button className="btn btn-success mt-3 p-2" onClick={() => makeOrder()}>Rendelés</button>
             
            <div className="header d-block ">
                <h3>Kosár tartalma</h3>
            </div>
            <b>Fizetendő: {calculatePrice()} HUF </b>

            {cart.map((carts) => (
            <div key={carts._id}>
            <div className="card w-25 h-25 mb-1 text-center">
            <div className="card-body">
                    <label className="card-title text-center">{carts.name}</label>
                <div className="card-footer">
                    <label className="card-text h8 text-center">{carts.cost} HUF</label>
                </div>
            <div className="card-header w-50 mx-auto bg-light mb-3 rounded">
                <img src={carts.img} className="rounded mx-auto d-block" maxwidth="200" height="100"/>
            </div>
            <button type="button" className="btn btn-default btn-sm mx-auto d-block" onClick={() => removeFromCart(carts)}>
                Töröl
            </button>         
            </div>         
            </div>        
            </div>            
            ))}   
            
        </div>
    );
}
