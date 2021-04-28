import { createElement, useState } from "react";
import { DevicesView } from "../../view/devicesView"

import { addDeviceToHub } from '../../api/serverIotApi'

function Devices() {
  const [status, setStatus] = useState('');

  return createElement(DevicesView, {
    addDevice: async (deviceName) => {
      if (deviceName !== "") {
        try {
          setStatus({ status: 'loading', color: 'secondary' });
          const deviceToken = await addDeviceToHub({ "deviceName": deviceName });

          setStatus({ status: 'done', message: 'Device added', parameters: [deviceToken], color: 'primary' });
        } catch (error) {
          setStatus({ status: 'error', message: error, color: 'error' });
        }
      } else {
        setStatus({ status: 'error', message: 'Name cannot be empty', color: 'error' });
      }
    },
    status
  });
}

export { Devices }