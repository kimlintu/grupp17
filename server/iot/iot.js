/********************************************************************************
 * 
 * This is the API for the IBM Watson IoT service. It provides functionality for:
 * - Registering, updating, and deleting IoT devices.
 * - Retrieving registered device information and data.
 * 
 ********************************************************************************/

const { iotApiAddDevice } = require('./iotApi')

/**
 * Registers the device at the IBM Watson IoT service and and saves it under the user
 * in the database.
 * 
 * @param {object} user               User who is registering the device.
 * @param {string} deviceName         Name of device, defined by user.
 * @param {object} deviceInformation  (Optional) Extra information about device.
 * @param {string} deviceAuthToken    (Optional) The user's selected auth token for device. If a
 *                                    token is not provided it will be randomly generated.
 * 
 * @return {object} an object containing the device's auth token.
 */
async function addDevice({ user, deviceName, deviceInformation, deviceAuthToken }) {
  if (user && deviceName) {
    device = {
      "deviceId": deviceName
    };

    if (deviceAuthToken)
      device["authToken"] = deviceAuthToken;

    if (deviceInformation)
      device["deviceInfo"] = deviceInformation;

    // First we try to add the device to the IoT hub.
    const addedDevice = iotApiAddDevice({ device });

    if(addedDevice.data) {
      // TODO: Link the device to the user in the database.

    } else {
      // If addedDevice does not contain data, the API call to the IoT hub will have failed.
      // Therefore we just the error object.
      return addedDevice.status;
    }
  }
}

function test() {
  addDevice
}