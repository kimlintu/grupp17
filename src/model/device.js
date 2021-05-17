var iotf = require('ibmiotf');
var EventEmitter = require('events');

class Device extends EventEmitter {
  constructor() {
    super();
    this.device = null;
    this.device_connected = false;
  }

  Push(id, data) {
    this.device.publishHTTPS(id, 'json', JSON.stringify(data), 0);
  }

  betaConnection() {
    var that = this;
    console.log('Dev: connection status before connect ' + that.isConnected())
    try {
      this.device.connect();
      
      console.log('Dev: connection status after connect ' + that.isConnected())
      this.whenConnected();
    } catch (error) {
      throw "conn-err" + error;
    }

    /* 
     this.device.on('upload', function(id, data){
       this.Push(id, data);
       });
    */
  }

  whenConnected(){
    var that = this;
    this.device.on('connect', function () {
      that.emit('connect', null)
      console.log("yes connected");
    });

    this.device.on('disconnect', function () {
      console.log('Disocnnected');
      that.emit('disconnected', null);
    });

    this.device.on('error', function () {
     that.emit('errormessage', 'An error occured');
    });
  }

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
      this.betaConnection();
    } catch (error) {
      console.log('ERRORR : ', error)
    }
  }

  TeardownDevice() {
    this.device = null;
    this.device_connected = false;
  }

  Disconnect() {
    try {
      this.device.disconnect();
      this.device_connected = false;
    } catch (error) {
      throw "disc-err" + error;
    }
  }

  
  // async _setup() {

  //   var that = this;
  //   /* Setting the log level to debug. By default its 'warn' */
  //   //this.device.log.setLevel('debug');

  //   /* Connect it to Watson IoT! */
  //   this.device.connect();

  //   /* When your device has connected, setup listeners and callbacks. */
  //   this.device.on('connect', function (parent) {
  //     that.device_connected = true;
  //     /*    
  //           var rc = that.device.manage(3600, true, true);
            
  //           that.device.on('dmAction', function(request){
  //             console.log('Action : ' + request.action);
  //             that.device.respondDeviceAction(request,
  //                                             that.device.RESPONSECODE.FUNCTION_NOT_SUPPORTED, 
  //                                             "Function not supported");
  //           });
  //      */
  //     /* If the device disconnects, we do not need to panic. */
  //     that.device.on('disconnect', function () {
  //       that.device_connected = false;
  //       console.log('Disocnnected');
  //     });
  //   });

  //   /* Errors are pretty bad, right? */
  //   this.device.on('error', function (argument) {
  //     try {
  //       console.log('errpr: ', argument);
  //     } catch (err) {
  //       throw "argument";
  //     }
  //   });
  // }

  isConnected() {
    return this.device_connected;
  }
}

export { Device };
//module.exports = Device;