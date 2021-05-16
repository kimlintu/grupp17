import { Link, useRouteMatch } from 'react-router-dom';
import {useState} from 'react';


const AccountView = ({getLogin, name, getLogout}) => {
  const match = useRouteMatch(); {/* match contains info about current <Route>,
  i.e. "/login". It can be used to perform relative routing (see below). */}

  return <div style={{
    backgroundColor: 'lightgreen',
  }}>
    <div>
      <h1>Watch Your Steps!</h1>
    </div>
    <h2>@/login</h2>
      <button onClick={() => getLogin()}>
          Login
      </button>
      {name}
      <button onClick={() => getLogout()}>
          Logout
      </button>

  </div>

};

export { AccountView };

