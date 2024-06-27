import React, { useEffect, useState } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Checkbox } from '@mui/material';
import { fetchSubmittedProblems } from '../api/codeforces'; // Adjust the path according to your project structure
import { username } from './Dashboard'; // Adjust the path according to your project structure

const cp93 = [
  { id: 1, title: 'Forked!', link: 'https://codeforces.com/problemset/problem/1428/A' },
  { id: 2, title: 'Chemistry', link: 'https://codeforces.com/problemset/problem/1430/A' },
  { id: 3, title: 'Vasilije in Cacak', link: 'https://codeforces.com/problemset/problem/1433/A' },
  { id: 4, title: 'Jellyfish and Undertale', link: 'https://codeforces.com/problemset/problem/1413/A' },
  { id: 5, title: 'Make It Zero', link: 'https://codeforces.com/problemset/problem/1430/B' },
  { id: 6, title: "Longest Divisors Interval", link: 'https://codeforces.com/problemset/problem/1475/A' },
  { id: 7, title: 'Balanced Round', link: 'https://codeforces.com/problemset/problem/1237/A' },
  { id: 8, title: 'Comparison String', link: 'https://codeforces.com/problemset/problem/1401/A' },
  { id: 9, title: 'Permutation Swap', link: 'https://codeforces.com/problemset/problem/1525/A' },
  { id: 10, title: 'Odd Queries', link: 'https://codeforces.com/problemset/problem/1418/A' },
  { id: 11, title: 'Not Dividing', link: 'https://codeforces.com/problemset/problem/1534/A' },
  { id: 12, title: 'Mainak and Array', link: 'https://codeforces.com/problemset/problem/1428/B' },
  { id: 13, title: 'NIT Destroys the Universe', link: 'https://codeforces.com/problemset/problem/1400/A' },
  { id: 14, title: 'AvtoBus', link: 'https://codeforces.com/problemset/problem/1166/A' },
  { id: 15, title: 'Make It Increasing', link: 'https://codeforces.com/problemset/problem/1437/A' },
  { id: 16, title: 'Deletive Editing', link: 'https://codeforces.com/problemset/problem/1400/B' },
  { id: 17, title: 'Array Cloning Technique', link: 'https://codeforces.com/problemset/problem/1409/A' },
  { id: 18, title: 'Make AP', link: 'https://codeforces.com/problemset/problem/1408/A' },
  { id: 19, title: 'Odd Grasshopper', link: 'https://codeforces.com/problemset/problem/1419/A' },
  { id: 20, title: 'AB Balance', link: 'https://codeforces.com/problemset/problem/1418/B' },
  { id: 21, title: 'Make it Divisible by 25', link: 'https://codeforces.com/problemset/problem/1362/B' },
  { id: 22, title: 'Luntik and Subsequences', link: 'https://codeforces.com/problemset/problem/1433/B' },
  { id: 23, title: 'Mocha and Math', link: 'https://codeforces.com/problemset/problem/1559/A' },
  { id: 24, title: 'Exciting Bets', link: 'https://codeforces.com/problemset/problem/1418/C' },
  { id: 25, title: 'Bad Boy', link: 'https://codeforces.com/problemset/problem/1537/A' },
  { id: 26, title: 'Odd Divisor', link: 'https://codeforces.com/problemset/problem/1475/B' },
  { id: 27, title: 'Strange Partition', link: 'https://codeforces.com/problemset/problem/1471/A' },
  { id: 28, title: 'Sum of Medians', link: 'https://codeforces.com/problemset/problem/1527/A' },
  { id: 29, title: 'Three Indices', link: 'https://codeforces.com/problemset/problem/1380/B' },
  { id: 30, title: '01 Game', link: 'https://codeforces.com/problemset/problem/1373/A' },
  { id: 31, title: 'Multiply by 2, divide by 6', link: 'https://codeforces.com/problemset/problem/1374/B' },
  { id: 32, title: 'Halloumi Boxes', link: 'https://codeforces.com/problemset/problem/1494/A' },
  { id: 33, title: 'Line Trip', link: 'https://codeforces.com/problemset/problem/1506/A' },
  { id: 34, title: 'Cover in Water', link: 'https://codeforces.com/problemset/problem/1339/A' },
  { id: 35, title: 'Game with Integers', link: 'https://codeforces.com/problemset/problem/1397/A' },
  { id: 36, title: 'Jagged Swaps', link: 'https://codeforces.com/problemset/problem/1506/B' },
  { id: 37, title: "Doremy's Paint 3", link: 'https://codeforces.com/problemset/problem/1496/A' },
  { id: 38, title: "Don't Try to Count", link: 'https://codeforces.com/problemset/problem/1285/A' },
  { id: 39, title: 'How Much Does Daytona Cost?', link: 'https://codeforces.com/problemset/problem/1447/A' },
  { id: 40, title: 'Goals of Victory', link: 'https://codeforces.com/problemset/problem/1506/C' },
  { id: 41, title: 'Target Practice', link: 'https://codeforces.com/problemset/problem/1256/A' },
  { id: 42, title: 'Ambitious Kid', link: 'https://codeforces.com/problemset/problem/1501/A' },
  { id: 43, title: 'Sequence Game', link: 'https://codeforces.com/problemset/problem/1490/A' },
  { id: 44, title: 'United We Stand', link: 'https://codeforces.com/problemset/problem/1506/D' },
  { id: 45, title: 'Buttons', link: 'https://codeforces.com/problemset/problem/1408/B' },
  { id: 46, title: 'Array Coloring', link: 'https://codeforces.com/problemset/problem/1512/B' },
  { id: 47, title: 'Desorting', link: 'https://codeforces.com/problemset/problem/1512/C' },
  { id: 48, title: 'Forbidden Integer', link: 'https://codeforces.com/problemset/problem/1529/A' },
  { id: 49, title: 'Grasshopper on a Line', link: 'https://codeforces.com/problemset/problem/1430/C' },
  { id: 50, title: 'Unit Array', link: 'https://codeforces.com/problemset/problem/1241/A' },
  { id: 51, title: 'Twin Permutations', link: 'https://codeforces.com/problemset/problem/1502/A' },
  { id: 52, title: 'Blank Space', link: 'https://codeforces.com/problemset/problem/1419/B' },
  { id: 53, title: 'Coins', link: 'https://codeforces.com/problemset/problem/1516/A' },
  { id: 54, title: 'Walking Master', link: 'https://codeforces.com/problemset/problem/1506/D' },
  { id: 55, title: 'We Need the Zero', link: 'https://codeforces.com/problemset/problem/1512/D' },
  { id: 56, title: 'Prepend and Append', link: 'https://codeforces.com/problemset/problem/1418/C' },
  { id: 57, title: "Serval and Mocha's Array", link: 'https://codeforces.com/problemset/problem/1157/C' },
  { id: 58, title: 'One and Two', link: 'https://codeforces.com/problemset/problem/1332/B' },
  { id: 59, title: 'Make it Beautiful', link: 'https://codeforces.com/problemset/problem/1301/C' },
  { id: 60, title: 'Everybody Likes Good Arrays!', link: 'https://codeforces.com/problemset/problem/1506/E' },
  { id: 61, title: 'Extremely Round', link: 'https://codeforces.com/problemset/problem/1374/A' },
  { id: 62, title: 'Two Permutations', link: 'https://codeforces.com/problemset/problem/1440/A' },
];

function View({ data, username }) {
  const [solvedProblems, setSolvedProblems] = useState([]);

  useEffect(() => {
    const checkSubmittedProblems = async () => {
      try {
        const submittedProblems = await fetchSubmittedProblems(username);
        const matchingProblems = cp93.filter(problem => 
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
      <Typography variant="h4">{data.title}</Typography>
      <Typography variant="body1">
        This is the detailed analysis for {data.title}.
      </Typography>
      <Typography variant="body2" style={{ marginTop: '10px', marginBottom: '10px' }}>
        Total Problems Solved: {solvedProblems.length}
      </Typography>
      <Typography variant="h6" style={{ marginTop: '20px' }}>Codeforces Problem Set</Typography>
      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table style={{ backgroundColor: '#ccc' }}>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Problem Title</TableCell>
              <TableCell>Link</TableCell>
              <TableCell>Solved</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {cp93.map((problem) => (
            <TableRow 
              key={problem.id}
              style={{
                backgroundColor: solvedProblems.includes(problem.id) ? 'lightgreen' : 'white'
              }}
            >
              <TableCell>{problem.id}</TableCell>
              <TableCell>{problem.title}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  href={problem.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Solve Problem
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
}

export default View;
