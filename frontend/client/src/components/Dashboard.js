import { useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import BaseNavbar from './BaseNavbar';


// useLocation can be used to grab data
function Dashboard(props) {

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const name = "Christian";

  const navigate = useNavigate();

  // NEED TO IMPLEMENT THIS USER AUTHENTICATION STUFF
  if (!isLoggedIn) {
    // if user is not logged in, redirect to login page
    navigate('/auth');
  }
  
  return (
    <div>
      <BaseNavbar/>
      <h1>Welcome, {name}</h1>
      <Outlet />
    </div>
  );
}

export default Dashboard;
