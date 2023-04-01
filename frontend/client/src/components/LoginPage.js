import React, { useState } from 'react';

const LoginPage=()=>{ 
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
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input type='password' name='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default LoginPage;