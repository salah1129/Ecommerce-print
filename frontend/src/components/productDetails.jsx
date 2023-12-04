// ProductDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import "../styles/productDetails.css";

const ProductDetails = ({ addToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [imageIndex, setImageIndex] = useState("1");

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

  const handleNextImage = () => {
    const nextIndex = (imageIndex + 1) % product.images.length;
    setImageIndex(nextIndex.toString());
  };

  const handlePrevImage = () => {
    const prevIndex = (imageIndex - 1 + product.images.length) % product.images.length;
    setImageIndex(prevIndex.toString());
  };

  const handleAddToCart = () => {
    addToCart(product);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="productDetails">
      <div className="productImage">
        <img src={`/images/cards/${product.images[imageIndex]}`} alt={product.productName} style={{ width: "100%", height: "100%" }} />
        <div className='nextPrev'>
          <div onClick={handleNextImage}>Prev</div>
          <div onClick={handlePrevImage}>Next</div>
        </div>
      </div>
      <div className="description">
        <h1>{product.productName}</h1>
        <h3>{product.price}</h3>
        <p>{product.longDescription}</p>
        <button onClick={handleAddToCart}>Add to Cart</button>
        <Link to="/cart">Go to Cart</Link>
      </div>
    </div>
  );
};

export default ProductDetails;
