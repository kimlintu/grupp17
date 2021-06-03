async function iotApiAddDevice({ device }) {
  return Promise.resolve({ data: {
    authToken: 'test-token'
  }});
}

exports.iotApiAddDevice = iotApiAddDevice;