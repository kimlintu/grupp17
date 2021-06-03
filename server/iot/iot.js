/********************************************************************************
 * 
 * This is the API for the IBM Watson IoT service. It provides functionality for:
 * - Registering, updating, and deleting IoT devices.
 * - Retrieving registered device information and data.
 * 
 ********************************************************************************/

const { iotApiAddDevice, iotApiGetDeviceList,
  registerService, createConnector,
  createConnectorDestination, createForwardingRule, iotApiDeleteDevice } = require('./iotApi')
const { addDeviceIdToUser, deleteDeviceFromUser } = require('../db/db_functions')

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

    // First we try to add the device to the IoT hub.
    const addedDevice = await iotApiAddDevice({ device });

    if (addedDevice.data) {
      // Link the device to the user in the database.
      await addDeviceIdToUser({ user, deviceId: deviceName });

      return addedDevice.data;
    }

  } else {
    throw 'Missing either user or deviceName parameter.';
  }
}

/**
 * Returns the devices (step-counters) that have been added by the specified user.
 *  
 * @param {object} user The user which device list should be retrieved
 * 
 * @returns {array} an array with device objects containing information about the device. 
 */
async function getDeviceList({ deviceId }) {
  const deviceList = await iotApiGetDeviceList({ deviceId });

  return deviceList.data;
}

/**
 * Deletes the device with deviceId from the IoT hub and removes its name
 * from user.
 * 
 * @param {object} user The user of the device. 
 * @param {string} deviceId Id of the device to be deleted.
 * 
 * @returns nothing.
 */
async function deleteDevice({ user, deviceId }) {
  await iotApiDeleteDevice({ deviceId });

  return await deleteDeviceFromUser({ user });
}

/**
 * Connects the IoT hub to the Cloudant database.
 * 
 * @returns nothing. 
 */
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

  const connectorInfo = await createConnector(type, 'Connector', 'Connector for Watson', serviceId, 'UTC');
  const connectorId = connectorInfo.data.id;

  const destinationInfo = await createConnectorDestination(type, 'steps_data', connectorId, 'DAY');
  const destinationName = destinationInfo.data.name;

  return await createForwardingRule('dest rule', destinationName, connectorId, 'step-counter', 'Step-data');
}

exports.addDevice = addDevice;
exports.getDeviceList = getDeviceList;
exports.connectHubToDB = connectHubToDB;
exports.deleteDevice = deleteDevice;