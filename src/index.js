import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './views/App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import { transitions, positions,types, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic'


const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_CENTER,
  timeout: 2000,
  offset: '80px',
  // you can also just use 'scale'
  transition: transitions.SCALE,
  type:types.SUCCESS
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AlertProvider template={AlertTemplate} {...options} >
    <header>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"/>
    </header>
    <App />
    </AlertProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
