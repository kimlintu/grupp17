import { Link } from 'react-router-dom';

const MainMenuView = () => {
  return <div>
    {/* A <Link> can be used to change the URL path. */}
    <Link to="/login">
      Click here to login
    </Link>
  </div>
};

export { MainMenuView };