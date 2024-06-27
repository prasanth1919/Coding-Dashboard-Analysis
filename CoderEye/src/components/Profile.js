import React, { useState } from 'react';
import './Profile.css';

function Profile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [leetcodeUsername, setLeetCodeUsername] = useState('');
  const [codeforcesUsername, setCodeforcesUsername] = useState('');
  
  const handleUpdate = (e) => {
    e.preventDefault();
    // Implement update logic here
    // You can send the updated profile data to the backend or perform any other necessary actions
  };

  const handleCancel = (e) => {
    e.preventDefault();
    // Implement cancel logic here
    // For example, you can reset the form fields to their initial values
    setName('');
    setEmail('');
    setLeetCodeUsername('');
    setCodeforcesUsername('');
  };

  return (
    <div className="profile-container">
      <div className="profile">
        <h2>Edit Profile</h2>
        <form>
          <label>
            Name:
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
          </label>
          <label>
            Email:
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </label>
          <label>
            LeetCode Username:
            <input 
              type="text" 
              value={leetcodeUsername} 
              onChange={(e) => setLeetCodeUsername(e.target.value)} 
            />
          </label>
          <label>
            Codeforces Username:
            <input 
              type="text" 
              value={codeforcesUsername} 
              onChange={(e) => setCodeforcesUsername(e.target.value)} 
            />
          </label>
          <div className="buttons">
            <button className="update-btn" onClick={handleUpdate}>Update</button>
            <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
