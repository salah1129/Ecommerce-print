// cards.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../../styles/productPage.css"
const Cards = () => {
    const [productData, setProductData] = useState([]);
    const [subCategoryId, setSubCategoryId] = useState('6569f1b7432bbd4af69fc049');
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/v1/products');
                
                const cardsProducts = response.data.products.filter(product => 
                    product.subCategoryID === subCategoryId
                );
                setProductData(cardsProducts);
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };
        fetchData();
    }, [subCategoryId]);

    const handleSubCategoryClick = (newSubCategoryId) => {
        setSubCategoryId(newSubCategoryId);
    };

    const backgroundImageStyle = {
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/cards/background.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    return (
        <div>
            <div className='backgroundImage' style={backgroundImageStyle}>
                <h1>Your Unique Card Collection</h1>
                <h3>Find the Perfect Design for Every Occasion</h3>
            </div>
            {/* <h1>Your Thoughtful Card Selection</h1>
            <h3>Uncover the Ideal Print for Any Celebration</h3> */}
            <div className='nav'>
                <ul>
                    <li onClick={() => handleSubCategoryClick('6569f1b7432bbd4af69fc049')}>business cards</li>
                    <li onClick={() => handleSubCategoryClick('656a009fd859b6a944d37cd4')}>postcards</li>
                    <li onClick={() => handleSubCategoryClick('656cccf88e582d304faddd8f')}>invitations</li>
                    <li onClick={() => handleSubCategoryClick('')}>Greeting Cards</li>
                    <li onClick={() => handleSubCategoryClick('')}>Thank You Cards</li>
                </ul>
            </div>
            <div className='products'>
                <ProductList products={productData} />
            </div>
        </div>
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
                    <img alt='img' src={`/images/cards/${product.productImage}`} style={{width: "100%", height: "100%"}} />
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
                    <div className='addToCart'>add to cart</div>
                </div>
            </div>
    );
};

export default Cards;
