const fetch = require('node-fetch')

const iotServiceInfo = {
  "url": process.env.iot_url,
  "api-key": process.env.iot_apikey,
  "auth": process.env.iot_auth
};

/**
 * Performs an API request to the IoT service for the specific resource. 
 * 
 * @param {string} resource The resource that is requested.
 * @param {string} method   HTTP method that should be used, e.g. GET, POST, or PUT.
 * @param {object} headers  (Optional) Any additional headers that should be specified.  
 * @param {object} body     (Optional) The body of the request.
 * 
 * @returns {object} the response of the request.
 */
async function iotApiCall({ resource, method, headers, body }) {
  if (!resource || !method)
    throw 'Missing parameters: [' + (resource ? '' : ' [resource] ') + (method ? '' : ' [method] ') + ']';

  const fullUrl = iotServiceInfo.url + resource;

  if (!headers)
    headers = {};

  // Authorization header is for authenticating the application to the IoT service.
  headers["Authorization"] = "Basic " + iotServiceInfo.auth;
  headers["Accept"] = "application/json";

  const options = { method, headers };

  if (body) {
    headers["Content-Type"] = "application/json";
    options["body"] = JSON.stringify(body);
  }

  const response = await fetch(fullUrl, options);

  return response;
}

async function iotApiGetResponseData(apiCall, parameters, desiredResponseStatus) {
  const response = await apiCall(parameters);

  if (response.status !== desiredResponseStatus)
    throw { status: response.status };

  const data = await response.json();

  return { data };
}

/**
 * Adds the specified device to the IBM Watson IoT hub.
 * 
 * @param {object} device The device that should be added. 
 * 
 * @returns {object} If successfull, returns an object containing the authentication token of the added device. 
 *                   A failed api call will return an error object explaining the error.  
 */
async function iotApiAddDevice({ device }) {
  const deviceData = await iotApiGetResponseData(iotApiCall, { resource: 'device/types/step-counter/devices', method: 'POST', body: device }, 201);

  return deviceData;
}

/**
 * Retrieves a list of devices added by the user from the Watson IoT hub.
 * 
 * @param {object} user The user that owns the devices. 
 * 
 * @returns {array} the list of devices as an array.
 */
async function iotApiGetDeviceList({ user }) {
  const deviceListData = await iotApiGetResponseData(iotApiCall, { resource: 'bulk/devices', method: 'GET' }, 200);

  return deviceListData;
}

exports.iotApiAddDevice = iotApiAddDevice;
exports.iotApiGetDeviceList = iotApiGetDeviceList;