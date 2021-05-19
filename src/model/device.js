var iotf = require('ibmiotf');
var EventEmitter = require('events');


/*  This class represents an IoT-device, in this case a stepcounter. 
    The device connects to the IBM-watson platform and publish its 
    data, namely the number of steps */
class Device extends EventEmitter {
  constructor() {
    super();
    this.device = null;
    this.device_connected = false;
  }

  /* Publish the data on the IBM-watson platform */
  Push(id, data) {
    this.device.publishHTTPS(id, 'json', JSON.stringify(data), 0);
  }

  /* Connects the device to the IBM-watson platform */
  connectDevice() {
    var that = this;
    console.log('Dev: connection status before connect ' + that.isConnected())
    try {
      this.device.connect();
      
      console.log('Dev: connection status after connect ' + that.isConnected())
      this.whenConnected();
    } catch (error) {
      throw "conn-err" + error;
    }
  }

  /* This function is run as long as the device is connected */
  whenConnected(){
    var that = this;
    this.device.on('connect', function () {
      that.emit('connect', null)
    });

    this.device.on('disconnect', function () {
      that.emit('disconnected', null);
    });

    this.device.on('error', function () {
     that.emit('errormessage', 'An error occured');
    });
  }

  /*  Sets up the device with the needed configurations, and calls
      connect-function */
  SetupDevice(token, id) {
    const device_config = {
      "org": "udbne1",
      "domain": "internetofthings.ibmcloud.com",
      "type": "step-counter",
      "id": id,
      "auth-method": "token",
      "auth-token": token,
      "use-client-certs": false
    };
    try {
      this.device = new iotf.IotfManagedDevice(device_config);
      this.device_connected = false;
      this.connectDevice();
    } catch (error) {
      console.log('ERRORR : ', error)
    }
  }

  /* Sets this device to null */
  TeardownDevice() {
    this.device = null;
    this.device_connected = false;
  }

  /* Disconnects the device */
  Disconnect() {
    try {
      this.device.disconnect();
      this.device_connected = false;
    } catch (error) {
      throw "disc-err" + error;
    }
  }

  /* Returns the device connection status */
  isConnected() {
    return this.device_connected;
  }
}

export { Device };