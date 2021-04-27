const deviceConfStatus = {
  "201": {
    "type": "deviceAdded",
    "text": "Device added successfully."
  },
  "409": {
    "type": "deviceAlreadyExists",
    "text": "The provided device already exist. Try another device ID."
  },
  "400": {
    "type": "badRequest",
    "text": "Bad request. Reasons could be: No body, invalid JSON, unexpected key, or a bad value."
  },
  "401": {
    "type": "authTokenFail",
    "text": "Authentication failed. Token is empty or invalid."
  },
  "403": {
    "type": "authMethodFail",
    "text": "The specified authentication method is invalid or the API key does not exist."
  }
};

exports.iotStatus = { deviceConfStatus };