import { useState, useEffect } from "react";
import React from 'react';
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { register } from "../../actions/customerActions";
import MainScreen from "../../components/MainScreen";
import backgroundImage from "../../assets/gray-black-liquid-marble-background2.jpg";


import "./SignUp.css"; 

const SignUp = () => {

  // const  = useHistory();


  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  // const [pic, setPic] = useState(
  //   "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  // );
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  // const [picMessage, setPicMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate(); // use useNavigate hook


  const customerRegister = useSelector((state) => state.customerRegister);
  const { loading, error, customerInfo } = customerRegister;

  // const postDetails = (pics) => {
  //   if (
  //     pics ===
  //     "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  //   ) {
  //     return setPicMessage("Please Select an Image");
  //   }
  // setPicMessage(null);
//   if (pics.type === "image/jpeg" || pics.type === "image/png") {
//     const data = new FormData();
//     data.append("file", pics);
//     data.append("upload_preset", "printkingdom");
//     data.append("cloud_name", "printkingom");
//     fetch("https://api.cloudinary.com/v1_1/piyushproj/image/upload", {
//       method: "post",
//       body: data,
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setPic(data.url.toString());
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   } else {
//     return setPicMessage("Please Select an Image");
//   }
// };

useEffect(() => {
  if (customerInfo) {
    navigate("/"); 
  }
}, [navigate, customerInfo]);


const submitHandler = (e) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    setMessage('Passwords do not match');
  } else dispatch(register(first_name, last_name, email, password));
};


  return (
    <div className='bigWrapper'>
    <div className='loginBackgroundImage'>
      <img src={backgroundImage} className='image'/>

    <div className='globalS'>

    <MainScreen title="SIGN UP">
      <div className="signUpContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="first_name">
          <Form.Label>First Name</Form.Label>
            <Form.Control 
              type="first_name" 
              value={first_name} 
              placeholder="Enter First name" 
              onChange={(e) => setFirstName(e.target.value)} 
              />  
          </Form.Group>

          <Form.Group controlId="last_name">
          <Form.Label>Last Name</Form.Label>
            <Form.Control 
              type="last_name" 
              value={last_name} 
              placeholder="Enter Last name" 
              onChange={(e) => setLastName(e.target.value)} 
            />  
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
            <Form.Control 
              type="email" 
              value={email} 
              placeholder="Enter Last name" 
              onChange={(e) => setEmail(e.target.value)} 
              />  
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password" 
              value={password} 
              placeholder="Password" 
              onChange={(e) => setPassword(e.target.value)} 
              />  
          </Form.Group>

          <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
            <Form.Control 
              type="password" 
              value={confirmPassword} 
              placeholder="Confirm Password" 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              />  
          </Form.Group>


          <Button variant="primary" type="submit" className="button">
            Sign Up
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
          Have an Account ? <Link to="/login" className="register">Login Now</Link>
          </Col>
        </Row>
      </div>
      
    </MainScreen>
    </div>
              </div>
    </div>
  );
}

export default SignUp;
