import { createElement, useState } from "react";
import { StepsView } from "../view/stepsView";
import {apiGetRequest} from "../api/serverApi";


function Steps(){
    const [steps, setSteps] = useState('');
    console.log("STEPSSTATE:", steps);

    return createElement(StepsView, {
        getSteps: async () => {
            try{
                const db_response = await apiGetRequest({resource: 'steps'});
                const data = await db_response.json(); //get only the data from response
                setSteps(data);
            }catch(error){
                console.log(error);
            }
            
        }
    , steps});
};

export { Steps };
