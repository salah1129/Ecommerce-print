import React from 'react';
import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import Garantee from '../../components/Garantee/Garantee';
import Footer from '../../components/Footer/Footer';
import Contact from '../../components/Contact/Contact';
import Value from "../../components/Value/Value";
import GetStarted from '../../components/GetStarted/GetStarted';

const LandingPage = () => {
  return (
    <div className='App'>
    <div>
      <div className="white-gradient" />
      <Header />
      <Hero />
    </div>
    <Garantee />
    <Value/>
    <GetStarted/>

  <Contact/>
  <Footer />
  </div>
  )
}

export default LandingPage;
