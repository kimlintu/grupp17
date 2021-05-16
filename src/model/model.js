var IoTDevice = require('./device.js');

class Model {
    constructor() {
        this.id = null;
        this.token = null;
        this.steps = 0;
        this.active_device = new IoTDevice();
        this.subscribers = [];
        this.device_is_connected = false;
    }

    /* Sets the parameters for the stepcounter */
    setParameters(id, token) {
        this.setID(id);
        this.setToken(token);
    }

    /* Sets the id of the device */
    setID(value) {
        this.id = value;
    }

    /* Sets the steps-value that will be uploaded */
    setSteps(value) {
        this.steps = value;
    }

    /* Sets the token of the device */
    setToken(value) {
        //    this.notifyObservers();
        this.token = value;
    }

    getToken() {
        return this.token;
    }

    /* Returns the current date and time as an array */
    getCurrentDateAndTime() {
        let date = new Date();
        let time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        return [date.toISOString().slice(0, 10), time];
    }

    /* Checks if id and token are not null */
    parametersIsSet() {
        return (this.id !== null && this.token !== null);
    }

    /* Connects device to the IBM-watson-plattform */
    setUpConnection() {
        if (this.parametersIsSet()) {
            try {
                this.active_device.SetupDevice(this.token, this.id);
                //this.active_device.betaConnection();
                // this.device_is_connected = this.is_connected();
                console.log("mod checks dev-status: " + this.device_is_connected);

                this.active_device.on('errormessage', () => {
                    this.device_is_connected = false;
                    this.notifyObservers();
                })

                this.active_device.on('connect', () => {
                    this.device_is_connected = true;
                    this.notifyObservers();
                })

                this.active_device('disconnect', () => {
                    this.device_is_connected = false;
                    this.notifyObservers();
                })
            } catch (er) {
                throw "Could not connect" + er;
            }
        } else {
            throw "Parameters not set correctly";
        }
    }

    uploadData() {
        console.log("upload check status: " + this.device_is_connected);   
        if (this.device_is_connected === true) {
            console.log("model: " + this.token);
            const [date, time] = this.getCurrentDateAndTime();
            try {
                this.active_device.Push('Step-data', { date: date, time_sent: time, steps: this.steps });
            } catch (e) {
                console.log("error:\n");
                console.log(e);
            }
        } else {
           throw "Device not connected";
        }
    }

    disconnect() {
        this.active_device.Disconnect();
        this.active_device.TeardownDevice();
        //  this.device_is_connected = false;
    }

    is_connected() {
       // return this.device_is_connected;
        if (this.active_device === null) {
            console.log("null device -> false");
            return false;
        }
        else {
            console.log("model from device: " + this.active_device.isConnected());
            return this.active_device.isConnected();
        } 
    }

    addObserver(callback) {
        this.subscribers.push(callback);
    }

    removeObserver(obs) {
        this.subscribers = this.subscribers.filter(o => o !== obs); // create a new array with observers that are not obs.
    }

    notifyObservers() {
        this.subscribers.forEach(callback => {
            try {
                callback();
            } catch (err) {
                console.error("Error", err, callback);
            }
        })
    }
}

export { Model }