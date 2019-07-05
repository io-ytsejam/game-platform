import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
// import logo from './logo.svg';
// import './style.css';
// import UsersFloat from './UsersFloat.js';
// import GameBegin from './GameBegin.js';
// import GameChat from "./GameChat.js";
// import * as sketch from './sketch.js';

class App extends Component {
  render() {
    return (
        <html lang="pl" dir="ltr">
          <head>
            <script src='./sketch.js'></script>
            <meta charSet="utf-8"></meta>
            <title>WenŻeT</title>
            <link rel="stylesheet" type="text/css" href="../../p5/style.css"></link>
            <link rel="stylesheet" href="color-picker-master/color-picker.min.css"></link>
          </head>
          <body>
            <div style={{boxShadow: '0px 0px 19px -1px rgb(36, 36, 36)', margin: '0 5px 20px 5px'}} id="canvas-box">
              <p  id="logged-as">Grasz jako: <span id="user-name"></span></p>
              <h1 style={{margin: '0', padding: '25px', color: 'white'}}>01122123</h1>
              <p style={{display: 'none'}} id="score-wrap">Wynik: <span id="score">1</span><span id="score-fade">1</span></p>
              <div id="leader-board-wrapper">
                <div style={{display: 'none'}} id="leader-board" className="popup">
                  <div className="close">
                    <p className="close-sign">&#x2716;</p>
                  </div>
                  <h2>Leader board</h2>
                  <hr style={{borderColor: 'red'}}></hr>
                  <ol>
                  </ol>
                </div>
                <GameBegin />
                <GameChat />
              </div>




            </div>
            // <script src="/socket.io/socket.io.js"></script>
            // <script src="sha256.min.js"></script>
            // <script src="p5.js"></script>
            // <script src="color-picker-master/color-picker.min.js"></script>
            // <script crossOrigin src="./sketch.js"></script>
          </body>
        </html>
    );
  }
}

export default hot(module)(App);

// const wrapper = document.getElementById('root');
// wrapper.innerText = "lel";
// wrapper ? ReactDOM.render(<App />, wrapper) : false;
