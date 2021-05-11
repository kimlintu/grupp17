var IoTDevice = require('./device.js');

class Model {
    constructor() {
        this.id = null;
        this.token = null;
        this.steps = 0;
        this.active_device = null;
        this.subscribers = [];
        this.device_is_connected = false;
    }

    setParameters(id, token) {
        this.setID(id);
        this.setToken(token);
    }

    setID(value) {
        this.id = value;
        console.log("id from model: " + this.id)
    }

    setSteps(value) {
        this.steps = value;
    }

    setToken(value) {
        //    this.notifyObservers();
        this.token = value;
        console.log("token from model: " + this.token)
    }

    getToken() {
        return this.token;
    }

    getCurrentDateAndTime() {
        let date = new Date();
        let time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        return [date.toISOString().slice(0, 10), time];
    }

    parametersIsSet() {
        return (this.id !== null && this.token !== null);
    }

    setUpConnection() {

        if (this.parametersIsSet()) {
            try {
                this.active_device = new IoTDevice(this.token, this.id);
                this.active_device.betaConnection();

                this.device_is_connected = true;
                console.log("from dev: " + this.active_device.isConnected());
            } catch (er) {
                throw "Could not connect" + er;
            }
        } else {
            throw "Parameters not set correctly";
        }

    }

    betaUpload() {
        console.log("model: " + this.token);
        const [date, time] = this.getCurrentDateAndTime();
        try {
            this.active_device.Push('Step-data', { date: date, time_sent: time, token: this.token });
        } catch (e) {
            console.log("error:\n");
            console.log(e);
        }
    }

    connectDevice() {
        console.log("id: " + this.token);
        /* Edit these lines to reflect your IoT platform config. */
        // const ACCESS_TOKEN = "eJ&RNc0ALb+Z4(4Vzq";
        const ACCESS_TOKEN = this.token;
        try{
            this.active_device = new IoTDevice(ACCESS_TOKEN, this.id);
        } catch(err) {
            throw "Error when connecting. Check config-values";
        }

        // this.device_is_connected = true;
    }

    uploadData() {
        if (this.active_device.isConnected() === true) {
            console.log("model: " + this.token);
            const [date, time] = this.getCurrentDateAndTime();
            try {
                this.active_device.Push('Step-data', { date: date, time_sent: time, steps: this.steps });
                //  this.disconnect();
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
        this.active_device = null;
        //  this.device_is_connected = false;
    }

    is_connected() {
        console.log()
        if (this.active_device === null) {
            console.log("null device -> false");
            return false;
        }
        else {
            console.log("from device: " + this.active_device.isConnected());
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