import React, { useEffect, useState } from 'react'
import { API } from '../../services/api';
import '../../css/manageProducts.css';



export default function ManageProducts() {
    const [products, setProducts] = useState([]);
    const [editProduct, setEditProduct] =useState(null);
    const [message, setMessage] = useState("");
    const [filter, setFilter] = useState("all");


    useEffect(()=>{
        loadProducts();
    },[]);

    const loadProducts =async ()=>{
        const data = await API.getAllProductForAdmin();
        setProducts(data);
        console.log(data);
    }
    const deleteProduct = async (id) =>{
        if(!window.confirm("Are your sure you want to delete product")){
            return;
        }
        await API.deleteProduct(id);
        setMessage("Product Deleted.");
        loadProducts();
    }
    const startEdit =(product)=>{
        setEditProduct(product);
    };
    const handleEditChange =(e)=>{
        setEditProduct({
            ...editProduct,
            [e.target.name]:e.target.value
        });
    };
    const updateProduct = async ()=>{
        await API.updateProduct(editProduct.id, editProduct)
        setMessage("Product Updated")
        setEditProduct(null);
        loadProducts();
    }
    


  return (
    <div className='manage-products'>
        <h2>ManageProducts</h2>    
         <div className='filter-Product'>
            <label > Filter Prodct By Status</label>
                <select
                        value={filter}
                        onChange={(e)=>setFilter(e.target.value)}
                        >
                    <option value="all">All</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
         </div>

        {message && <p>{message}</p>}

            {editProduct && (
                <div className='edit-box'>
                    <input name='name'
                        value={editProduct.name}
                        onChange={handleEditChange} 
                    />

                    <input name='description'
                            value={editProduct.description}
                            onChange={handleEditChange} 
                    />

                    <input type='number'
                            name='price'
                            value={editProduct.price}
                            onChange={handleEditChange}
                    />

                    <input type='number' 
                            name='stock'
                            value={editProduct.stock}
                            onChange={handleEditChange} 
                    />

                    <select name='status'
                            value={editProduct.active ? "active" : "inactive"}
                            onChange={(e)=> setEditProduct({
                                ...editProduct,
                                active : e.target.value === "active"
                            })}>
                        <option value="active"> Active</option>
                        <option value="inactive">Inactive</option>    
                    </select>

                    <button onClick={updateProduct}>Update</button>
                    <button onClick={()=>setEditProduct(null)}>Cancel</button>

                </div>
            )}

        <table className='product-table'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {products
                    .filter(p=>{
                        if(filter ==="all")return true;
                        if(filter ==="active")return p.active ===true;
                        if(filter ==="inactive")return p.active ===false;
                    })
                    
                    .map((p)=> (
                    <tr key={p.id}>
                        <td>{p.id}</td>
                        <td>{p.name}</td>
                        <td>{p.description}</td>
                        <td>{p.price}</td>
                        <td>{p.stock}</td>
                        <td>{p.active ? (<span style={{color:"green"}} >Active</span>) : (<span style={{color:"red"}} >Inactive</span>) }</td>
                        <td> 
                            <button className='edit-btn' onClick={()=>{startEdit(p)}}>Edit</button>
                            <button className='del-btn' onClick={()=>{deleteProduct(p.id)}}>Delete</button>
                        </td>

                    </tr>
                ))} 


            </tbody>


        </table>


    </div>
  )
}
