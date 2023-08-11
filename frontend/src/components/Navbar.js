import React, { useState } from 'react';
import Login from './Login'; 
import axios from 'axios';

const Navbar = ({ loggedInUser, setLoggedInUser }) => {
  const [showLogin, setShowLogin] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/logout");
      setLoggedInUser(null); 
      console.log("user logged out")
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleLoginOnClick = () => {
    setLoggedInUser(true); // Store the entered username
    setShowLogin(false); 
  };

  return (
    <nav>
      <div className="nav__logo">My Sketches .....</div>
      <div class="buttons">
      <div>
        <a href="mailto:swarasawant1312@gmail.com" className="contact">
          Contact Me 
        </a>
      </div>
      <div>
        {loggedInUser ? (
          <>
            <button class="account" onClick={handleLogout}><span>Logout</span></button>
          </>
        ) : (
          <>
            {showLogin  ? (
              <Login handleLoginOnClick={handleLoginOnClick} />
            ) : (
              <button class="account" onClick={() => setShowLogin(true)}><span>Login</span></button>
            )}
          </>
        )}
      </div>
      </div>
    </nav>
  );
};


export default Navbar;