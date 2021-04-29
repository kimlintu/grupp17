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
  try {
    const server_response = await fetch(`http://localhost:6001/${resource}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    return server_response;
  } catch (error) {
    console.log(`Could not perform POST request for ${resource}. Error: ${error}`);
  }
}


export { apiPostRequest }