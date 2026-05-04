import React, { useEffect, useState } from 'react'
import '../css/home.css' 
import { API } from '../services/api';

export default function HomePage() {

    const [products, setProduct] = useState([]);  
    const [wishlist, setWishlist]= useState([]);
    const [ratings, setRatings] =useState({});



    useEffect(()=>{
       API.getProducts().then(data => setProduct(data))
    }, []);

    const addToCart =(id) => {
      API.addToCart(1,id,1);
      alert("added to cart");       
    };

    const toggleWishlist = (id)=>{
      if(wishlist.includes(id)){
        setWishlist(wishlist.filter(item => item !==id));
      }else{
        setWishlist([...wishlist, id]);
      }
    };

    const handleRating =(productId, value)=>{
      setRatings({
        ...ratings, [productId]:value
      });
    };

  return (
        <>  
            <h2>Products</h2>

            <div className='card-container'>
                    {products.map(product => (
                        <div key={product.id} className='card'> {/* ✅ FIXED */}
                          <span className={`wishlist-icon
                                          ${wishlist.includes(product.id) ? 'active' :''} `}
                                onClick={()=>toggleWishlist(product.id)}>
                                      
                                      {wishlist.includes(product.id) ? '❤️' : '🤍' }
                                </span>

                          <div className='prod-img'>Image </div>
                          <h3>Name: {product.name}</h3>
                            <div className="rating">
                              {[1,2,3,4,5].map((star)=>(
                                <span key={star}
                                      className={`star ${(ratings[product.id] || 0) >= star ? "filled" : ""}`}
                                      onClick={()=>handleRating(product.id, star)}>
                                       ★
                                </span>
                              ))}
                            </div>


                          <p>Description : {product.description}</p>
                          <p>Price: ₹{product.price}</p>
                          <p>Stock: {product.stock}</p>
                          <button onClick={() => addToCart(product.id)}>
                            Add to Cart
                          </button>
                        </div>
                    ))}

              </div>
        </>

  )
}
