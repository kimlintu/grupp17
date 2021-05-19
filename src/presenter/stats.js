import { StatsView } from "../view/statsView";
import React, { createElement, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { apiGetRequest, apiPostRequest } from "../api/serverApi";
import { getAddedDevicesList } from "../api/serverIotApi";


function Stats() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const curr_month = new Date().getMonth();//0 index
  const [stepData, setStepData] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState("");

  return createElement(StatsView, {
    datePick: () => {
      const onChange = dates => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
      };
      if (curr_month === 0) {
        curr_month = 12;
      }
      return (
        <DatePicker
          format={"DD/MM/YYYY"}
          selected={startDate}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          maxDate={new Date()}
          minDate={new Date().setMonth(curr_month - 1)}
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
          { key: 'deviceId', value: selectedDevice }
        ]
      });
      const stepdat = await data.json();
      console.log('data: ', stepdat);
      const tempdata = new Array(stepdat.stepsResult.length);
      for (var i = 0; i < tempdata.length; i++) {
        tempdata[i] = {
          day: stepdat.stepsResult[i].timestamp.substring(5, 7) + "/" + stepdat.stepsResult[i].timestamp.substring(8, 10),
          steps: stepdat.stepsResult[i].data.steps
        }
      }
      console.log("DATA TO GRAPH: ", tempdata);
      setStepData(tempdata);
    },
    stepData,
    getDeviceList: getAddedDevicesList,
    selectDevice: (device) => {
      
      console.log("selected device bef: ", device);
      setSelectedDevice(device);
      console.log("selected device aft: ", selectedDevice);
    }
  })
}



export { Stats };