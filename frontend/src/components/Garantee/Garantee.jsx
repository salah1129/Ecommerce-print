import React from 'react';
import "./Garantee.css";
import { TbTruckDelivery } from "react-icons/tb";
import { FaCreditCard } from "react-icons/fa";
import { RiCustomerServiceLine } from "react-icons/ri";
import { MdOutlineSentimentVerySatisfied } from "react-icons/md";


import Garantee1 from "../../assets/Garanties-1-icon.png";
import Garantee2 from "../../assets/Garanties-2-icon.png";
import Garantee3 from "../../assets/Garanties-3-icon.png";
import Garantee4 from "../../assets/Garanties-4-icon.png";

const Garantee = () => {
  return (
    <section className='g-wrapper'>
        <div className=' flexColStart Guarantee'>
          <span className="orangeText">Our Value</span>
          <br/>

<span className="primaryText text">Value We Give to You</span>
</div>
      <div className="paddings innerWidth flexCenter g-container">
        <div className='grids'>

        <div className="flexCenter icon">
                    <FaCreditCard size={50} />
         </div>
            <p className='blueDes'>100% secure payment</p>
            <p className='description'>Encrypted connection (SSL) CMI partnership</p>
            </div>
        <div className='grids'>
        <div className="flexCenter icon">
                    <RiCustomerServiceLine size={50} />
         </div>
            <p className='pinkDes'>Responsive customer service</p>
            <p className='description'>By telephone, form or email, we are always here for you.</p>
            </div>
        <div className='grids'>
        <div className="flexCenter icon">
                    <TbTruckDelivery size={50} />
          </div>
            <p className='blueDes'>Express delivery</p>
            <p className='description'>In 24 to 48 hours everywhere in Morocco</p>
            </div>
        <div className='grids'>
        <div className="flexCenter icon">
            <MdOutlineSentimentVerySatisfied size={40} />
            </div>
            <p className='pinkDes'>Satisfied or refunded</p>
            <p className='description'>Any non-compliant order will be reprinted and reshipped free of charge.</p>
            </div>
      </div>
    </section>
  )
}

export default Garantee;
