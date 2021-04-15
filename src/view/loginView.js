import { Link, useRouteMatch } from 'react-router-dom';

const LoginView = () => {
  const match = useRouteMatch(); {/* match contains info about current <Route>,
  i.e. "/login". It can be used to perform relative routing (see below). */}

  return <div style={{
    backgroundColor: 'lightgreen',
  }}>
    <div>
      <h1>Watch Your Steps!</h1>
    </div>
    <h2>@/login</h2>

    { <Link to="/">
      <button>
        Login
      </button>
    </Link>} 
    <Link to="/register">
      <button>
        Register
      </button>
    </Link>

  </div>

};

export { LoginView };