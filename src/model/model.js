//const { IoTDevice } = require('./device.js');

import { Device as IoTDevice } from './device.js';

/* This class stores the credentials of the stepcounter and contains some logic */
class Model {
    constructor() {
        this.id = null;
        this.token = null;
        this.steps = this.checkLocalStorage(0);
        this.active_device = new IoTDevice();
        this.subscribers = [];
        this.device_is_connected = false;
    }

    /* Sets the parameters for the device */
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
        this.steps = this.checkLocalStorage(value);
        console.log("total steps: " + this.steps);
        return this.steps;
    }
    
    /* Sets the token of the device */
    setToken(value) {
        this.token = value;
    }
    
    getToken() {
        return this.token;
    }
    
    /* Checks if steps has been added before on the current date. If thats the
    case, the new steps are added with the old value. If not, the value is set 
    without adding */
    checkLocalStorage(newSteps) {
        let currentDate = this.getCurrentDateAndTime()[0];
        if(currentDate === localStorage.getItem('date')) {
            let newTotal = this.incrementSteps(newSteps);
            this.updateLocalStorage(newTotal);
            return newTotal;
        } else {
            this.clearLocalStorage();
            this.updateLocalStorage(newSteps);
            return newSteps;
        }  
    }

    incrementSteps(newSteps) {
        let newTotal;
        let oldSteps = localStorage.getItem('step-data');
        if (!isNaN(oldSteps)) {
            newTotal = parseInt(oldSteps) + parseInt(newSteps);
        } else{
            newTotal = newSteps;
        }
        return newTotal;
    }

    /*  Updates localstorage with the latest steps-value, and the current date  */
    updateLocalStorage(steps) {
        localStorage.setItem('step-data', steps);
        localStorage.setItem('date', this.getCurrentDateAndTime()[0]);
    }

    clearLocalStorage() {
        localStorage.setItem('step-data', 0);
        localStorage.setItem('current-date', this.getCurrentDateAndTime()[0]);
        return 0;
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

    /* Connects device to the IBM-watson platform */
    setUpConnection() {
        if (this.parametersIsSet()) {
            try {
                this.active_device.SetupDevice(this.token, this.id);
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
                throw new Error("Could not connect");
            }
        } else {
            throw new Error("Parameters not set correctly");
        }
    }

    /* Uploads the data to the IBM-watson platform */
    uploadData() {
        if (this.device_is_connected === true) {
            
            const [date, time] = this.getCurrentDateAndTime();
            try {
                this.active_device.Push('Step-data', { date: date, time_sent: time, steps: this.steps });
            } catch (err) {
                console.err(err);
                throw err;
            }
        } else {
           throw new Error("Device not connected");
        }
    }

    /*  Disconnect the device from the IBM-watson platform  */
    disconnect() {
        this.active_device.Disconnect();
        this.active_device.TeardownDevice();
    }

    /* Checks if the device is connected to the IBM-watson platform */
    is_connected() {
        if (this.active_device === null) {
            return false;
        }
        else {
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