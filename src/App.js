import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import { MainMenu } from './presenter/mainMenu'
import { Steps } from './presenter/steps'
import { Account } from './presenter/account'
import { Devices } from './presenter/devices/devices'
import { Stepcounter } from './presenter/stepcounter';
import { Drawer } from './presenter/drawer'
import { StatsView } from './view/statsView'
import { Stats } from './presenter/stats'
import { RedirectWrapper } from './redirect'



function App() {
  return (
    <Router>

      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. 
            The "/" path always matches so it needs to be the last <Route>. */}
      <Switch>
        <Route path="/account">
          <RedirectWrapper>
            <Drawer>
              <Account />
            </Drawer>
          </RedirectWrapper>
        </Route>
        <Route path="/steps">
          <RedirectWrapper>
            <Drawer>
              <Steps />
            </Drawer>
          </RedirectWrapper>
        </Route>
        <Route path="/stats/steps">
          <RedirectWrapper>
            <Drawer>
              <Stats />
            </Drawer>
          </RedirectWrapper>
        </Route>
        <Route path="/steps">
          <RedirectWrapper>
            <Steps />
          </RedirectWrapper>
        </Route>
        <Route path="/devices">
          <RedirectWrapper>
            <Drawer>
              <Devices />
            </Drawer>
          </RedirectWrapper>
        </Route>
        <Route path="/stepcounter">
          <RedirectWrapper>
            <Drawer>
              <Stepcounter />
            </Drawer>
          </RedirectWrapper>
        </Route>
        <Route path="/">
          <RedirectWrapper>
            <Drawer>
              <MainMenu />
            </Drawer>
          </RedirectWrapper>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
