import { Model } from '../model/model';
import { Device as IoTDevice } from '../Model/device.js';

let model = null;

beforeEach(() => model = new Model());
afterEach(() => model = null);

describe('Testing model-funcions', () => {

    test('test model.id with number', () => {
        model.setID(1077);
        expect(model.id).toEqual(1077);
    })

    test('test model.id with string', () => {
        model.setID("testing-string-77");
        expect(model.id).toEqual("testing-string-77");
    })

    test('test model.token with number', () => {
        model.setToken(10);
        expect(model.token).toEqual(10);
    });

    test('test model.token with string', () => {
        model.setToken("testing-string-77");
        expect(model.token).toEqual("testing-string-77");
    });

    test('test currentDate-function', () =>{
        let currentDate = new Date().toISOString().slice(0,10);
        let returned_date = model.getCurrentDateAndTime()[0];
        expect(returned_date).toEqual(currentDate);

    });

    test('test parametersIsSet-function - none set', () =>{
        const expected = false;
        const result = model.parametersIsSet();
        expect(result).toEqual(expected);

    });

    test('test parametersIsSet-function - only id set', () =>{
        model.setID(77);
        const expected = false;
        const result = model.parametersIsSet();
        expect(result).toEqual(expected);

    });
    
    test('test parametersIsSet-function - only token set', () =>{
        model.setToken("some-token");
        const expected = false;
        const result = model.parametersIsSet();
        expect(result).toEqual(expected);
    });

    test('test parametersIsSet-function - both set', () =>{
        model.setID(77);
        model.setToken("some-token");
        const expected = true;
        const result = model.parametersIsSet();
        expect(result).toEqual(expected);
    });

    test('testing upload when not connected - should generate error', () =>{
        expect(() => model.uploadData()).toThrow("Device not connected");
    });

    test('testing setUpConnection when no parameters set - should generate error', () =>{
        expect(() => model.setUpConnection()).toThrow("Parameters not set correctly");
    });
    
    test('testing setUpConnection with BOTH parameter set - should generate error', () =>{
        model.setToken("10");
        model.setID("77");
        expect(() => model.setUpConnection()).toThrow("Could not connect");
    });
    
    test('testing Disconnected when disconnected - should generate error', () =>{
        expect(() => model.disconnect()).toThrow("Error when disconnecting device");
    });

    test('test if device is connected - should return false', () => {
        let result = model.is_connected();
        expect(result).toBe(false);
    });

    test('test if actice_device is instanse of IOT-device', () => {
        expect(model.active_device).toBeInstanceOf(IoTDevice);
    });

});

