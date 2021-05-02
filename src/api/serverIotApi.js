import { apiPostRequest, apiGetRequest } from './serverApi'

/**
 * Adds the device to the Watson IoT hub and returns the generated device auth token.
 *  
 * @param {object} device An object containing information about the device. 
 * 
 * @returns {object} the generated token for the added device. 
 */
async function addDeviceToHub(device) {
  if(!device.deviceName)
    throw 'Device is missing deviceName parameter!';
  
  try {
    const response = await apiPostRequest({ resource: 'step-counters/add', data: device });
    const data = await response.json();

    return data.deviceToken;
  } catch (error) {
    // A '409' status code indicates that the device name has been taken.
    if(error.errorStatus === 409) 
      throw `A device with name ${device.deviceName} has already been added, please choose another name!`;

    // Unknown error, send default error message.
    throw 'Could not add device'
  }
}

async function getAddedDevicesList() {
  try {
    const response = await apiGetRequest({ resource: 'step-counters/get'});
    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}

export { addDeviceToHub, getAddedDevicesList }