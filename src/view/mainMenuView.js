import React from 'react';
import Typography from '@material-ui/core/Typography';
import {apiGetRequest} from '../api/serverApi';
const MainMenuView = () => {
  return <div>
    <Typography paragraph>
      KIMPOSSIBLE
      KIMPOSSIBLE
      KIMPOSSIBLE
    </Typography>
    <Typography paragraph>
      KIMPOSSIBLE KIMPOSSIBLE KIMPOSSIBLE KIMPOSSIBLE KIMPOSSIBLE KIMPOSSIBLE KIMPOSSIBLE
    </Typography>
    <button onClick={async () => {
      const resp = await apiGetRequest({resource: 'api/user'});
      const data = await resp.json();
      console.log(data);
    }}>
      test
    </button>
  </div>
};

export { MainMenuView };