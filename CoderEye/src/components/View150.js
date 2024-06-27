import React, { useEffect, useState } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Checkbox } from '@mui/material';
import { fetchSubmittedProblems } from '../api/codeforces'; // Adjust the path according to your project structure
//import { username } from './Dashboard'; // Adjust the path according to your project structure

const a2ojNewBie = [
  { id: 1, title: 'Watermelon', link: 'https://codeforces.com/problemset/problem/4/A' },
  { id: 2, title: 'Way Too Long Words', link: 'https://codeforces.com/problemset/problem/71/A' },
  { id: 3, title: 'Domino piling', link: 'https://codeforces.com/problemset/problem/50/A' },
  { id: 4, title: 'Theatre Square', link: 'https://codeforces.com/problemset/problem/1/A' },
  { id: 5, title: 'Next Round', link: 'https://codeforces.com/problemset/problem/158/A' },
  { id: 6, title: 'Team', link: 'https://codeforces.com/problemset/problem/231/A' },
  { id: 7, title: 'Bit++', link: 'https://codeforces.com/problemset/problem/282/A' },
  { id: 8, title: 'Petya and Strings', link: 'https://codeforces.com/problemset/problem/112/A' },
  { id: 9, title: 'Die Roll', link: 'https://codeforces.com/problemset/problem/9/A' },
  { id: 10, title: 'Beautiful Matrix', link: 'https://codeforces.com/problemset/problem/263/A' },
  { id: 11, title: 'Even Odds', link: 'https://codeforces.com/problemset/problem/318/A' },
  { id: 12, title: 'Bit++', link: 'https://codeforces.com/problemset/problem/282/A' },
  { id: 13, title: 'Way Too Long Words', link: 'https://codeforces.com/problemset/problem/71/A' },
  { id: 14, title: 'Beautiful Matrix', link: 'https://codeforces.com/problemset/problem/263/A' },
  { id: 15, title: 'Bit++', link: 'https://codeforces.com/problemset/problem/282/A' },
  { id: 16, title: 'Way Too Long Words', link: 'https://codeforces.com/problemset/problem/71/A' },
  { id: 17, title: 'Beautiful Matrix', link: 'https://codeforces.com/problemset/problem/263/A' },
  { id: 18, title: 'Bit++', link: 'https://codeforces.com/problemset/problem/282/A' },
  { id: 19, title: 'Way Too Long Words', link: 'https://codeforces.com/problemset/problem/71/A' },
  { id: 20, title: 'Beautiful Matrix', link: 'https://codeforces.com/problemset/problem/263/A' },
  { id: 21, title: 'Bit++', link: 'https://codeforces.com/problemset/problem/282/A' },
  { id: 22, title: 'Way Too Long Words', link: 'https://codeforces.com/problemset/problem/71/A' },
  { id: 23, title: 'Beautiful Matrix', link: 'https://codeforces.com/problemset/problem/263/A' },
  { id: 24, title: 'Bit++', link: 'https://codeforces.com/problemset/problem/282/A' },
  { id: 25, title: 'Way Too Long Words', link: 'https://codeforces.com/problemset/problem/71/A' },
  { id: 26, title: 'Beautiful Matrix', link: 'https://codeforces.com/problemset/problem/263/A' },
  { id: 27, title: 'Bit++', link: 'https://codeforces.com/problemset/problem/282/A' },
  { id: 28, title: 'Way Too Long Words', link: 'https://codeforces.com/problemset/problem/71/A' },
  { id: 29, title: 'Beautiful Matrix', link: 'https://codeforces.com/problemset/problem/263/A' },
  { id: 30, title: 'Bit++', link: 'https://codeforces.com/problemset/problem/282/A' },
  { id: 31, title: 'Way Too Long Words', link: 'https://codeforces.com/problemset/problem/71/A' },
  { id: 32, title: 'Beautiful Matrix', link: 'https://codeforces.com/problemset/problem/263/A' },
  { id: 33, title: 'Bit++', link: 'https://codeforces.com/problemset/problem/282/A' },
  { id: 34, title: 'Way Too Long Words', link: 'https://codeforces.com/problemset/problem/71/A' },
  { id: 35, title: 'Beautiful Matrix', link: 'https://codeforces.com/problemset/problem/263/A' },
  { id: 36, title: 'Bit++', link: 'https://codeforces.com/problemset/problem/282/A' },
  { id: 37, title: 'Way Too Long Words', link: 'https://codeforces.com/problemset/problem/71/A' },
  { id: 38, title: 'Beautiful Matrix', link: 'https://codeforces.com/problemset/problem/263/A' },
  { id: 39, title: 'Bit++', link: 'https://codeforces.com/problemset/problem/282/A' },
  { id: 40, title: 'Way Too Long Words', link: 'https://codeforces.com/problemset/problem/71/A' },
  { id: 41, title: 'Beautiful Matrix', link: 'https://codeforces.com/problemset/problem/263/A' },
  { id: 42, title: 'Bit++', link: 'https://codeforces.com/problemset/problem/282/A' },
  { id: 43, title: 'Way Too Long Words', link: 'https://codeforces.com/problemset/problem/71/A' },
  { id: 44, title: 'Beautiful Matrix', link: 'https://codeforces.com/problemset/problem/263/A' },
  { id: 45, title: 'Bit++', link: 'https://codeforces.com/problemset/problem/282/A' },
  { id: 46, title: 'Way Too Long Words', link: 'https://codeforces.com/problemset/problem/71/A' },
  { id: 47, title: 'Beautiful Matrix', link: 'https://codeforces.com/problemset/problem/263/A' },
  { id: 48, title: 'Bit++', link: 'https://codeforces.com/problemset/problem/282/A' },
  { id: 49, title: 'Way Too Long Words', link: 'https://codeforces.com/problemset/problem/71/A' },
  { id: 50, title: 'Beautiful Matrix', link: 'https://codeforces.com/problemset/problem/263/A' },
  { id: 51, title: 'Bit++', link: 'https://codeforces.com/problemset/problem/282/A' },
  { id: 52, title: 'Way Too Long Words', link: 'https://codeforces.com/problemset/problem/71/A' },
  { id: 53, title: 'Beautiful Matrix', link: 'https://codeforces.com/problemset/problem/263/A' },
  { id: 54, title: 'Bit++', link: 'https://codeforces.com/problemset/problem/282/A' },
  { id: 55, title: 'Way Too Long Words', link: 'https://codeforces.com/problemset/problem/71/A' },
  { id: 56, title: 'Beautiful Matrix', link: 'https://codeforces.com/problemset/problem/263/A' },
  { id: 57, title: 'Bit++', link: 'https://codeforces.com/problemset/problem/282/A' },
  { id: 58, title: 'Way Too Long Words', link: 'https://codeforces.com/problemset/problem/71/A' },
  { id: 59, title: 'Beautiful Matrix', link: 'https://codeforces.com/problemset/problem/263/A' },
  { id: 60, title: 'Bit++', link: 'https://codeforces.com/problemset/problem/282/A' },
  { id: 61, title: 'Way Too Long Words', link: 'https://codeforces.com/problemset/problem/71/A' },
  { id: 62, title: 'Beautiful Matrix', link: 'https://codeforces.com/problemset/problem/263/A' },
  { id: 63, title: 'Bit++', link: 'https://codeforces.com/problemset/problem/282/A' },
  { id: 64, title: 'Way Too Long Words', link: 'https://codeforces.com/problemset/problem/71/A' },
  { id: 65, title: 'Beautiful Matrix', link: 'https://codeforces.com/problemset/problem/263/A' },
  { id: 66, title: 'Bit++', link: 'https://codeforces.com/problemset/problem/282/A' },
  { id: 67, title: 'Way Too Long Words', link: 'https://codeforces.com/problemset/problem/71/A' },
  { id: 68, title: 'Beautiful Matrix', link: 'https://codeforces.com/problemset/problem/263/A' },
  { id: 69, title: 'Bit++', link: 'https://codeforces.com/problemset/problem/282/A' },
  { id: 70, title: 'Way Too Long Words', link: 'https://codeforces.com/problemset/problem/71/A' },
  { id: 71, title: 'Beautiful Matrix', link: 'https://codeforces.com/problemset/problem/263/A' },
  { id: 72, title: 'Bit++', link: 'https://codeforces.com/problemset/problem/282/A' },
  { id: 73, title: 'Way Too Long Words', link: 'https://codeforces.com/problemset/problem/71/A' },
  { id: 74, title: 'Beautiful Matrix', link: 'https://codeforces.com/problemset/problem/263/A' },
  { id: 75, title: 'Bit++', link: 'https://codeforces.com/problemset/problem/282/A' },
  { id: 76, title: 'Way Too Long Words', link: 'https://codeforces.com/problemset/problem/71/A' },
  { id: 77, title: 'Beautiful Matrix', link: 'https://codeforces.com/problemset/problem/263/A' },
  { id: 78, title: 'Bit++', link: 'https://codeforces.com/problemset/problem/282/A' },
  { id: 79, title: 'Way Too Long Words', link: 'https://codeforces.com/problemset/problem/71/A' },
  { id: 80, title: 'Beautiful Matrix', link: 'https://codeforces.com/problemset/problem/263/A' },
  { id: 81, title: 'Bit++', link: 'https://codeforces.com/problemset/problem/282/A' },
  { id: 82, title: 'Way Too Long Words', link: 'https://codeforces.com/problemset/problem/71/A' },
  { id: 83, title: 'Beautiful Matrix', link: 'https://codeforces.com/problemset/problem/263/A' },
  { id: 84, title: 'Bit++', link: 'https://codeforces.com/problemset/problem/282/A' },
  { id: 85, title: 'Way Too Long Words', link: 'https://codeforces.com/problemset/problem/71/A' },
  { id: 86, title: 'Beautiful Matrix', link: 'https://codeforces.com/problemset/problem/263/A' },
  { id: 87, title: 'Bit++', link: 'https://codeforces.com/problemset/problem/282/A' },
  { id: 88, title: 'Way Too Long Words', link: 'https://codeforces.com/problemset/problem/71/A' },
  { id: 89, title: 'Beautiful Matrix', link: 'https://codeforces.com/problemset/problem/263/A' },
  { id: 90, title: 'Bit++', link: 'https://codeforces.com/problemset/problem/282/A' },
  { id: 91, title: 'Way Too Long Words', link: 'https://codeforces.com/problemset/problem/71/A' },
  { id: 92, title: 'Beautiful Matrix', link: 'https://codeforces.com/problemset/problem/263/A' },
  { id: 93, title: 'Bit++', link: 'https://codeforces.com/problemset/problem/282/A' },
  { id: 94, title: 'Way Too Long Words', link: 'https://codeforces.com/problemset/problem/71/A' },
  { id: 95, title: 'Beautiful Matrix', link: 'https://codeforces.com/problemset/problem/263/A' },
  { id: 96, title: 'Bit++', link: 'https://codeforces.com/problemset/problem/282/A' },
  { id: 97, title: 'Way Too Long Words', link: 'https://codeforces.com/problemset/problem/71/A' },
  { id: 98, title: 'Beautiful Matrix', link: 'https://codeforces.com/problemset/problem/263/A' },
  { id: 99, title: 'Bit++', link: 'https://codeforces.com/problemset/problem/282/A' },
  { id: 100, title: 'Way Too Long Words', link: 'https://codeforces.com/problemset/problem/71/A' }
];



const problems = [...a2ojNewBie]; // Combine both lists

const ProblemTable = ({username}) => {
  const [solvedProblems, setSolvedProblems] = useState([]);

  useEffect(() => {
    const checkSubmittedProblems = async () => {
      try {
        const submittedProblems = await fetchSubmittedProblems(username); // Assuming fetchSubmittedProblems retrieves the list of solved problems
        const matchingProblems = a2ojNewBie.filter(problem => 
          submittedProblems.includes(problem.title)
        ).map(problem => problem.id);
        setSolvedProblems(matchingProblems);
      } catch (error) {
        console.error('Error fetching submitted problems:', error);
      }
    };
    checkSubmittedProblems();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        A2OJ Ladder sheet
      </Typography>
      <Typography variant="body1">
        This is the detailed analysis for A2OJ ladder.
      </Typography>
      <Typography variant="body2" style={{ marginTop: '10px', marginBottom: '10px' }}>
        Total Problems Solved: {solvedProblems.length}
      </Typography>
      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Link</TableCell>
              <TableCell>Solved</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {a2ojNewBie.map((problem) => (
              <TableRow 
                key={problem.id}
                style={{
                  backgroundColor: solvedProblems.includes(problem.id) ? 'lightgreen' : 'white'
                }}
              >
                <TableCell>{problem.id}</TableCell>
                <TableCell>{problem.title}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" href={problem.link} target="_blank">
                    Link
                  </Button>
                </TableCell>
                <TableCell>
                  <Checkbox
                    checked={solvedProblems.includes(problem.id)}
                    style={{
                      color: solvedProblems.includes(problem.id) ? 'green' : 'red',
                    }}
                    disabled
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ProblemTable;