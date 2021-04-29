import { createElement, useState } from "react";
import { StepsView } from "../view/stepsView";


function Steps(){
    const [steps, setSteps] = useState('');
    console.log("STEPSSTATE:", steps);

    return createElement(StepsView, {
        getSteps: async () => {
            const db_response = await fetch(`http://localhost:6001/steps`, {
                method: 'GET'
            });
            const data = await db_response.json(); //get only the data from response
            setSteps(data);
        }
    , steps});
};

export { Steps };
