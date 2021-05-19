import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import { Account } from './presenter/account'
import { Devices } from './presenter/devices/devices'
import { Stepcounter } from './presenter/stepcounter';
import { Drawer } from './presenter/drawer'
import { Stats } from './presenter/stats'
import { RedirectWrapper } from './redirect'



function App() {
  return (
    <Router>
      <Switch>
        <Route path="/account">
          <RedirectWrapper>
            <Drawer>
              <Account />
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
            </Drawer>
          </RedirectWrapper>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
