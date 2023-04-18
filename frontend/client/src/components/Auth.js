import React, { useState, createContext } from "react"
import { useNavigate } from 'react-router-dom';
import "./Auth.css"
const authContext = createContext()
export default authContext;

function Auth(props) {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

  
    const handleSubmit = (e) => {
      e.preventDefault();
      fetch('/login_info', {
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
      .then((data) => {
        console.log(data)
        if (data.success) {
          navigate('/dashboard');
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
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
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