import { Link } from 'react-router-dom';
import { Typography, TextField } from '@material-ui/core';
import { useState } from 'react';
import React from 'react';

const StepsView = ({ datePick, getSteps, steps, postSteps, status, getStepsData }) => {
  const [uploadSteps, setUploadSteps] = useState('');
  return <div style={{
    backgroundColor: 'lightgreen',
  }}>
    <div>
      <h1>Watch Your Steps!</h1>
    </div>

    {<Link to="/">
      <button>
        Login
        </button>
    </Link>}
    <button onClick={() => getStepsData()}>
      STEP DATA
      </button>
    <Typography paragraph>
      STEPS RECORDED IN DATABASE: {steps}
    </Typography>
    <TextField id="filled-basic" label="Insert steps" variant="filled" onChange={(e) => setUploadSteps(e.target.value)} />
    <button onClick={() => postSteps(uploadSteps)}>
      Send steps to database!
      </button>
    <Typography paragraph>
      Select date to view steps
    </Typography>

    {datePick()}
    <button onClick={() => getSteps()}>
      GET STEPS
    </button>
  </div>
};


export { StepsView };
