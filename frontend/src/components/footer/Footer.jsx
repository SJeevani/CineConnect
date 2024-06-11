import React from 'react'
import { NavLink } from 'react-router-dom';
import '../footer/Footer.css'
import logo from '../../images/logo.png'
import { useSelector } from 'react-redux';

function Footer() {
  let { currentUser, loginUserStatus } = useSelector(state => state.userAdminLoginReducer)

  return (
    <div>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-logo d-flex align-items-center">
            <img src={logo} alt=' ' />
            <h1>CineConnect</h1>
          </div>
          <div className="footer-social">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h3>CineConnect</h3>
              <ul>
                <li><NavLink to="/resources">Resources</NavLink></li>
                <li><NavLink to="/about">About Us</NavLink></li>
                <li><NavLink to="/contact">Contact</NavLink></li>
                <li><NavLink to="/blog">Blog</NavLink></li>
              </ul>
            </div>
            {loginUserStatus && (
              <div className="footer-column">
                <h3>Explore</h3>
                {currentUser.userType === 'user' &&
                  <ul>
                    <li><NavLink to="/user-profile/movies">Movies</NavLink></li>
                    <li><NavLink to="/user-profile/movies-by-genre">Genres</NavLink></li>
                    <li><NavLink to="/user-profile/trending">Top 100 Movies</NavLink></li>
                  </ul>}
                {currentUser.userType === 'admin' &&
                  <ul>
                    <li><NavLink to="/admin-profile/movies">Movies</NavLink></li>
                    <li><NavLink to="/admin-profile/movies-by-genre">Genres</NavLink></li>
                    <li><NavLink to="/admin-profile/trending">Top 100 Movies</NavLink></li>
                  </ul>}
              </div>
            )}
            <div className="footer-column">
              <h3>Help</h3>
              <ul>
                <li><NavLink to="/support">Support</NavLink></li>
                {loginUserStatus === false &&
                  <>
                    <li><NavLink to="/signup">Sign Up</NavLink></li>
                    <li><NavLink to="/signin">Sign In</NavLink></li>
                  </>
                }
                <li><NavLink to="/faq">FAQ's</NavLink></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; CineConnect, 2024. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Footer
