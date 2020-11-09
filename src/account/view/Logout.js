import React from 'react';

const Logout = () => {
 localStorage.clear();
 window.location.href = "/about-us";
}

export default Logout;