import React from 'react';
import './sidebar.css';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ onSelect }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="custom-sidebar">
      <nav>
        <ul>
          <li><button className="custom-sidebar-button" onClick={() => onSelect('dashboard')}>Dashboard</button></li>
          <li><button className="custom-sidebar-button" onClick={() => onSelect('profile')}>Profile</button></li>
          <li><button className="custom-sidebar-button" onClick={() => onSelect('dsa-sheets')}>DSA Sheets</button></li>
          <li><button className="custom-sidebar-button" onClick={() => onSelect('seek-friends')}>Seek Friends</button></li>
        </ul>
      </nav>
      <button className="custom-logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Sidebar;
