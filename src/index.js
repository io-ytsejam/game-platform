import React from 'react';
import ReactDOM from 'react-dom';
import "./scss/main.scss";
// import './index.css';
import App from './App';
// import serviceWorker from './serviceWorker.js';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));


// This file is our entry point... I guess

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

// const wrapper = document.getElementById('root');
// wrapper.innerText = "lel";
// wrapper ? ReactDOM.render(<App />, wrapper) : false;
