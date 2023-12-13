import React from 'react';
import "./Hero.css";
import { Link } from 'react-router-dom';
import heroImage from "../../assets/bannerHomeV2removebg.png";

const Hero = () => {
  return (
    <section className="hero-wrapper">
        <div className="paddings innerWidth flexCenter hero-container">

            {/* left side */}
            <div className="flexColStart hero-left">

                 <div className="hero-title">
                    <div className="blue-circle2" />
                    <div className="blue-circle" />
                    <h1>
                      Design <br />   Print <br />   Succeed!
                    </h1>
                 </div>
              <div className="flexColStart hero-des">
                <span className='secondaryText'>All your prints in just a few clicks. </span>
                <span className='secondaryText'>PrintKingdom offers you the best quality/price ratio.</span>
                <span className='secondaryText'>Discover all of our products and services now.</span>
              </div>

              <div className="start">
                <button className="getStarted"><Link >Let's Print</Link></button>
              </div>
            </div>
            {/* right side */}
            <div className="flexCenter hero-right">
                <div className="image-container">
                    <img src={heroImage} alt=''>
                        
                    </img>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Hero;
