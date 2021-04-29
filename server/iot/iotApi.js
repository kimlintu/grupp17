const fetch = require('node-fetch')

const { iotStatus } = require('./iotApiStatusCodes')

const iotServiceInfo = {
  "url": "https://udbne1.internetofthings.ibmcloud.com/api/v0002/",
  "api-key": "a-udbne1-pjkrdrdlsv",
  "auth": "YS11ZGJuZTEtcGprcmRyZGxzdjpReXliMFEzaGtvQzBjd1NnbjIK"
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

/**
 * Adds the specified device to the IBM Watson IoT hub.
 * 
 * @param {object} device The device that should be added. 
 * 
 * @returns {object} If successfull, returns an object containing the authentication token of the added device. 
 *                   A failed api call will return an error object explaining the error.  
 */
async function iotApiAddDevice({ device }) {
  const response = await iotApiCall({ resource: 'device/types/step-counter/devices', method: 'POST', body: device });

  const result = { "status": iotStatus.deviceConfStatus[response.status] };

  // If device has been added we want to return the device information.
  if (response.status == 201) {
    const data = await response.json();
    result["data"] = data;
  } else {
    const data = await response.json();
    throw { status: response.status, statusText: response.statusText };
  }

  return result;
}

exports.iotApiAddDevice = iotApiAddDevice;