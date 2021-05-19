import { StatsView } from "../view/statsView";
import React, { createElement, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getDeviceStepData } from '../api/serverDbApi'
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
      setStepData(null);

      const orgStepData = await getDeviceStepData({ deviceId: selectedDevice, startDate, endDate });
      const stepDataWithFixedDate = orgStepData.stepsResult.map((daySteps) => {
        return {
          day: daySteps.timestamp.substring(5, 7) + "/" + daySteps.timestamp.substring(8, 10),
          steps: daySteps.data.steps
        }
      })
      setStepData(stepDataWithFixedDate);
    },
    stepData,
    getDeviceList: getAddedDevicesList,
    selectDevice: (device) => {
      setSelectedDevice(device);
    }
  })
}



export { Stats };