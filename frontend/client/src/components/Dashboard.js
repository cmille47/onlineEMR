import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import BaseNavbar from './BaseNavbar';


// useLocation can be used to grab data
function Dashboard(props) {

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // object destructuring in case name is undefined
  const name = location?.state?.name;

  // prevents unlogged in users to access dashboard page
  useEffect(() => {
    if (name == null) {
      setIsLoggedIn(false);
    }
  }, [name]);


  // NEED TO IMPLEMENT USER AUTHENTICATION STUFF
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
