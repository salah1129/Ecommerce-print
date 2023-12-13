import React, { useRef, useEffect } from 'react';
import './collectionSlide.css';

const CollectionSlide = () => {
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;

    const interval = setInterval(() => {
      if (slider) {
        slider.scrollLeft += slider.clientWidth;

        if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
          slider.scrollLeft = 0;
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
<div className="collections">
  <div className="slider" ref={sliderRef}>
    <div className="collection" style={{ backgroundImage: 'url()' }}>
      <img src={require(`./images/businessCards.jpg`)} alt="" />
      <div>
        <h3>Business cards</h3>
        <p>Impressive business card designs for a lasting impression.</p>
      </div>
    </div>
    <div className="collection" style={{ backgroundImage: 'url()' }}>
      <img src={require(`./images/postcards.jpg`)} alt="" />
      <div>
        <h3>Postcards</h3>
        <p>Captivating postcards for special moments or business promotion.</p>
      </div>
    </div>
    <div className="collection" style={{ backgroundImage: 'url()' }}>
      <img src={require(`./images/stickers.jpg`)} alt="" />
      <div>
        <h3>Stickers & labels</h3>
        <p>Vibrant stickers and labels for personal or business expression.</p>
      </div>
    </div>
    <div className="collection" style={{ backgroundImage: 'url()' }}>
      <img src={require(`./images/Banners.jpg`)} alt="" />
      <div>
        <h3>Custom signs</h3>
        <p>Eye-catching signs to promote your brand effectively.</p>
      </div>
    </div>
    <div className="collection" style={{ backgroundImage: 'url()' }}>
      <img src={require(`./images/Bottles.jpg`)} alt="" />
      <div>
        <h3>Promotional products</h3>
        <p>Unique products for boosting brand visibility.</p>
      </div>
    </div>
    <div className="collection" style={{ backgroundImage: 'url()' }}>
      <img src={require(`./images/Calendars.jpg`)} alt="" />
      <div>
        <h3>Calendars</h3>
        <p>Personalized calendars for organization and brand showcase.</p>
      </div>
    </div>
  </div>
</div>

  );
};

export default CollectionSlide;
