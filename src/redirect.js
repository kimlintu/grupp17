import { useEffect, useState, cloneElement } from "react";
import { createElement } from "react";
import { getUserInfo } from "./api/serverAuthApi";

function RedirectWrapper(props) {
  const [checkedUserStatus, setCheckedUserStatus] = useState(false);
  const [updateState, setUpdateState] = useState(0);

  // Try to retreive user info to check if the user is logged in. 
  useEffect(() => {

    if (!checkedUserStatus && !(window.loggedIn === true)) {
      console.log('WINODW: ', window.loggedIn)


      getUserInfo().then((user) => {
        if (user.name) {
          setUpdateState(updateState + 1);
          window.loggedIn = true;
        } else {
          setUpdateState(updateState + 1);
          window.loggedIn = false;
        }

        setCheckedUserStatus(true);
      })
    }
  }, [])
  console.log('WINODW2: ', window.loggedIn)


  if (updateState === 0) {
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