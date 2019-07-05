import sha256 from '../public/sha256.min';
import sendData from "./SendData";
import socket from './GameChat.js';

export function loginToGame(pass, callback, socket, setter, currentPlayer) {
    // alert(`Gitarka! ${pass}`);
    console.log(`Handluj: ${currentPlayer.password}`);
    if (sha256(pass.value) === currentPlayer.password) {

        fetch('http://localhost:3005/login-user', {
            method: 'get',
            credentials: 'include',
            mode: 'no-cors',
            headers: {
                "Cookie": "user=login"
            }
        }).then((results) => {
            return results.json();
        }).then((data) => {

        }).catch((error) => {
            console.log(`Login error: ${error}`);
        });


        let userInfo = {
            cookie: null,
            currentPlayer: currentPlayer
        };


        fetch("http://localhost:3005/user-connected", {
            mode: "cors",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(currentPlayer)
        })
            .then(data => data.json())
            .then((data) => {
               console.log(`Response: ${JSON.stringify(data)}`);
               socket.emit("newUserLoggedIn");
            }).catch(err => {
                console.log(`Error: ${err}`)
        });

        // Hide floating users
        callback();

        document.querySelector('#game-begin').style.borderColor = currentPlayer.color;
        document.querySelector('#game-begin').style.boxShadow = `1px 0px 20px 6px ${currentPlayer.color}`;
        document.querySelector('#close-highlight').style.background = currentPlayer.color;
        // document.querySelector('#login-panel').style.height = 0;
        document.querySelector('#login-panel').style.display = "none";
        setTimeout(() => {
            document.querySelector('#welcome-name').innerText = currentPlayer.name;
        }, 100);
        setTimeout(() => {
            document.querySelector('#close-highlight').style.background = 'black';
            document.querySelector('#game-begin').style.borderColor = 'black';
            document.querySelector('#game-begin').style.boxShadow = '1px 0px 5px 0px black';
        }, 1000);
        setter(currentPlayer);
        console.log(`LoginToGameFN: ${currentPlayer.color}`);
    } else {
        alert(':-(')
    }
}