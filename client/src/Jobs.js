import React from 'react';
import Typography from '@material-ui/core/Typography';

import Job from './Job';

export default function Jobs() {
  return (
    <div className="jobs">
      <Typography variant="h1">
        Entry Level Software Jobs
      </Typography>
      <Job />
    </div>
  );
}