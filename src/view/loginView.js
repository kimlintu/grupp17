import { Link, useRouteMatch } from 'react-router-dom';

const LoginView = () => {
  const match = useRouteMatch(); {/* match contains info about current <Route>,
  i.e. "/login". It can be used to perform relative routing (see below). */}

  return <div>
    <Link to={`${match.path}/test`}>
      link to "/login/test"
    </Link>
  </div>
};

export { LoginView };