import { Link, useRouteMatch } from 'react-router-dom';
import { Typography, TextField } from '@material-ui/core';
import { useState} from 'react';
import {Chart} from 'react-charts';
import React from 'react';


const StepsView = ({ datePick, getSteps, steps, postSteps, status, getStepsData }) => {
  const match = useRouteMatch(); {/* match contains info about current <Route>,
    i.e. "/login". It can be used to perform relative routing (see below). */}
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
    <button onClick={() => getSteps()}>
      test db call
      </button>
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
    
    

    


  

  </div>
  
  

};


export { StepsView };