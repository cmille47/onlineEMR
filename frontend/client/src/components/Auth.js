import React, { useState, createContext } from "react"
import { useNavigate } from 'react-router-dom';
import "./Auth.css"

function Auth(props) {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const name = 'Darius'; // name idea for passing vars between pages

  
    const handleSubmit = (e) => {
      e.preventDefault();
      fetch('http://3.95.80.50:8005/log-in/authenticate.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      })
      .then((response) => {
        return response.json();
      })

      // TO USE VAR_DUMP AND SUCH IN PHP COMMENT ABOVE AND USE THIS
      // .then((response) => {
      //   // Check the response status
      //   if (response.ok) {
      //     // Handle the response as text
      //     return response.text();
      //   } else {
      //     throw new Error('Network response was not ok.');
      //   }
      // })
      .then((data) => {
        console.log(data)
        if (data.success) {
          navigate('/dashboard', 
            {state: {name: name}}
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
    }


    return (
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="form-group mt-3">
              <label>Username</label>
              <input
                type="username"
                className="form-control mt-1"
                placeholder="Enter username"
                name="username" 
                id="username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                name='password' 
                id='password' 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <p className="forgot-password text-center mt-2">
              Forgot <a href="/">password?</a>
            </p>
          </div>
        </form>
      </div>
    )
  }

export {Auth};