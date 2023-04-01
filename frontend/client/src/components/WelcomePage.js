import React from 'react';
import { Link } from 'react-router-dom';
import './WelcomePage.css';


function WelcomePage() {
    return (
        <div className="container">
            <div className="logo">
                <div className="text">medDB</div>
            </div>
            <div className="centered">
                <h1>Welcome.</h1>
                <Link to="/login"><button>Login</button></Link>
            </div>
        </div>
    );
}

export default WelcomePage;
  
