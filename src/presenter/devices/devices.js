import { createElement, useEffect, useState } from "react";
import { DevicesView } from "../../view/devicesView"

import { addDeviceToHub, getAddedDevicesList } from '../../api/serverIotApi'

function Devices() {
  const [status, setStatus] = useState('');
  const [deviceList, setDeviceList] = useState(null);

  useEffect(() => {
    getAddedDevicesList().then(list => {
      setDeviceList(list.results);
    })
  }, []);

  return createElement(DevicesView, {
    addDevice: async (deviceName) => {
      if (deviceName !== "") {
        try {
          setStatus({ status: 'loading', message: 'Processing', color: 'primary' });
          const deviceToken = await addDeviceToHub({ "deviceName": deviceName });

          setStatus({ status: 'done', message: 'Device added', parameters: [deviceToken], color: 'primary' });
        } catch (error) {
          setStatus({ status: 'error', message: error, color: 'error' });
        }
      } else {
        setStatus({ status: 'error', message: 'Name cannot be empty', color: 'error' });
      }
    },
    deviceList,
    status
  });
}

export { Devices }