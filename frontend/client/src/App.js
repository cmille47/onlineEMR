import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import Playground from './components/Playground';
import Dashboard from './components/Dashboard';
import Auth from './components/Auth';
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<WelcomePage />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/deve" element={<Playground />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
