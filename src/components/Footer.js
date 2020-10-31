import React from 'react';
import './Footer.css';
import { Button } from './Button';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      <div class='footer-links'>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h2>Credentials</h2>
            <a target="_blank" href="https://github.com/Omelman">Github</a>
            <a target="_blank" href="t.me/omelman">Telegram</a>
            <a target="_blank" href="https://www.linkedin.com/in/danila-omelchenko-0966ba192/">Linkedin</a>
          </div>
        </div>
      </div>
      <section class='social-media'>
        <div class='social-media-wrap'>
          <small class='website-rights'>FinAssistant © 2020</small>
        </div>
      </section>
    </div>
  );
}

export default Footer;
