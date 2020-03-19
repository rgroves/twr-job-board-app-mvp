import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';

export default function Job({job}) {
  return (
    <Paper className={'job'}>
      <Typography>{job.title}</Typography>
      <Typography>{job.company}</Typography>
    </Paper>
  );
}
