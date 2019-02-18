import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom'
import firebase from 'firebase'

firebase.initializeApp(
    {
        apiKey: "AIzaSyABLqZkTVrO293vF3L5lIASzlixb2ETdzw",
        authDomain: "farmaciabackend.firebaseapp.com",
        databaseURL: "https://farmaciabackend.firebaseio.com",
        projectId: "farmaciabackend",
        storageBucket: "farmaciabackend.appspot.com",
        messagingSenderId: "732042205493"
    }
)

ReactDOM.render(
<BrowserRouter>
<App />
</BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
