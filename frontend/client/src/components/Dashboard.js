import { useState } from 'react';
import { useNavigate, Link, Outlet } from 'react-router-dom';




function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const navigate = useNavigate();

  if (!isLoggedIn) {
    // if user is not logged in, redirect to login page
    navigate('/login');
  }


  const handleLogout = () => {
    // Clear the user session
    setIsLoggedIn(false);

    // Navigate to the login page
    navigate('/login');
  };

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>
      <h1>Welcome to the Dashboard</h1>
      <Outlet />
    </>
  );
}

export default Dashboard;
