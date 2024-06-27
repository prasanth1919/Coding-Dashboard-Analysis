import './Dashboard.css'; // Import the CSS file
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import { BarChart, Bar } from 'recharts';
//import { Calendar, Github } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/Select';
import {
  fetchLeetCodeProfile,
  fetchLeetCodeBadges,
  fetchLeetCodeSolvedCount,
  fetchLeetCodeLimitedAcceptedSubmissions,
  fetchLeetCodeCalendar,
  fetchLeetCodeLanguageStats,
  fetchLeetCodeSkillStats,
  fetchLeetCodeFilteredProblems,
  fetchLeetCodeLimitedProblems,
} from '../api/leetcode';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];
export const username = 'vckdinesh63'; // Exporting username
const LeetCodeDashboard = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [profile, setProfile] = useState(null);
  const [badges, setBadges] = useState(null);
  const [solvedCount, setSolvedCount] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [calendar, setCalendar] = useState({});
  const [languageStats, setLanguageStats] = useState([]);
  const [skillStats, setSkillStats] = useState({});
  const [filteredProblems, setFilteredProblems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileData, badgesData, solvedCountData, submissionsData, calendarData, languageStatsData, skillStatsData, problemsData] = await Promise.all([
          fetchLeetCodeProfile(username),
          fetchLeetCodeBadges(username),
          fetchLeetCodeSolvedCount(username),
          fetchLeetCodeLimitedAcceptedSubmissions(username, 20),
          fetchLeetCodeCalendar(username),
          fetchLeetCodeLanguageStats(username),
          fetchLeetCodeSkillStats(username),
          fetchLeetCodeFilteredProblems(''), // Fetch filtered problems initially with empty tags
        ]);

        setProfile(profileData);
        setBadges(badgesData);
        setSolvedCount(solvedCountData);
        setSubmissions(submissionsData.submission);
        setCalendar(JSON.parse(calendarData.submissionCalendar));
        setLanguageStats(languageStatsData.matchedUser.languageProblemCount);
        setSkillStats(skillStatsData.data.matchedUser.tagProblemCounts);
        setFilteredProblems(problemsData.problemsetQuestionList); // Set filtered problems
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const renderProfileSection = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Profile Summary</CardTitle>
        </CardHeader>
        <CardContent>
          {profile && (
            <div className="flex items-center space-x-4">
              <img src={profile.avatar} alt={profile.name} className="w-16 h-16 rounded-full" />
              <div>
                <h3 className="text-lg font-semibold" style={{ color: '#ffffff' }}>{profile.name}</h3>
                <p style={{ color: '#ffffff' }}>Ranking: {profile.ranking}</p>
                <p style={{ color: '#ffffff' }}>Country: {profile.country}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Badges</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {badges && badges.badges.map((badge) => (
              <Badge key={badge.id} variant="secondary" className="flex items-center gap-2">
                <img src={badge.icon} alt={badge.displayName} className="w-4 h-4" style={{ width: '75px', height: '75px' }} />
                {badge.displayName}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderStatisticsSection = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {solvedCount && ['Easy', 'Medium', 'Hard'].map((difficulty) => {
        const count = solvedCount[`${difficulty.toLowerCase()}Solved`];
        const total = solvedCount[`total${difficulty}`];
        return (
          <Card key={difficulty}>
            <CardHeader>
              <CardTitle>{difficulty}</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={(count / total) * 100} max={100} className="w-full" />
              <p className="text-center mt-2">{count} / {total} solved</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );

  const renderSubmissionsSection = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ color: '#ffffff' }}>
      <div className="flex justify-center pl-4">
        <Card>
          <CardHeader>
            <CardTitle>Recent Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Problem</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Language</TableHead>
                  <TableHead>Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.map((submission, index) => (
                  <TableRow key={index}>
                    <TableCell>{submission.title}</TableCell>
                    <TableCell>{submission.statusDisplay}</TableCell>
                    <TableCell>{submission.lang}</TableCell>
                    <TableCell>{new Date(submission.timestamp * 1000).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Submission Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={Object.entries(calendar).map(([date, count]) => ({ date: new Date(parseInt(date) * 1000), count }))}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tickFormatter={(date) => date.toLocaleDateString()} />
              <YAxis />
              <Tooltip labelFormatter={(date) => date.toLocaleDateString()} />
              <Line type="monotone" dataKey="count" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );

  const renderLanguagesSection = () => (
    <Card>
      <CardHeader>
        <CardTitle>Language Usage</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={languageStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="languageName" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="problemsSolved" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );

  const renderSkillsSection = () => {
    const skillLevels = ['fundamental', 'intermediate', 'advanced'];

    return (
      <div id="shri" className="grid grid-cols-1 gap-4">
        {skillLevels.map((level) => (
          <Card key={level}>
            <CardHeader>
              <CardTitle>{level.charAt(0).toUpperCase() + level.slice(1)} Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={skillStats[level]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis width={80}
                    angle={-15}
                    tick={{
                      fontSize: 12,
                      transform: 'rotate(-5)',
                      textAnchor: 'end',
                    }} dataKey="tagName" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} problems`, 'Solved']} />
                  <Legend />
                  <Bar dataKey="problemsSolved" fill="#8884d8" name="Problems Solved" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  const renderFilteredProblemsSection = () => (
    <div style={{ color: '#ffffff' }}>
    <Card>
      <CardHeader>
        <CardTitle style={{ color: 'white' }}>Filtered Problems</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead style={{ color: 'white' }}>Title</TableHead>
              <TableHead style={{ color: 'white' }}>Difficulty</TableHead>
              <TableHead style={{ color: 'white' }}>Tags</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProblems.map((problem) => (
              <TableRow key={problem.questionFrontendId}>
                <TableCell style={{ color: 'white' }}>{problem.title}</TableCell>
                <TableCell style={{ color: 'white' }}>{problem.difficulty}</TableCell>
                <TableCell style={{ color: 'white' }}>{problem.topicTags.map(tag => tag.name).join(', ')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return renderProfileSection();
      case 'statistics':
        return renderStatisticsSection();
      case 'submissions':
        return renderSubmissionsSection();
      case 'languages':
        return renderLanguagesSection();
      case 'skills':
        return renderSkillsSection();
      case 'filtered':
        return renderFilteredProblemsSection();
      default:
        return null;
    }
  };

  return (
    <div className="dashboard">
      <h2>LeetCode Dashboard</h2>
      <div className="mb-4">
        <Button variant={activeSection === 'profile' ? 'default' : 'secondary'} onClick={() => setActiveSection('profile')}>Profile</Button>
        {/*<Button variant={activeSection === 'statistics' ? 'default' : 'secondary'} onClick={() => setActiveSection('statistics')}>Statistics</Button>*/}
        <Button variant={activeSection === 'submissions' ? 'default' : 'secondary'} onClick={() => setActiveSection('submissions')}>Submissions</Button>
        <Button variant={activeSection === 'languages' ? 'default' : 'secondary'} onClick={() => setActiveSection('languages')}>Languages</Button>
        <Button variant={activeSection === 'skills' ? 'default' : 'secondary'} onClick={() => setActiveSection('skills')}>Skills</Button>
        <Button variant={activeSection === 'filtered' ? 'default' : 'secondary'} onClick={() => setActiveSection('filtered')}>Filtered Problems</Button>
      </div>
      {renderContent()}
    </div>
  );
};

export default LeetCodeDashboard;
