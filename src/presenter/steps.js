import React, { createElement, useState } from "react";
import { StepsView } from "../view/stepsView";
import { apiGetRequest, apiPostRequest } from "../api/serverApi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function Steps() {
    const [steps, setSteps] = useState('');
    const [status, setStatus] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    console.log("STARTDATE: ", startDate);
    console.log("ENDDATE: ", endDate)

    return createElement(StepsView, {
        datePick: () => {
            const onChange = dates =>{
                const [start, end] = dates;
                setStartDate(start);
                setEndDate(end);
            };
            return (
                <DatePicker 
                    format={"DD/MM/YYYY"}
                    selected={startDate} 
                    onChange={onChange} 
                    startDate={startDate} 
                    endDate={endDate} 
                    selectsRange 
                    inline />
            );
        }, 
        getSteps: async () => {
            try {
                const db_response = await apiGetRequest({ resource: 'steps' });
                const data = await db_response.json(); //get only the data from response
                setSteps(data);
            } catch (error) {
                console.log(error);
            }

        },
        getStepsData: async () => {
            const data = await apiGetRequest({
                resource: 'steps/get',
                parameters: [
                    { key: 'start_date_year', value: '2021' },
                    { key: 'start_date_month', value: '05' },
                    { key: 'start_date_day', value: '16' },
                    { key: 'stop_date_year', value: '2021' },
                    { key: 'stop_date_month', value: '05' },
                    { key: 'stop_date_day', value: '17' },
                    { key: 'deviceId', value: 'steppy' }
                ]
            });

            console.log('data: ', data)
        }
        , steps,
        postSteps: async (numberOfSteps) => {
            try {
                const db_response = await apiPostRequest({ resource: 'steps/add', data: { numberOfSteps: numberOfSteps } });
                const data = await db_response.status;
                setStatus(data);
            } catch (error) {
                throw 'could not upload to database';
                console.log(error);
            }
        }, status
    });
};


export { Steps };
