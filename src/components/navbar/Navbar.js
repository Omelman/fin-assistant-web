import React, { useState, useEffect } from 'react';
import { Button } from '../button/Button';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/about-us' className='navbar-logo' onClick={closeMobileMenu}>
            FinAssistant
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/about-us' className='nav-links' onClick={closeMobileMenu}>
                About us
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/sign-up'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Sign up
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/sign-in'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Sign in
              </Link>
            </li>

          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
