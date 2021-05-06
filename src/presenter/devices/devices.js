import { createElement, useState } from "react";
import { DevicesView } from "../../view/devicesView"

import { addDeviceToHub, getAddedDevicesList } from '../../api/serverIotApi'

function Devices() {
  const [status, setStatus] = useState('');

  return createElement(DevicesView, {
    addDevice: async (deviceName, token) => {
      if (deviceName !== "") {
        if (token && (token.length <= 8 || token.length >= 36)) {
          setStatus({ status: 'error', message: 'Token has to be between 8 and 36 characters', color: 'error' });
        } else {
          try {
            setStatus({ status: 'loading', message: 'Processing', color: 'primary' });

            const device = { "deviceName": deviceName, "deviceToken": token };

            const deviceToken = await addDeviceToHub(device);

            setStatus({ status: 'done', message: 'Device added', parameters: [deviceToken], color: 'primary' });
          } catch (error) {
            setStatus({ status: 'error', message: error, color: 'error' });
          }
        }
      } else {
        setStatus({ status: 'error', message: 'Name cannot be empty', color: 'error' });
      }
    },
    getDeviceList: getAddedDevicesList,
    status
  });
}

export { Devices }