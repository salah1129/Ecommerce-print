// ProductDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
          <div onClick={handleNextImage}>&lt;</div>
          <div onClick={handlePrevImage}>&gt;</div>
        </div>
      </div>
      <div className="description">
        <h1>{product.productName}</h1>
        <h3>{product.price}</h3>
        <p>{product.longDescription}</p>

        {/* Additional Sections */}
        <div className="productSpecs">
          <h4>Product Specifications:</h4>
        </div>

        <div className="printQuality">
          <h4>Print Quality:</h4>
          <p>{product.printQuality}</p>
        </div>

        <div className="productionTime">
          <h4>Production Time:</h4>
          <p>{product.productionTime}</p>
        </div>

        <div className="careInstructions">
          <h4>Care Instructions:</h4>
          <p>{product.careInstructions}</p>
        </div>

        <div className="shippingInformation">
          <h4>Shipping Information:</h4>
          <p>{product.shippingInformation}</p>
        </div>

        <div className="weight">
          <h4>Weight:</h4>
          <p>{product.weight}</p>
        </div>

        <div className="dimensions">
          <h4>Dimensions:</h4>
          <p>{product.dimensions}</p>
        </div>

        <div className="material">
          <h4>Material:</h4>
          <p>{product.material}</p>
        </div>

        <div className="availableColors">
          <h4>Available Colors:</h4>
          <ul>
            {product.availableColors.map((color, index) => (
              <li key={index}>{color}</li>
            ))}
          </ul>
        </div>

        <button onClick={handleAddToCart} className='addToCart'>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetails;
