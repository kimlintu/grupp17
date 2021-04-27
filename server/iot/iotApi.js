const fetch = require('node-fetch')

const iotServiceInfo = {
  "url": "API_URL",
  "api-key": "API_KEY",
  "auth": "API_AUTH_KEY"
};

/**
 * Performs an API request to the IoT service for the specific resource. 
 * 
 * @param {string} resource The resource that is requested.
 * @param {string} method   HTTP method that should be used, e.g. GET, POST, or PUT.
 * @param {object} headers  (Optional) Any additional headers that should be specified.  
 * @param {object} body     (Optional) The body of the request.
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
  const data = await response.json();

  return data;
}