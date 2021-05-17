import { Link, useRouteMatch } from 'react-router-dom';
import {useState} from 'react';
import Typography from '@material-ui/core/Typography';



const AccountView = ({getLogin, name, getName, getLogout,getDetails}) => {
  getName(); //get logged in users name, if there is any
  console.log(name)
  const bool = true;
  return <div style={{
    backgroundColor: 'lightgreen',
  }}>
    <div>
      <h1>Watch Your Steps!</h1>
    </div>
    <h2>@/login</h2>
        {!name &&(
      <button onClick={() => getLogin()}>
          Login
      </button>
      )
      }
      {name && (<>
            <Typography paragraph>
                Current user {name}!
            </Typography>
      <button onClick={() => getLogout()}>
          Logout
      </button>
      <button onClick={() => getDetails()}>
          Change Details
      </button>
      </>
      )}

  </div>

};

export { AccountView };

