import React from 'react';
import Typography from '@material-ui/core/Typography';
import {apiGetRequest} from '../api/serverApi';
const MainMenuView = ({getUserName, userName}) => {
  getUserName(); //get logged in users name, if there is any
  return <div>

    {userName && (
    <>
    <Typography paragraph>
      KIMPOSSIBLE
      KIMPOSSIBLE
      KIMPOSSIBLE
    </Typography>
    <Typography paragraph>
      Hello {userName} ! Enjoy your stay...
    </Typography>
    <button onClick={async () => {
      const resp = await apiGetRequest({resource: 'api/user'});
      const data = await resp.json();
      console.log(data);
    }}>
      print autheticationinfo in console
    </button>
    <button onClick={async () =>{
      const resp1 = await apiGetRequest({resource: 'db/delete'});
      const data = await resp1.json();
      console.log(data.ok);
    }}>
      test db delete
    </button>
    </>)}
    {!userName && (
    <>
    <Typography paragraph>
        Welcome to watch your step, please go to account to login
    </Typography>
    </>
    )}
  </div>
};

export { MainMenuView };