import React from 'react';
import { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { login } from "../../actions/customerActions";
import MainScreen from "../../components/MainScreen";
import "./Login.css";
import { useNavigate } from 'react-router-dom';
import backgroundImage from "../../assets/gray-black-liquid-marble-background2.jpg";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate(); 


  const customerLogin = useSelector((state) => state.customerLogin);
  const { loading, error, customerInfo } = customerLogin;

  useEffect(() => {
    if (customerInfo) {
      navigate("/"); 
    }
  }, [navigate, customerInfo]);



  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div className='bigWrapper'>



    <div className='loginBackgroundImage'>
      <img src={backgroundImage} />
    
   <div className='globalLogin'>
    
     <MainScreen title="Login To Start Printing">

     {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading />}

        <div className='authContainer'>



           <Form onSubmit={submitHandler} className='from'>
            <Form.Group controlId='formBasicEmail'>
                <Form.Label>Email address</Form.Label>
                <Form.Control 
                  type='email' 
                  value={email} 
                  placeholder='Enter your email address' 
                  onChange={(e) => setEmail(e.target.value)} 
                />
            </Form.Group>

            <Form.Group controlId='formBasicPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  type='password' 
                  value={password} 
                  placeholder='Enter password' 
                  onChange={(e) => setPassword(e.target.value)} 
                />
            </Form.Group>
            
             <Button  type='submit' className='button'>
                Sign In
             </Button>
        
           </Form>

           <Row>
          <Col>
          Don't have an Account yet ? <Link to="/signup" className='register'>Register Now</Link>
          </Col>
        </Row>

        </div>


     </MainScreen>
     </div>
     </div>
     </div>
  );
};

export default Login;
