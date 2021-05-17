import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import { MainMenu } from './presenter/mainMenu'
import { MainMenuView } from './view/mainMenuView'
import { LoginView } from './view/loginView'
import { RegisterView } from './view/registerView'
import { Steps } from './presenter/steps'
import { Devices } from './presenter/devices/devices'
import { PermanentDrawerLeft } from './view/drawerView'
import { Stepcounter } from './presenter/stepcounter';

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
        <Route path="/steps">
          <Steps />
        </Route>
        <Route path="/register">
          <RegisterView /> {/* Our own React component (will be replaced by corresponding Presenter later) */}
        </Route>
        <Route path="/devices">
          <PermanentDrawerLeft>
            <Devices />
          </PermanentDrawerLeft>
        </Route>
        <Route path="/stepcounter">
          <PermanentDrawerLeft>
            <Stepcounter />
          </PermanentDrawerLeft>
        </Route>
        <Route path="/">
          <PermanentDrawerLeft>
            <MainMenu /> {/* Our own React component (will be replaced by corresponding Presenter later) */}
          </PermanentDrawerLeft>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
