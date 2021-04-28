import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import { MainMenuView } from './view/mainMenuView'
import { LoginView } from './view/loginView'
import { RegisterView } from './view/registerView'
import { Devices } from './presenter/devices/devices'
import { PermanentDrawerLeft } from './view/drawerView'


function App() {
  return (
    <Router>

      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. 
            The "/" path always matches so it needs to be the last <Route>. */}
      <Switch>
        <Route path="/login">
          <LoginView /> {/* Our own React component (will be replaced by corresponding Presenter later) */}
        </Route>
        <Route path="/register">
          <RegisterView /> {/* Our own React component (will be replaced by corresponding Presenter later) */}
        </Route>
        <Route path="/devices">
          <PermanentDrawerLeft>
            <Devices />
          </PermanentDrawerLeft>
        </Route>
        <Route path="/">
          <PermanentDrawerLeft>
            <MainMenuView /> {/* Our own React component (will be replaced by corresponding Presenter later) */}
          </PermanentDrawerLeft>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
