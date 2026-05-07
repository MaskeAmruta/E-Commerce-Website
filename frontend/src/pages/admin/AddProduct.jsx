import React, { useState } from 'react'
import { API } from '../../services/api';
import { toast } from 'react-toastify';

export default function AddProduct() {

    const [message, setMessage] = useState("");
    const [product, setProduct]=useState({
        name:"",
        description:"",
        price:"",
        stock:"",
    });
    const [file, setFile] = useState(null);
    

    const handleChange =(e)=>{
        setProduct({
            ...product,
            [e.target.name] : e.target.value
        });

        console.log(product);
    };

    const handleSubmit = async (e) =>{
        e.preventDefault(); 
        const formData = new FormData();

        formData.append("name", product.name);
        formData.append("description",product.description);
        formData.append("price",product.price);
        formData.append("stock",product.stock);
        formData.append("file", file);

        try {
            API.addProduct(formData);
            toast.success("Product added");
            console.log(product);
             
        } catch (error) {
            console.error(error);
            toast.error("Error adding Product");
        } 

    }

  return (
    <div>
        <h2>AddProduct</h2>
        <form onSubmit={handleSubmit} encType='multifart/form-data'>
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

            <input type='file' onChange={(e)=>setFile(e.target.files[0])} />
            {file && (<img  src={URL.createObjectURL(file)}
                            alt='preview'
                            width="100"/>)}

            <button type='submit'> Add Product </button>
        </form>
        


    </div>
  )
}
