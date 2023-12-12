import React from 'react';
import { Container, Row } from "react-bootstrap";
import "../styles/Screen.css";

const MainScreen = ({ children, title }) => {
  return (
    <div className='mainBack'>
      <Container>
        <div></div>
        <Row>
            <div className='page'>
                {title && (
                    <>
                      <h1 className='heading'>{title}</h1>
                      <hr />
                    </>
                )}
                {children}
            </div>
        </Row>
      </Container>
    </div>
  );
}

export default MainScreen;
