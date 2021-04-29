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

    // Check here if response is valid
    if (server_response.status === 200) {
      return server_response;
    } else {
      throw `Could not perform POST request for ${resource}. Status: ${server_response.status} ${server_response.statusText}`;
    }
  } catch (error) {
    console.log('fetch error: ', error)
    
    throw `Server communication failed.`
  }
}


export { apiPostRequest }