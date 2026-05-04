import React, { useEffect, useState } from 'react'
import { API } from '../services/api';
import '../css/cart.css'

export default function () {
    const [cart, setCart] = useState([]);
    const [product, setProduct] = useState([]);

    useEffect(()=>{
        getCart();
    },[])

    const getCart =async ()=>{
       const data = await API.getCart(1);
       setCart(data);
       
    }
    const placeOrder =()=>{
        API.placeOrder(1).then(data =>{
            alert(data);
            window.location.reload();
        })
        .catch(err => {console.error(err);
            alert("order failed.")
        });
    }

    const removeItem =(id)=>{
        API.removeItem(id);
        getCart();
        window.location.reload();
    }
  return (
    <div>
        <h2>Cart</h2>
        { cart.map(item =>(
            <div key={item.id} className='cart-section'>
                <div className='cart-item'>
                    <h3>Name: {item.product.name}</h3>
                    <p>Quatity: {item.quentity}</p>
                    <p>Price: {item.product.price}</p>
                    <button onClick={() => removeItem(item.id)}>Remove</button>
                </div>
                
            </div>
         ))      
        }     
         <button onClick={placeOrder}> Place Order </button>

    </div>
  )
}
