import React, { useState, useEffect } from 'react';
import {
  fetchLeetCodeProfile,
  fetchLeetCodeSolvedCount,
  fetchLeetCodeContestHistory,
  fetchLeetCodeFullProfile
} from '../api/leetcode';
import {
  fetchCodeforcesUserInfo,
  fetchCodeforcesSolvedProblemsCount
} from '../api/codeforces';
import CircularProgressChart from './CircularProgressChart';
import {
  Button,
  CircularProgress,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  Paper,
  Container,
  Avatar,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50'];

function SeekFriends() {
  const [username, setUsername] = useState('');
  const [platform, setPlatform] = useState('leetcode');
  const [profileData, setProfileData] = useState(null);
  const [solvedProblemsData, setSolvedProblemsData] = useState(null);
  const [contestsData, setContestsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [totalSubmissionNumData, setTotalSubmissionNumData] = useState([]);

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError('');
      console.log(`Fetching data for username: ${username} on platform: ${platform}`);

      let fetchedProfileData, fetchedSolvedProblemsData, fetchedContestsData, fetchedTotalSubmissionNumData;

      if (platform === 'leetcode') {
        fetchedProfileData = await fetchLeetCodeProfile(username);
        fetchedSolvedProblemsData = await fetchLeetCodeSolvedCount(username);
        fetchedContestsData = await fetchLeetCodeContestHistory(username);
        const fullProfileData = await fetchLeetCodeFullProfile(username);
        fetchedTotalSubmissionNumData = fullProfileData.totalSubmissions || [];
      } else if (platform === 'codeforces') {
        const userInfoData = await fetchCodeforcesUserInfo(username);
        fetchedProfileData = userInfoData;
        fetchedSolvedProblemsData = await fetchCodeforcesSolvedProblemsCount(username);
      }

      setProfileData(fetchedProfileData);
      setSolvedProblemsData(fetchedSolvedProblemsData);
      setContestsData(fetchedContestsData || []);
      setTotalSubmissionNumData(fetchedTotalSubmissionNumData || []);
    } catch (error) {
      setError('Failed to fetch data. Please try again.');
      console.error('Error during handleSearch:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderProfile = () => {
    if (!profileData) return null;

    const formatSubmissionData = (data) => {
      return data.map(item => ({
        name: item.difficulty,
        submissions: item.count
      }));
    };

    return (
      <Card elevation={3} sx={{ mt: 4, width: '100%', maxWidth: 800 }}>
        <CardContent>
          <Grid container spacing={3}>
            {/* Profile Info Section */}
            <Grid item xs={12}>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Avatar
                    src={profileData.avatar}
                    alt={profileData.name}
                    sx={{ width: 100, height: 100 }}
                  />
                </Grid>
                <Grid item xs>
                  <Typography variant="h5">{profileData.name}</Typography>
                  <Typography variant="subtitle1">@{profileData.handle || profileData.username}</Typography>
                  <Typography variant="body2">Country: {profileData.country}</Typography>
                  {platform === 'codeforces' && (
                    <Typography variant="body2">Rating: {profileData.rating}</Typography>
                  )}
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}><Divider /></Grid>

            {/* Solved Problems Section */}
            {platform === 'leetcode' && solvedProblemsData && (
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>Solved Problems</Typography>
                <CircularProgressChart
                  percentages={[
                    solvedProblemsData.easySolved,
                    solvedProblemsData.mediumSolved,
                    solvedProblemsData.hardSolved
                  ]}
                />
                <List dense>
                  <ListItem>
                    <ListItemText primary="Total Solved" secondary={solvedProblemsData.solvedProblem} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Easy" secondary={solvedProblemsData.easySolved} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Medium" secondary={solvedProblemsData.mediumSolved} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Hard" secondary={solvedProblemsData.hardSolved} />
                  </ListItem>
                </List>
              </Grid>
            )}

{platform === 'codeforces' && (
  <Grid item xs={12} md={6}>
    <Typography variant="h6" gutterBottom>Solved Problems</Typography>
    <Typography variant="h4" align="center">{solvedProblemsData}</Typography>
  </Grid>
)}

{/* Submissions Bar Chart Section */}
{platform === 'leetcode' && totalSubmissionNumData.length > 0 && (
  <Grid item xs={12} md={6}>
    <Typography variant="h6" gutterBottom>Submissions by Difficulty</Typography>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={formatSubmissionData(totalSubmissionNumData)}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="submissions" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  </Grid>
)}

<Grid item xs={12}><Divider /></Grid>

{/* Contests Section */}
<Grid item xs={12}>
  <Typography variant="h6" gutterBottom>Recent Contests</Typography>
  {Array.isArray(contestsData) && contestsData.length > 0 ? (
    <List>
      {contestsData.slice(0, 5).map((contest, index) => (
        <React.Fragment key={index}>
          <ListItem>
            <ListItemText
              primary={contest.contest.title}
              secondary={`Rank: ${contest.ranking} - Rating: ${contest.rating}`}
            />
          </ListItem>
          {index < 4 && <Divider />}
        </React.Fragment>
      ))}
    </List>
  ) : (
    <Typography variant="body2">No contests data available</Typography>
  )}
</Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Seek Friends</Typography>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <Select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              fullWidth
            >
              <MenuItem value="leetcode">LeetCode</MenuItem>
              <MenuItem value="codeforces">Codeforces</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button
              variant="contained"
              onClick={handleSearch}
              disabled={loading}
              fullWidth
            >
              {loading ? <CircularProgress size={24} /> : 'Search'}
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {error && (
        <Typography color="error" sx={{ mt: 2, mb: 2 }}>
          {error}
        </Typography>
      )}

      {profileData && renderProfile()}
    </Container>
  );
}

export default SeekFriends;