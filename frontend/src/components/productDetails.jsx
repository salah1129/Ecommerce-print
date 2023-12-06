// ProductDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "../styles/productDetails.css";
import { Link } from 'react-router-dom';

const ProductDetails = ({ addToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [imageIndex, setImageIndex] = useState("1");
  const [uploadedFile, setUploadedFile] = useState(null);

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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setUploadedFile(file);
  };

  const handleUploadDesign = () => {
    const formData = new FormData();
    formData.append('designFile', uploadedFile);

    axios.post('http://localhost:5000/v1/upload-design', formData)
      .then(response => {
        console.log('Upload successful:', response.data);
      })
      .catch(error => {
        console.error('Error uploading design:', error);
      });
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
        <div className='uploadDesing'>
          <h3>Have a design? Upload it now</h3>
          <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUploadDesign} className='upload'>Upload Design</button>
          </div>
        </div>
        <button onClick={handleAddToCart} className='addToCart'>Add to Cart</button>
        <Link to={"/cart"} >go to cart</Link>
      </div>
    </div>
  );
};

export default ProductDetails; 
