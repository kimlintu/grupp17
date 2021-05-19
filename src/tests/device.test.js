import { Device as IoTDevice } from '../Model/device.js';

let Device = null;

beforeEach(() => Device = new IoTDevice());
afterEach(() => Device = null);

describe('Testing device-funcions', () => {

    test('testing intial parameters', () => {
        expect(Device.device).toBeNull();
        expect(Device.device_connected).toBe(false);
    })

    test('testing connection - should throw error', () => {
        expect(() => Device.connectDevice()).toThrow("Error when connecting");
    })
    
    test('testing teardown - should throw error', () => {
        Device.device = {device: "mockedDevice"};
        Device.device_connected = true;
        expect(Device.device).not.toBeNull();
        expect(Device.device_connected).toBe(true);
        Device.TeardownDevice(); 
        expect(Device.device).toBeNull();
        expect(Device.device_connected).toBe(false);
    })
    
    test('testing disconnect - should throw error', () => {
        expect(() => Device.Disconnect()).toThrowError();
    })
});