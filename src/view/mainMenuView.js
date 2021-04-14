import { Link } from 'react-router-dom';

const MainMenuView = () => {
  return <div>
    {/* A <Link> can be used to change the URL path. */}
    <h2>@/</h2>
    <Link to="/login">
      Click here to login
    </Link>
  </div>
};

export { MainMenuView };