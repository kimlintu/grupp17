import { Link, useRouteMatch } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
const StepsView = ({getSteps, steps}) => {
    const match = useRouteMatch(); {/* match contains info about current <Route>,
    i.e. "/login". It can be used to perform relative routing (see below). */}
    console.log("STEPSTATE IN VIEW: ", steps);
    return <div style={{
      backgroundColor: 'lightgreen',
    }}>
      <div>
        <h1>Watch Your Steps!</h1>
      </div>
      <h2>@/steps</h2>
  
      { <Link to="/">
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

      
      
  
    </div>
  
  };
  
  export { StepsView };