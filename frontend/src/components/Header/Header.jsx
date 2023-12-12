import React, { useEffect } from 'react';
import "./Header.css";
import { useDispatch, useSelector } from 'react-redux';
import "../../screens/LandingPage/LandingPage.css";
import logo from "../../assets/PrintKingdom7.png";
import { logout } from '../../actions/customerActions';
import { Link } from 'react-router-dom';

const Header = () => {

  const dispatch = useDispatch();
 
  const customerLogin = useSelector((state) => state.customerLogin);
  const { customerInfo } = customerLogin;
  
  const logoutHandler = () => {
    dispatch(logout());
  };

  useEffect(() => {}, [customerInfo]);

  return (
    <div>
      <section className='h-wrapper'>
        <div className='flexCenter innerWidth h-container'>
            
            <img src={logo} alt='logo' className='logoImage' />


            <div className="flexCenter h-menu">

                <Link to="/">Home</Link>
                <Link to="/products">Products</Link>
                <Link to="/products">Our Value</Link>
                <Link to="/products">Contact Us</Link>
                
                {customerInfo ? (
                <button className='signIn' onClick={logoutHandler}>
                   <Link className='link' to='/login'>Logout</Link>
                </button>
                ) : (
                <>
                <button className='signIn'>
                    <Link className='link' to='/login'>Login</Link>
                </button>
                <button className='signIn'>
                    <Link className='link' to='/signup'>Sign Up</Link>
                </button>
                </>
                )}

            </div>
        </div>
      </section>
    </div>
  )
}

export default Header;
