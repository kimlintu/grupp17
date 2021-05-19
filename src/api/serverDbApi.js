import { apiGetRequest } from './serverApi';

async function getDeviceStepData({ deviceId, startDate, endDate }) {
  const data = await apiGetRequest({
    resource: 'steps/get',
    parameters: [
      { key: 'start_date_year', value: startDate.getFullYear() },
      { key: 'start_date_month', value: ('0' + (startDate.getMonth() + 1)).slice(-2) },//0 based
      { key: 'start_date_day', value: ('0' + startDate.getDate()).slice(-2) },
      { key: 'stop_date_year', value: endDate.getFullYear() },
      { key: 'stop_date_month', value: ('0' + (endDate.getMonth() + 1)).slice(-2) },//0 based
      { key: 'stop_date_day', value: ('0' + endDate.getDate()).slice(-2) },
      { key: 'deviceId', value: deviceId }
    ]
  });

  return await data.json();
}

export { getDeviceStepData };