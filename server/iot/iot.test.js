jest.mock('./iotApi')

const { addDevice } = require('./iot')

test('should return added device token', async () => {
  const deviceInfo = await addDevice({ user: 'test', deviceName: 'test' });

  expect(deviceInfo.authToken).toBeDefined();
}); 