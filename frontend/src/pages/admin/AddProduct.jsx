import React, { useState } from 'react'
import { API } from '../../services/api';

export default function AddProduct() {

    const [message, setMessage] = useState("");
    const [product, setProduct]=useState({
        name:"",
        description:"",
        price:"",
        stock:"",
    });

    const handleChange =(e)=>{
        setProduct({
            ...product,
            [e.target.name] : e.target.value
        });

        console.log(product);
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
         API.addProduct(product);
        alert("Product added");
        console.log(product);

    }

  return (
    <div>
        <h2>AddProduct</h2>
        <form onSubmit={handleSubmit}>
            <input type="text"  
                name='name' 
                placeholder='Product Name' 
                value={product.name} 
                onChange={handleChange} />

            <textarea name="description" 
                placeholder='Description' 
                value={product.description} 
                onChange={handleChange}>Description</textarea>

            <input type="number" 
                    name='price' 
                    placeholder='Price' 
                    value={product.price} 
                    onChange={handleChange} />

            <input type="number"
                    name='stock'
                    placeholder='Stock Availbale' 
                    value={product.stock}
                    onChange={handleChange}/>

            <button type='submit'> Add Product </button>
        </form>
        


    </div>
  )
}
