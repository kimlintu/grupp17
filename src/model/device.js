var iotf = require('ibmiotf');
class Device {
  constructor(token, id) {
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
    } catch (error) {
      console.log('ERRORR : ', error)
    }
    this.device_connected = false;
   // this._setup();
  }

  Push(id, data) {
    this.device.publishHTTPS(id, 'json', JSON.stringify(data), 0);
  }

  betaConnection() {
    try {
      console.log('before')
      this.device.connect();
      console.log('before')

      this.device_connected = true;
    } catch (error) {
      throw "conn-err" + error;
    }

    /*  this.device.on('connect', function(id, data){
    // this.Push(id, data);
     });
     */
     this.device.on('upload', function(id, data){
       this.Push(id, data);
       });

  }

  Disconnect() {
    try {
      this.device.disconnect();
      this.device_connected = false;
    } catch (error) {
      throw "disc-err" + error;
    }
  }


  async _setup() {

    var that = this;
    /* Setting the log level to debug. By default its 'warn' */
    //this.device.log.setLevel('debug');

    /* Connect it to Watson IoT! */
    this.device.connect();

    /* When your device has connected, setup listeners and callbacks. */
    this.device.on('connect', function (parent) {
      that.device_connected = true;
      /*    
            var rc = that.device.manage(3600, true, true);
            
            that.device.on('dmAction', function(request){
              console.log('Action : ' + request.action);
              that.device.respondDeviceAction(request,
                                              that.device.RESPONSECODE.FUNCTION_NOT_SUPPORTED, 
                                              "Function not supported");
            });
       */
      /* If the device disconnects, we do not need to panic. */
      that.device.on('disconnect', function () {
        that.device_connected = false;
        console.log('Disocnnected');
      });
    });

    /* Errors are pretty bad, right? */
    this.device.on('error', function (argument) {
      try{
        console.log('errpr: ', argument);
      } catch(err) {
        throw "argument";
      }
    });
  }

  isConnected() {
    return this.device_connected;
  }
}

module.exports = Device;