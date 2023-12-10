import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import "../styles/productPage.css";

const Cards = () => {
  const [productData, setProductData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newSubCategoryId = new URLSearchParams(location.search).get('subcategory') || '6569f1b7432bbd4af69fc049';
        const response = await axios.get('http://localhost:5000/v1/products');
        const cardsProducts = response.data.products.filter(product =>
          product.subCategoryID === newSubCategoryId
        );
        setProductData(cardsProducts);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchData();
  }, [location.search, navigate]);

  const handleSubCategoryClick = (newSubCategoryId) => {
    navigate(`/products?subcategory=${newSubCategoryId}`);
  };

  const backgroundImageStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/images/cards/background.jpg)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

    return (
    <>
      <div className='cardsPage'>
        <div className='backgroundImage' style={backgroundImageStyle}></div>
        <div className='nav'>
          <ul>
            <li onClick={() => handleSubCategoryClick('6569f1b7432bbd4af69fc049')}>business cards</li>
            <li onClick={() => handleSubCategoryClick('656a009fd859b6a944d37cd4')}>postcards</li>
            <li onClick={() => handleSubCategoryClick('656dadcee098efe04ba262ea')}>Stickers & Labels</li>
            <li onClick={() => handleSubCategoryClick('656cccf88e582d304faddd8f')}>invitations</li>
            <li onClick={() => handleSubCategoryClick('656dea24dfa22721d0634502')}>custom signs</li>
            <li onClick={() => handleSubCategoryClick('656e11b53730ccdf8c7c68e0')}>promotional products</li>
            {/* <li onClick={() => handleSubCategoryClick('656dd8dfe098efe04ba2642b')}>calendars</li> */}
          </ul>
        </div>
        <div className='top'>
          <h1>Your Unique Card Collection</h1>
          <h3>Discover the Perfect Designs for Every Occasion, Express Your Sentiments with Elegance</h3>
        </div>
        <div className='products'>
          <ProductList products={productData} />
        </div>
      </div>
    </>
  );
};

const ProductList = ({ products }) => {
  return (
    <div className='cards'>
      {products.map((item) => (
        <ProductCard key={item._id} product={item} />
      ))}
    </div>
  );
};

const ProductCard = ({ product }) => {
  return (
    <div className='card'>
      <div className='cardImg'>
        <img alt='img' src={`/images/cards/${product.productImage}`} style={{ width: "100%", height: "100%" }} />
      </div>
      <div className='description'>
        <div className='cardName'>
          <h3>{product.productName}</h3>
        </div>
        <div className='price'>{product.price} </div>
        <div className='desc'>{product.descriptions[0]}</div>
        <div className='desc'>{product.descriptions[1]}</div>
        <div className='desc'>{product.descriptions[2]}</div>
        <Link to={`/products/cards/${product._id}`}>
          <div className='link'>Show details</div>
        </Link>
        
      </div>
    </div>
  );
};

export default Cards;
