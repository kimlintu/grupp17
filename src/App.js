import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import { MainMenuView } from './view/mainMenuView'
import { LoginView } from './view/loginView'

function App() {
  return (
    <Router>

      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. 
            The "/" path always matches so it needs to be the last <Route>. */}
      <Switch>
        <Route path="/login/test">
          <h2>@login/test</h2>
          <Link to="/">
            Home <br />
          </Link>
          <Link to="login">
            Login <br />
          </Link>
        </Route>
        <Route path="/login">
          <LoginView /> {/* Our own React component (will be replaced by corresponding Presenter later) */}
        </Route>
        <Route path="/">
          <MainMenuView /> {/* Our own React component (will be replaced by corresponding Presenter later) */}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
