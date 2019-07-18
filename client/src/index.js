import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
// import 'antd/dist/antd.css';
import './components/index.css';
// import 'bootstrap/dist/css/bootstrap.css';

// Development only axios helpers!
import axios from 'axios';
window.axios = axios;

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

