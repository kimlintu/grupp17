import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import { MainMenu } from './presenter/mainMenu'
import { MainMenuView } from './view/mainMenuView'
import { RegisterView } from './view/registerView'
import { Steps } from './presenter/steps'
import { Account } from './presenter/account'
import { Devices } from './presenter/devices/devices'
import { Drawer } from './presenter/drawer'
import { PermanentDrawerLeft } from './view/drawerView'




function App() {
  return (
    <Router>

      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. 
            The "/" path always matches so it needs to be the last <Route>. */}
      <Switch>
        <Route path="/account">
          <Account /> {/* Our own React component (will be replaced by corresponding Presenter later) */}
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
        <Route path="/">
          <Drawer>
            <MainMenu /> {/* Our own React component (will be replaced by corresponding Presenter later) */}
          </Drawer>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
