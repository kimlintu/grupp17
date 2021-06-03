jest.mock('./iotApi')

const { addDevice } = require('./iot')

test('should return added device token', async () => {
  const deviceInfo = await addDevice({ user: 'test', deviceName: 'test' });

  expect(deviceInfo.authToken).toBeDefined();
});

test('missing parameters should fail', async () => {
  try {
    await addDevice({ deviceName: 'test' });
  } catch (e) {
    expect(e).toEqual('Missing either user or deviceName parameter.');
  }

  try {
    await addDevice({ user: 'test' });
  } catch (e) {
    expect(e).toEqual('Missing either user or deviceName parameter.');
  }
});