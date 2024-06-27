import React from 'react';
import { CircularProgress, Grid, Typography } from '@mui/material';

const CircularProgressChart = ({ percentages }) => {
  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item>
        <Typography variant="subtitle1">Easy</Typography>
        <CircularProgress
          variant="determinate"
          value={percentages[0]}
          color="success"
          size={100}
          thickness={4}
        />
      </Grid>
      <Grid item>
        <Typography variant="subtitle1">Medium</Typography>
        <CircularProgress
          variant="determinate"
          value={percentages[1]}
          color="info"
          size={100}
          thickness={4}
        />
      </Grid>
      <Grid item>
        <Typography variant="subtitle1">Hard</Typography>
        <CircularProgress
          variant="determinate"
          value={percentages[2]}
          color="error"
          size={100}
          thickness={4}
        />
      </Grid>
    </Grid>
  );
};

export default CircularProgressChart;
