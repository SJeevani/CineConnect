import React from 'react';
import { NavLink } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className='home bg-dark bg-gradient'>
      <div className='home-content'>
        <h1 className='fw-bold'>Welcome to CineConnect!</h1>
        <p className='fs-normal'>Welcome to CineConnect, your ultimate destination for discovering, reviewing, and discussing movies. Whether you're a casual movie watcher or a hardcore cinephile, CineConnect offers a platform where you can connect with other movie enthusiasts, share your thoughts, and explore new films.</p>
        <div className="cta-buttons">
          <NavLink to="/signup" className='button'>Sign Up</NavLink>
          <NavLink to="/signin" className='button'>Sign In</NavLink>
        </div>
      </div>
    </div>
  );
}

export default Home;
