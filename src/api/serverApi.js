const serverUrl = 'http://localhost:6001';

/**
 * Performs a HTTP POST request to the server. 
 * 
 * The data will be sent to the Watch Your Step server and has to be 
 * a JSON object.
 * 
 * @param {string} resource The resource where the data should be sent, for example, 'step-counters/add'.
 * @param {object} data     The data payload that should be sent. Has to be a JSON object.
 *  
 * @returns {object} the server response. 
 */
async function apiPostRequest({ resource, data }) {
  return await apiRequest({ resource, data, method: 'POST' });
}

/**
 * Performs a HTTP GET request to the server
 * 
 * @param {string} resource The resource where the data should be sent, for example, '/steps'.
 * @param {object} parameters (Optional) Query parameters for the request.
 * 
 * @returns {object} The server response
 */
async function apiGetRequest({ resource, parameters }) {
  return await apiRequest({ resource, parameters, method: 'GET' }); 
}

/**
 * Performs a HTTP DELETE request to the server
 * 
 * @param {string} resource The resource where the data should be sent, for example, '/steps'.
 * @param {object} parameters (Optional) Query parameters for the request.
 * 
 * @returns {object} The server response
 */
async function apiDeleteRequest({ resource, parameters }) {
  return await apiRequest({ resource, parameters, method: 'DELETE' });
}

async function apiRequest({ resource, parameters, method, data }) {
  try {
    let resourceString = `${serverUrl}/${resource}`;

    if (parameters) {
      let paramString = "?";
      parameters.forEach(parameter => {
        paramString += `${parameter.key}=${parameter.value}&`;
      });

      resourceString += `/${paramString}`;
    }

    const request_options = { method };

    if (method === 'POST') {
      request_options['headers'] = {
        'Content-Type': 'application/json'
      };
      request_options['body'] = JSON.stringify(data);
    }

    const server_response = await fetch(resourceString, request_options);

    if (server_response.status === 200) {
      return server_response;
    } else {
      throw `Could not perform HTTP ${method} request for ${resource}. Status: ${server_response.status} ${server_response.statusText}`;
    }
  } catch (error) {
    console.log('fetch error: ', error)
    throw error;
  }
}

export { apiPostRequest, apiGetRequest, apiDeleteRequest }