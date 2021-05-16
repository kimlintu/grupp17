/********************************************************************************
 * 
 * This is the API for the IBM Watson IoT service. It provides functionality for:
 * - Registering, updating, and deleting IoT devices.
 * - Retrieving registered device information and data.
 * 
 ********************************************************************************/

const { iotApiAddDevice, iotApiGetDeviceList, 
        registerService, createConnector,
        createConnectorDestination, createForwardingRule } = require('./iotApi')

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

    if (addedDevice.data) {
      // TODO: Link the device to the user in the database.

      return addedDevice.data;
    }

  }
}

/**
 * Returns the devices (step-counters) that have been added by the specified user.
 *  
 * @param {object} user The user which device list should be retrieved
 * 
 * @returns {array} an array with device objects containing information about the device. 
 */
async function getDeviceList({ user }) {
  if(!user) {
    /* MISSING ARGUMENTS ERROR */
  }

  const deviceList = await iotApiGetDeviceList({ user });

  return deviceList.data;
}

async function connectHubToDB() {
  const credentials = {
    "username": process.env.cld_username,
    "password": process.env.cld_password,
    "host": process.env.cld_host,
    "port": process.env.cld_port,
    "url": process.env.cld_url
  };

  const type = 'cloudant';

  const serviceInfo = await registerService(type, 'CloudantService', 'Cloudant service', credentials);
  const serviceId = serviceInfo.data.id;
  console.log('info ', serviceInfo)

  const connectorInfo = await createConnector(type, 'Connector', 'Connector for Watson', serviceId, 'UTC');
  const connectorId = connectorInfo.data.id;
  console.log('info ', connectorInfo)

  const destinationInfo = await createConnectorDestination(type, 'steps_data', connectorId, 'DAY');
  const destinationName = destinationInfo.data.name;
  console.log('info ', destinationInfo)

  const rule = await createForwardingRule('dest rule', destinationName, connectorId, 'step-counter', 'Step-data');
  console.log('info ', rule)

}

exports.addDevice = addDevice;
exports.getDeviceList = getDeviceList;
exports.connectHubToDB = connectHubToDB;