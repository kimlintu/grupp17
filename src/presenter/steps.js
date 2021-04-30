import { createElement, useState } from "react";
import { StepsView } from "../view/stepsView";
import {apiGetRequest, apiPostRequest} from "../api/serverApi";


function Steps(){
    const [steps, setSteps] = useState('');
    const [status, setStatus] = useState('');
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
        , steps, 
        postSteps: async (numberOfSteps) => {
            try{
                const db_response = await apiPostRequest({resource: 'steps/add', data: {numberOfSteps: numberOfSteps}});
                const data = await db_response.status;
                setStatus(data);
            }catch(error){
                throw 'could not upload to database';
                console.log(error);
            }
        }, status});
};

export { Steps };
