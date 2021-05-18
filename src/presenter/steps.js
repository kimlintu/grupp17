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
    console.log("STARTDATE: ", ('0' + (startDate.getDate())).slice(-2));
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
            const data = await apiGetRequest({
                resource: 'steps/get',
                parameters: [
                    { key: 'start_date_year', value: startDate.getFullYear() },
                    { key: 'start_date_month', value: ('0' + (startDate.getMonth() + 1)).slice(-2) },//0 based
                    { key: 'start_date_day', value: ('0' + startDate.getDate()).slice(-2) },
                    { key: 'stop_date_year', value: endDate.getFullYear() },
                    { key: 'stop_date_month', value: ('0' + (endDate.getMonth() + 1)).slice(-2) },//0 based
                    { key: 'stop_date_day', value: ('0' + endDate.getDate()).slice(-2) },
                    { key: 'deviceId', value: 'steppy' }
                ]
            });
            console.log('data: ', data);

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
        , 
        steps,
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
