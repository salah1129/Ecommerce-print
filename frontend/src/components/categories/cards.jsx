

// business cards.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../../styles/productPage.css"

const Cards = () => {
    const [productData, setProductData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/v1/products');
                
                const cardsProducts = response.data.products.filter(product => 
                    product.categoryID === '655de14634469ce7dc1ab822'
                );
                setProductData(cardsProducts);
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };
        fetchData();
    }, []);

    const backgroundImageStyle = {
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/cards/background.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    return (
        <div>
            <div className='backgroundImage' style={backgroundImageStyle}>
                <h1>Lorem ipsum, dolor sit amet consectetur </h1>
                <h3>
                Lorem ipsum, dolor sit amet consecteturLorem ipsum, dolor sit amet consecteturLorem ipsum, dolor sit amet consectetur
                </h3>
            </div>
            <div className='products'>
                <h1>Lorem ipsum, dolor sit amet consectetur</h1>
                <h2>Lorem ipsum, dolor sit amet consecteturLorem ipsum, dolor sit amet consecteturLorem ipsum, dolor sit amet consectetur</h2>
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
        <Link to={`/products/cards/${product._id}`}>
            <div className='card'>
                <div className='cardImg'>
                    <img alt='img' src={`/images/cards/${product.productImage}`} style={{width: "100%", height: "100%"}} />
                </div>
                <div className='description'>
                    <h3 className='cardName'>{product.productName}</h3>
                    <div className='cardDescription'>{product.shortDescription} </div>
                    <div className='link'>Show more details</div>
                </div>
            </div>
        </Link>
    );
};

export default Cards;


