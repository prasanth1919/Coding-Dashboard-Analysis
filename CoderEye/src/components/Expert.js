import React, { useEffect, useState } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Checkbox } from '@mui/material';
import { fetchSubmittedProblems } from '../api/codeforces'; // Adjust the path according to your project structure
import { username } from './Dashboard'; // Adjust the path according to your project structure

// Expert level problems list with id, title, and link
const expert = [
  { id: 1, title: 'Candy Bags', link: 'https://codeforces.com/problemset/problem/1' },
  { id: 2, title: 'Word', link: 'https://codeforces.com/problemset/problem/2' },
  { id: 3, title: 'Dreamoon and Stairs', link: 'https://codeforces.com/problemset/problem/476/A' },
  { id: 4, title: 'Cut Ribbon', link: 'https://codeforces.com/problemset/problem/189/A' },
  { id: 5, title: 'T-primes', link: 'https://codeforces.com/problemset/problem/230/B' },
  { id: 6, title: 'Ice Skating', link: 'https://codeforces.com/problemset/problem/218/B' },
  { id: 7, title: 'Little Elephant and Bits', link: 'https://codeforces.com/problemset/problem/258/B' },
  { id: 8, title: 'Dreamoon and WiFi', link: 'https://codeforces.com/problemset/problem/476/B' },
  { id: 9, title: 'Party', link: 'https://codeforces.com/problemset/problem/115/A' },
  { id: 10, title: 'Greg and Array', link: 'https://codeforces.com/problemset/problem/295/A' },
  { id: 11, title: 'Table Decorations', link: 'https://codeforces.com/problemset/problem/478/B' },
  { id: 12, title: 'Checkposts', link: 'https://codeforces.com/problemset/problem/427/C' },
  { id: 13, title: 'Valera and Elections', link: 'https://codeforces.com/problemset/problem/369/C' },
  { id: 14, title: 'Psychos in a Line', link: 'https://codeforces.com/problemset/problem/319/A' },
  { id: 15, title: 'Counting Rectangles is Fun', link: 'https://codeforces.com/problemset/problem/372/C' },
  { id: 16, title: 'Greg and Graph', link: 'https://codeforces.com/problemset/problem/295/C' },
  { id: 17, title: 'Little Girl and Maximum Sum', link: 'https://codeforces.com/problemset/problem/276/C' },
  { id: 18, title: 'Renting Bikes', link: 'https://codeforces.com/problemset/problem/363/B' },
  { id: 19, title: 'Treasure', link: 'https://codeforces.com/problemset/problem/494/C' },
  { id: 20, title: 'DZY Loves Sequences', link: 'https://codeforces.com/problemset/problem/446/C' },
  { id: 21, title: 'Color the Fence', link: 'https://codeforces.com/problemset/problem/349/C' },
  { id: 22, title: 'Colorful Graph', link: 'https://codeforces.com/problemset/problem/246/C' },
  { id: 23, title: 'Zero Tree', link: 'https://codeforces.com/problemset/problem/274/C' },
  { id: 24, title: 'King\'s Path', link: 'https://codeforces.com/problemset/problem/242/C' },
  { id: 25, title: 'Interesting Array', link: 'https://codeforces.com/problemset/problem/482/B' },
  { id: 26, title: 'Greenhouse Effect', link: 'https://codeforces.com/problemset/problem/444/B' },
  { id: 27, title: 'The Brand New Function', link: 'https://codeforces.com/problemset/problem/243/C' },
  { id: 28, title: 'Caesar\'s Legions', link: 'https://codeforces.com/problemset/problem/118/D' },
  { id: 29, title: 'Dima and Hares', link: 'https://codeforces.com/problemset/problem/366/C' },
  { id: 30, title: 'Almost Arithmetical Progression', link: 'https://codeforces.com/problemset/problem/572/C' },
  { id: 31, title: 'Hamburgers', link: 'https://codeforces.com/problemset/problem/371/C' },
  { id: 32, title: 'Petya and Divisors', link: 'https://codeforces.com/problemset/problem/239/C' },
  { id: 33, title: 'Matrix', link: 'https://codeforces.com/problemset/problem/364/C' },
  { id: 34, title: 'Xenia and Weights', link: 'https://codeforces.com/problemset/problem/339/C' },
  { id: 35, title: 'Barcode', link: 'https://codeforces.com/problemset/problem/225/C' },
  { id: 36, title: 'Color Stripe', link: 'https://codeforces.com/problemset/problem/219/C' },
  { id: 37, title: 'Xenia and Bit Operations', link: 'https://codeforces.com/problemset/problem/342/C' },
  { id: 38, title: 'Ciel and Robot', link: 'https://codeforces.com/problemset/problem/321/C' },
  { id: 39, title: 'Little Elephant and Interval', link: 'https://codeforces.com/problemset/problem/205/C' },
  { id: 40, title: 'Little Elephant and Cards', link: 'https://codeforces.com/problemset/problem/251/C' },
  { id: 41, title: 'Good Sequences', link: 'https://codeforces.com/problemset/problem/264/C' },
  { id: 42, title: 'k-Tree', link: 'https://codeforces.com/problemset/problem/431/C' },
  { id: 43, title: 'Mike and Feet', link: 'https://codeforces.com/problemset/problem/547/C' },
  { id: 44, title: 'Andrey and Problem', link: 'https://codeforces.com/problemset/problem/467/C' },
  { id: 45, title: 'Maximum Submatrix 2', link: 'https://codeforces.com/problemset/problem/375/C' },
  { id: 46, title: 'Password', link: 'https://codeforces.com/problemset/problem/126/C' },
  { id: 47, title: 'Good Substrings', link: 'https://codeforces.com/problemset/problem/271/C' },
  { id: 48, title: 'GukiZ hates Boxes', link: 'https://codeforces.com/problemset/problem/551/C' },
  { id: 49, title: 'Regular Bridge', link: 'https://codeforces.com/problemset/problem/289/C' },
  { id: 50, title: 'MUH and Cube Walls', link: 'https://codeforces.com/problemset/problem/471/C' },
  { id: 51, title: 'Little Pony and Harmony Chest', link: 'https://codeforces.com/problemset/problem/453/C' },
  { id: 52, title: 'Sereja and Brackets', link: 'https://codeforces.com/problemset/problem/380/C' },
  { id: 53, title: 'Obsessive String', link: 'https://codeforces.com/problemset/problem/494/C' },
  { id: 54, title: 'Gargari and Bishops', link: 'https://codeforces.com/problemset/problem/463/C' },
  { id: 55, title: 'Appleman and Tree', link: 'https://codeforces.com/problemset/problem/463/C' },
  { id: 56, title: 'Soldier and Number Game', link: 'https://codeforces.com/problemset/problem/546/C' },
  { id: 57, title: 'Lucky Tree', link: 'https://codeforces.com/problemset/problem/110/C' },
  { id: 58, title: 'Missile Silos', link: 'https://codeforces.com/problemset/problem/144/C' },
  { id: 59, title: 'Sereja and the Arrangement of Numbers', link: 'https://codeforces.com/problemset/problem/368/C' },
  { id: 60, title: 'Enemy is weak', link: 'https://codeforces.com/problemset/problem/61/C' },
  { id: 61, title: 'A and B and Interesting Substrings', link: 'https://codeforces.com/problemset/problem/519/C' },
  { id: 62, title: 'Equivalent Strings', link: 'https://codeforces.com/problemset/problem/560/C' },
  { id: 63, title: 'Book Reading', link: 'https://codeforces.com/problemset/problem/578/C' },
  { id: 64, title: 'Removing Columns', link: 'https://codeforces.com/problemset/problem/496/C' },
  { id: 65, title: 'Dima and Salad', link: 'https://codeforces.com/problemset/problem/366/C' },
  { id: 66, title: 'Palindromic Characteristics', link: 'https://codeforces.com/problemset/problem/420/C' },
  { id: 67, title: 'Reberland Linguistics', link: 'https://codeforces.com/problemset/problem/463/C' },
  { id: 68, title: 'Schedule', link: 'https://codeforces.com/problemset/problem/31/C' },
  { id: 69, title: 'Weather', link: 'https://codeforces.com/problemset/problem/1/C' },
  { id: 70, title: 'Ksusha and Array', link: 'https://codeforces.com/problemset/problem/319/C' },
  { id: 71, title: 'Playing Piano', link: 'https://codeforces.com/problemset/problem/81/C' },
  { id: 72, title: 'The table', link: 'https://codeforces.com/problemset/problem/302/C' },
  { id: 73, title: 'The Football Season', link: 'https://codeforces.com/problemset/problem/464/C' },
  { id: 74, title: 'Problem for Nazar', link: 'https://codeforces.com/problemset/problem/497/C' },
  { id: 75, title: 'Sereja and Suffixes', link: 'https://codeforces.com/problemset/problem/368/C' },
];

const ProblemTable = () => {
  const [solvedProblems, setSolvedProblems] = useState([]);

  useEffect(() => {
    const checkSubmittedProblems = async () => {
      try {
        const submittedProblems = await fetchSubmittedProblems(username); // Assuming fetchSubmittedProblems retrieves the list of solved problems
        const matchingProblems = expert.filter(problem => 
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
        Expert Level Problems
      </Typography>
      <Typography variant="body1">
        This is the detailed analysis for expert level problems.
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
            {expert.map((problem) => (
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
