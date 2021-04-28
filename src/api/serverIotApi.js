import { apiPostRequest } from './serverApi'

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
    throw 'Could not add device'
  }
}

export { addDeviceToHub }