import React from 'react';
import NavbarMenu from '../components/NavbarMenu';

const Dashboard = () => {
  console.log(localStorage.getItem("token"));
  return (
    <>
   <NavbarMenu/>
    <div className='menu'>
      <h1>Dashboard</h1>
    </div>
    </>
  )
}

export default Dashboard;
