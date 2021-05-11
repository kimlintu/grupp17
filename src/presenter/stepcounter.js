import React from 'react';
import { StepcounterView } from '../view/stepcounterView';
import { ModelContext } from '../context'; 

function Stepcounter() {
    
    const model = React.useContext(ModelContext);
    //  const [currentToken, setCurrentToken] = React.useState("");
    const [device_connected, setConnectionStatus] = React.useState(false);
    const [status, setStatus] = React.useState('');
    //  const [ready, setReady] = React.useState("false");
    //   const [tokenStatus, settokenStatus ] = React.useState(0);

    React.useEffect(() => {
        // model.setToken(currentToken);
        // model.setUpConnection();
        const obs = model.addObserver(() => setConnectionStatus(model["device_is_connected"]));
        console.log(device_connected);
        // setReady(true);

        return () => model.removeObserver(obs);
    }, [model, device_connected]);

    //    console.log("mod: " + model.getToken());
    //    console.log("curr: " + currentToken);

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
                setStatus({ status: 'error', message: 'Steps cannot be negative' });
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
                model.setUpConnection();
                setConnectionStatus(model.is_connected());
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
                setStatus({ status: 'ok', message: error });

            }
        },
        connectionStatus: device_connected,
        status

        //  tokenStatus: tokenStatus
    });
};

export { Stepcounter };