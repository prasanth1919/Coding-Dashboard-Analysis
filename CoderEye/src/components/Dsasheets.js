import React, { useState } from 'react';
import { Card, CardContent, CardHeader, Button, Typography, Grid, Modal, TextField } from '@mui/material';
import './Dsasheets.css'; // Import CSS for custom styling
import View from './View'; // Default view component
import View150 from './View150'; // Import View150 component
import View75 from './View'; // Import View75 component
import Expert from './Expert.js';
import { fetchCodeforcesUserInfo, fetchTopicWise } from '../api/codeforces'; // Import your API functions for Codeforces
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'; // Import recharts components

function Dsasheets() {
  // State for controlling modal visibility and selected sheet data
  const [open, setOpen] = useState(false);
  const [selectedSheet, setSelectedSheet] = useState(null);
  const [username, setUsername] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [topicWiseInfo, setTopicWiseInfo] = useState(null); // State to hold topic-wise information

  // Famous DSA sheets
  const famousDsaSheets = [
    { id: 1, title: 'CodeForces 62', link: 'https://leetcode.com/discuss/general-discussion/460599/LeetCode-75-Must-Do-Questions-for-Interview-Preparation' },
    { id: 2, title: 'A2OJ Ladder(Newbie)', link: 'https://leetcode.com/discuss/general-discussion/460599/LeetCode-150-Weekly-Problems' },
    { id: 3, title: 'Expert Sheet(1700)', link: 'https://example.com/dsa/neocode-150' }
  ];

  // Handler to open the modal
  const handleOpen = (sheet) => {
    setSelectedSheet(sheet);
    setOpen(true);
  };

  // Handler to close the modal
  const handleClose = () => {
    setOpen(false);
    setSelectedSheet(null);
  };

  // Handler for username input change
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!username) {
      alert('Please enter a username');
      return;
    }
    try {
      const user = await fetchCodeforcesUserInfo(username);
      const topicsInfo = await fetchTopicWise(username); // Fetch topic-wise information
      setUserInfo(user);
      setTopicWiseInfo(topicsInfo); // Set topic-wise information in state
    } catch (error) {
      console.error('Error fetching user data:', error);
      alert('Failed to fetch user data. Please check the username and try again.');
      setUserInfo(null);
      setTopicWiseInfo(null); // Clear topic-wise information in case of error
    }
  };

  // Function to render appropriate view based on selected sheet
  const renderView = (sheet) => {
    switch (sheet.title) {
      case 'CodeForces 62':
        return <View75 data={sheet} username={username} />;
      case 'A2OJ Ladder(Newbie)':
        return <View150 data={sheet} username={username} />;
      case 'Expert Sheet(1700)':
        return <Expert data={sheet} username={username} />;
      default:
        return null;
    }
  };

  // Assuming topicWiseInfo is defined somewhere in your code
  


  // Generate pie chart data
  const pieChartData = topicWiseInfo ? Object.entries(topicWiseInfo).map(([key, value], index) => ({
    id: index,
    label: key,
    value: value
  })) : [];
  console.log(pieChartData);
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6384', '#36A2EB', '#FFCE56'];

  return (
    <div className="dsasheets-content">
      <Typography variant="h4" gutterBottom>Data Structures and Algorithms Sheets</Typography>

      {/* Form to enter username */}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} alignItems="center" justifyContent="center" style={{ color: '#ffffff' }}>
          <Grid item xs={12} sm={8} md={6}>
            <TextField
              fullWidth
              label="Enter Codeforces Username"
              variant="outlined"
              value={username}
              onChange={handleUsernameChange}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
            >
              Fetch Data
            </Button>
          </Grid>
        </Grid>
      </form>
      
      {/* Display user info if available */}
      {userInfo && (
        <div className="user-info" style={{ color: '#ffffff' }}>
          <Typography variant="h6" gutterBottom>User Information</Typography>
          <Typography variant="body1"><strong>Handle:</strong> {userInfo.handle}</Typography>
          <Typography variant="body1"><strong>Name:</strong> {userInfo.name}</Typography>
          <Typography variant="body1"><strong>Rating:</strong> {userInfo.rating}</Typography>
          <Typography variant="body1"><strong>Country:</strong> {userInfo.country}</Typography>
        </div>
      )}

      

      <Grid container spacing={3}>
        {famousDsaSheets.map(sheet => (
          <Grid item xs={12} sm={6} md={4} key={sheet.id} >
            <Card elevation={3} className="dsasheets-card" style={{ backgroundColor: '#ccc', color: '#333' }}>
              <CardHeader title={sheet.title} />
              <CardContent>
                <Button variant="contained" color="primary" onClick={() => handleOpen(sheet)}>
                  View Detailed Analysis
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal for detailed analysis */}
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          maxHeight: '80vh',
          overflowY: 'auto', // Add scrolling for overflow
          backgroundColor: 'white',
          boxShadow: 24,
          padding: '20px',
          borderRadius: '8px'
        }}>
          {selectedSheet && renderView(selectedSheet)}
        </div>
      </Modal>
        
    </div>
  );
}

export default Dsasheets;
