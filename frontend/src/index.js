import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,    
  document.getElementById('root')
);


// reportWebVitals();

{/* <React.StrictMode>
    <App />
  </React.StrictMode>, */}