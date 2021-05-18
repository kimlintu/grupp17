import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ModelContext } from './context';
import { Model } from './model/model';

const model = new Model();

ReactDOM.render(
  <React.StrictMode>
    <ModelContext.Provider value={model}>
        <App />
    </ModelContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);