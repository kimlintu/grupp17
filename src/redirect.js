import { useEffect, useState, cloneElement } from "react";
import { createElement } from "react";
import { getUserInfo } from "./api/serverAuthApi";

function RedirectWrapper(props) {
  const [checkedUserStatus, setCheckedUserStatus] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(undefined);

  // Try to retreive user info to check if the user is logged in. 
  useEffect(() => {

    // If the user has already logged in we don't need to check again.
    if (!checkedUserStatus && !(window.loggedIn === true)) {
      getUserInfo().then((user) => {
        if (user.name) {
          setUserLoggedIn(true);
          window.loggedIn = true;
        } else {
          setUserLoggedIn(false);
          window.loggedIn = false;
        }

        setCheckedUserStatus(true);
      })
    }
  }, [])

  if (userLoggedIn === undefined) {
    // Display loading status
    return createElement('div', {}, "LOADING PAGE")
  } else if ((window.loggedIn === true) || (window.location.pathname === '/account')) {
    // Give them requested page
    return createElement('div', {}, cloneElement(props.children, { userLoggedIn: window.loggedIn }))
  } else {
    // User not logged in, return account login page.
    window.location.pathname = '/account'
  }
}

export { RedirectWrapper };