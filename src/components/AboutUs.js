import React from 'react';
import HeroSection from './hero/HeroSection';
import Footer from './footer/Footer';
import Cards from './cards/Cards';
import Navbar from './navbar/Navbar';

const AboutUs = () => {
  return (
    <>
    <Navbar />
      <HeroSection />
      <Cards></Cards>
      <Footer />
    </>
  );
}

export default AboutUs;