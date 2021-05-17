import { apiGetRequest } from "./serverApi";

async function getUserInfo() {
  const userInfo = await apiGetRequest({ resource: 'api/user' });
  
  return await userInfo.json();
}

export { getUserInfo };