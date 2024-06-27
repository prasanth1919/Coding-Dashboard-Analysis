//import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import SeekFriends from './components/SeekFriends';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import Signup from './components/Signup';
import Dsasheets from './components/Dsasheets';
import './App.css';
// UserContext.js
import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [leetcodeUsername, setLeetCodeUsername] = useState('');

  return (
    <UserContext.Provider value={{ leetcodeUsername, setLeetCodeUsername }}>
      {children}
    </UserContext.Provider>
  );
};

function App() {
  return (
    <UserProvider>
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard/*" element={<DashboardWithSidebar />} />
          <Route path="/dsasheets" element={<Dsasheets />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
    </UserProvider>
  );
}

function HomePage() {
  return (
    <div className="homepage">
      <div className="title">CoderEye</div>
      <div className="auth-buttons">
        <button onClick={() => window.location.href = '/login'}>Login</button>
        <button onClick={() => window.location.href = '/signup'}>Sign Up</button>
      </div>
    </div>
  );
}

function DashboardWithSidebar() {
  const [selectedSection, setSelectedSection] = React.useState('dashboard');

  const renderSection = () => {
    switch (selectedSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'profile':
        return <Profile />;
      case 'dsa-sheets':
        return <Dsasheets />;
      case 'seek-friends':
        return <SeekFriends />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar onSelect={setSelectedSection} />
      <div className="main-content">
        {renderSection()}
      </div>
    </div>
  );
}

export default App;
