import React from 'react';
import '../../App.css';
import { Button } from '../button/Button';
import '../hero/HeroSection.css';

function HeroSection() {
  return (
    <div className='hero-container'>
      <img src='/images/img-10.jpg'/>
      <h1>Personal assistant</h1>
      <p>What are you waiting for?</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          GET STARTED
        </Button> 
      </div>
    </div>
  );
}

export default HeroSection;
