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

    // We use the "deviceClass" later parameter to identify which device belongs to which user. 
    device["deviceInfo"] = (deviceInformation ? deviceInformation : {});
    device["deviceInfo"]["deviceClass"] = user.name;

    // First we try to add the device to the IoT hub.
    const addedDevice = await iotApiAddDevice({ device });

    if(addedDevice.data) {
      // TODO: Link the device to the user in the database.

      return addedDevice.data;
    }

  }
}

exports.addDevice = addDevice;