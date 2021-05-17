import React from 'react';
import { StepcounterView } from '../view/stepcounterView';
import { ModelContext, DeviceContext } from '../context';

function Stepcounter() {

    const model = React.useContext(ModelContext);
    const device = React.useContext(DeviceContext);

    const [device_connected, setConnectionStatus] = React.useState(false);
    const [status, setStatus] = React.useState('');
    const [count, setCount] = React.useState(0);
    const [dailySteps, setDailySteps] = React.useState(model.steps);

    
    console.log('status: ', device_connected)

    React.useEffect(() => {
        const obs = model.addObserver(() => {
            setConnectionStatus(model["device_is_connected"]) 

            if(model["device_is_connected"])
                setStatus({ status: 'ok', message: 'Device connected!' })
            else
                setStatus({ status: 'error', message: 'Check device credentials' })
        });

        console.log("from presenter " + device_connected);
        setCount(count + 1);
        console.log("Count " + count);
     
        return () => model.removeObserver(obs);
    }, [model.active_device, device_connected]);


    return React.createElement(StepcounterView, {
        submitLocally: (id, token) => {
            if (id !== "" && token !== "") {
                model.setParameters(id, token);
                setStatus({ status: 'ok', message: 'Local state set' })
            } else {
                setStatus({ status: 'error', message: 'ID or token cannot be empty' });
            }
        },
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
               // setStatus({ status: 'ok', message: 'Local state set' })
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
    /*     
            testLocalStorage: (newSteps) => { 
            let steps = parseInt(newSteps);
            if (newSteps === "" || isNaN(steps) || steps <= 0) {
              setStatus({ status: 'ok', message: 'Enter valid number for steps' })
            } else{
                setDailySteps(model.checkLocalStorage(steps));        
                setStatus({ status: 'ok', message: 'LocalStorage set'});
            }
        }, 
    */
        dailySteps: dailySteps,
        clear: () => {
            setDailySteps(model.clearLocalStorage());
            setStatus({ status: 'ok', message: 'LocalStorage cleared'});
        }
        //  tokenStatus: tokenStatus
    });
};

export { Stepcounter };