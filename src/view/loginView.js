import { Link, useRouteMatch } from 'react-router-dom';

const LoginView = () => {
  const match = useRouteMatch(); {/* match contains info about current <Route>,
  i.e. "/login". It can be used to perform relative routing (see below). */}

  return <div>
    <h2>@/login</h2>

    <Link to={`${match.path}/test`}>
      <button>
        Login mFS
      </button>
    </Link>

  </div>
};

export { LoginView };