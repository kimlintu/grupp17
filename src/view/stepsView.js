import { Link, useRouteMatch } from 'react-router-dom';
import {Typography, TextField} from '@material-ui/core';
import {useState} from 'react';
const StepsView = ({getSteps, steps, postSteps, status}) => {
    const match = useRouteMatch(); {/* match contains info about current <Route>,
    i.e. "/login". It can be used to perform relative routing (see below). */}
    const [uploadSteps, setUploadSteps] = useState('');
    return <div style={{
      backgroundColor: 'lightgreen',
    }}>
      <div>
        <h1>Watch Your Steps!</h1>
      </div>
      <h2>@/steps</h2>
  
      { <Link to="/account">
        <button>
          Login
        </button>
      </Link>} 
      <button onClick={() => getSteps()}>
          test db call
      </button>
      <Typography paragraph>
        STEPS RECORDED IN DATABASE: {steps}
      </Typography>
      <TextField id="filled-basic" label="Insert steps" variant="filled" onChange={(e) => setUploadSteps(e.target.value)} />
      <button onClick={() => postSteps(uploadSteps)}>
        Send steps to database!
      </button>
      <Typography paragraph>
        STATUS ON WRITING TO DB: {status}
      </Typography>

      
      
  
    </div>
  
  };
  
  export { StepsView };