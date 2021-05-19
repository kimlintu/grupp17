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
async function iotApiCall({ resource, params, method, headers, body }) {
  if (!resource || !method)
    throw 'Missing parameters: [' + (resource ? '' : ' [resource] ') + (method ? '' : ' [method] ') + ']';

  let fullUrl = iotServiceInfo.url + resource;

  // If there are any query parameters we add them after the resource.
  if (params) {
    let paramString = "?";
    params.forEach(parameter => {
      paramString += `${parameter.key}=${parameter.value}&`;
    });

    fullUrl += `/${paramString}`;
  }

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
async function iotApiGetDeviceList({ deviceId }) {
  const deviceListData = await iotApiGetResponseData(iotApiCall, { resource: 'bulk/devices', params: [{ key: "deviceId", value:  deviceId }], method: 'GET' }, 200);

  return deviceListData;
}

/**
 * Deletes the device with deviceId from the IoT hub.
 * 
 * @param {string} deviceId The id of the device that should be deleted. 
 * 
 * @returns nothing. 
 */
async function iotApiDeleteDevice({ deviceId }) {
  return await iotApiCall({ resource: `device/types/step-counter/devices/${deviceId}`, method: 'DELETE'});
}

/**
 * Registers a service with the specified parameters.
 * 
 * @param {string} type The type of service, for example "cloudant" for a Cloudant DB service. 
 * @param {*} name Name of the service, could be anything.
 * @param {*} description Description of the service, could be anything.
 * @param {*} credentials Credentials formatted as per https://docs.internetofthings.ibmcloud.com/apis/swagger/v0002/historian-connector.html#/Services/post_s2s_services.
 * 
 * @returns info about the registered service, including the service id that can be used to create the connector https://docs.internetofthings.ibmcloud.com/apis/swagger/v0002/historian-connector.html#/HistorianConnectors. 
 */
async function registerService(type, name, description, credentials) {
  const serviceToRegister = {
    name,
    type,
    description,
    credentials
  };

  const serviceInfo = await iotApiGetResponseData(iotApiCall, { resource: 's2s/services', method: 'POST', body: serviceToRegister }, 201);

  return serviceInfo;
}

/**
 * Creates the data connector between the database service and the IoT hub.
 * 
 * API doc: https://docs.internetofthings.ibmcloud.com/apis/swagger/v0002/historian-connector.html#/HistorianConnectors
 * 
 * @param {string} type Type of connector. For example, 'cloudant'.
 * @param {string} name Name of the connector, can be anything.
 * @param {string} description (Optional) Description of connector.
 * @param {string} serviceId The previously registered service's id. 
 * @param {string} timezone Timezone of connector.
 * 
 * @returns information about the connector, including its id. 
 */
async function createConnector(type, name, description, serviceId, timezone) {
  const connector = {
    name,
    description,
    serviceId,
    type,
    timezone,
    "enabled": true
  };

  const connectorInfo = await iotApiGetResponseData(iotApiCall, { resource: 'historianconnectors', method: 'POST', body: connector }, 201);

  return connectorInfo;
}

/**
 * Creates the database destination for the IoT hub data.
 * 
 * API doc: https://docs.internetofthings.ibmcloud.com/apis/swagger/v0002/historian-connector.html#/Destinations/post_historianconnectors__connectorId__destinations
 * 
 * @param {string} type Type of database, for example 'cloudant'. 
 * @param {string} name Name of destination. This will be part of the created database's name.
 * @param {string} connectorId Id of the previously created connector.
 * @param {string} bucketInterval How often should a new database be created- 'DAY', 'WEEK', 'MONTH'.
 * 
 * @returns information about the destination, including its name and id.
 */
async function createConnectorDestination(type, name, connectorId, bucketInterval) {
  const destination = {
    type,
    name,
    "configuration": {
      bucketInterval
    }
  };

  const destinationInfo = await iotApiGetResponseData(iotApiCall, { resource: `historianconnectors/${connectorId}/destinations`, method: 'POST', body: destination }, 201);

  return destinationInfo;
}

/**
 * Creates a forwarding rule for the data.
 * 
 * API doc: https://docs.internetofthings.ibmcloud.com/apis/swagger/v0002/historian-connector.html#/Forwarding%20Rules
 * 
 * @param {string} ruleName Name of the rule, can be anything.
 * @param {string} destinationName Name of the previously created destination-
 * @param {string} connectorId Id of the previously created connector.
 * @param {string} deviceType The device type this rule applies to.
 * @param {string} eventId Name of the sensor data event.
 * 
 * @returns information about the rule.
 */
async function createForwardingRule(ruleName, destinationName, connectorId, deviceType, eventId) {
  const forwardingRule = {
    name: ruleName,
    destinationName,
    type: 'event',
    selector: {
      deviceType,
      eventId
    }
  };

  const ruleInfo = await iotApiGetResponseData(iotApiCall, { resource: `historianconnectors/${connectorId}/forwardingrules`, method: 'POST', body: forwardingRule }, 201);

  return ruleInfo;
}

exports.iotApiAddDevice = iotApiAddDevice;
exports.iotApiGetDeviceList = iotApiGetDeviceList;
exports.registerService = registerService;
exports.createConnector = createConnector;
exports.createConnectorDestination = createConnectorDestination;
exports.createForwardingRule = createForwardingRule;
exports.iotApiDeleteDevice = iotApiDeleteDevice;