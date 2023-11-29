import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "../styles/productDetails.css"
const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/v1/products/${id}`);
                setProduct(response.data.product); 
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };
        fetchProductDetails();
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="productDetails">
                <div className="productImage">
                   <img src={`/images/cards/${product.productImage}`} alt={product.productName} style={{width : "100%", height:"100%"}}/>
                </div>
                <div className="description">
                   <h1> {product.productName} </h1>
                   <h3>{product.price} </h3>
                   <p> {product.longDescription} </p>
                   <button>Add to cart</button> 
                        
                </div>
        </div>
    );
};

export default ProductDetails;
