import React from 'react';
import { StepcounterView } from '../view/stepcounterView';
import { ModelContext, DeviceContext } from '../context';
import { getAddedDevicesList } from "../api/serverIotApi";

function Stepcounter() {

    const model = React.useContext(ModelContext);
    const device = React.useContext(DeviceContext);

    const [device_connected, setConnectionStatus] = React.useState(false);
    const [status, setStatus] = React.useState('');
    const [dailySteps, setDailySteps] = React.useState(model.steps);
     
    React.useEffect(() => {
        const obs = model.addObserver(() => {
            setConnectionStatus(model["device_is_connected"]) 

            if(model["device_is_connected"])
                setStatus({ status: 'ok', message: 'Device connected!' })
            else
                setStatus({ status: 'error', message: 'Check device credentials' })
        });
        return () => {
            model.removeObserver(obs);
            model.disconnect();
        }
    }, []);


    return React.createElement(StepcounterView, {
        uploadData: (newSteps) => {
            if (newSteps <= 0) {
                setStatus({ status: 'error', message: 'Steps cannot be 0 or negative' });
            } else if (!isNaN(newSteps)) {
                try {
                    let steps = parseInt(newSteps);
                    setDailySteps(model.setSteps(steps))
                    model.uploadData();
                    setStatus({ status: 'ok', message: 'Data uploaded' })
                } catch (error) {
                    setStatus({ status: 'error', message: error });
                }
            } else {
                setStatus({ status: 'error', message: 'Enter a valid number' });
            }
        },
        connect: (id, token) => {
            if (id !== "" && token !== "") {
                model.setParameters(id, token);
                try {
                    console.log("before con-setup " + device_connected);
                    model.setUpConnection()
                    console.log("after con-setup " + device_connected);
                    setStatus({ status: 'ok', message: 'Device now connected' });
                } catch (error) {
                    setStatus({ status: 'error', message: error });
                }
            } else {
                setStatus({ status: 'error', message: 'ID or token cannot be empty' });
            }
        },
        disconnect: () => {
            try {
                model.disconnect();
                setConnectionStatus(model.is_connected());
                setStatus({ status: 'ok', message: 'Device now disconnected' });
            } catch (error) {
                setStatus({ status: 'error', message: error });

            }
        },
        connectionStatus: device_connected,
        status,
        dailySteps: dailySteps,
        clear: () => {
            setDailySteps(model.clearLocalStorage());
            setStatus({ status: 'ok', message: 'LocalStorage cleared'});
        },
        getDeviceList: getAddedDevicesList
    });
};

export { Stepcounter };