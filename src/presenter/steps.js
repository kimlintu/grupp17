import { createElement, useState } from "react";
import { StepsView } from "../view/stepsView";


function Steps(){
    const [steps, setSteps] = useState('');

    return createElement(StepsView, {
        getSteps: async () => {
            const db_response = await fetch(`http://localhost:6001/steps`, {
                method: 'GET'
            });
            setSteps('124');
        }
    }, steps);
};

export { Steps };
