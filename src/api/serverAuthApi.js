import { apiGetRequest } from "./serverApi";

/**
 * Makes a request to the server to retrieve the currently logged in user's information. 
 * 
 * If the user is not logged in the function will return an object like so; { name: null }.
 * 
 * @returns {object} an object containing the user information.
 */
async function getUserInfo() {
  const userInfo = await apiGetRequest({ resource: 'api/user' });
  
  return await userInfo.json();
}

export { getUserInfo };