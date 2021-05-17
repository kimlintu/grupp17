import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ModelContext, DeviceContext } from './context';
import { Model } from './model/model';
import Device from './model/device';

const model = new Model();
const stepcounter = new Device();

ReactDOM.render(
  <React.StrictMode>
    <ModelContext.Provider value={model}>
      <DeviceContext.Provider value={stepcounter}>
        <App />
      </DeviceContext.Provider>
    </ModelContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);