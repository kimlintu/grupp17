import React from 'react';
import { StepcounterView } from '../view/stepcounterView';
import { ModelContext, DeviceContext } from '../context';

function Stepcounter() {

    const model = React.useContext(ModelContext);
    const device = React.useContext(DeviceContext);

    const [device_connected, setConnectionStatus] = React.useState(false);
    const [status, setStatus] = React.useState('');
    const [count, setCount] = React.useState(0);
    
    console.log('status: ', device_connected)

    React.useEffect(() => {
        const obs = model.addObserver(() => {
            setConnectionStatus(model["device_is_connected"]) 

            if(model["device_is_connected"])
                setStatus({ status: 'ok', message: 'Connected!' })
            else
                setStatus({ status: 'error', message: 'check inlogg' })
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
        uploadData: (steps) => {
            if (steps <= 0) {
                setStatus({ status: 'error', message: 'Steps cannot be 0 or negative' });
            } else if (!isNaN(steps)) {
                try {
                    model.setSteps(steps)
                    model.uploadData();
                    setStatus({ status: 'ok', message: 'Data uploaded' })
                } catch (error) {
                    setStatus({ status: 'error', message: error });
                }
            } else {
                setStatus({ status: 'error', message: 'Enter a valid number' });
            }
        },
        connect: () => {
            try {
                console.log("before con-setup " + device_connected);
                model.setUpConnection()
                //setConnectionStatus();
                console.log("after con-setup " + device_connected);
                setStatus({ status: 'ok', message: 'Device now connected' });

            } catch (error) {
                setStatus({ status: 'error', message: error });
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
        status

        //  tokenStatus: tokenStatus
    });
};

export { Stepcounter };