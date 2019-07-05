import React, { Component } from 'react';
// import logo from './logo.svg';
import { hot } from 'react-hot-loader';
import './style.css';

import openSocket from 'socket.io-client';
// import './app.scss';
// import UsersFloat from './UsersFloat.js';
import GameBegin from './GameBegin.js';
import GameChat from "./GameChat.js";
import Game from "./Game.js";
import GameOver from "./GameOver.js";
import TopAppBar, {TopAppBarFixedAdjust} from '@material/react-top-app-bar';
import {rotateIn, rotateOut} from "./rotateIcons";
import IconButton from '@material/react-icon-button';
import MaterialIcon from '@material/react-material-icon';
import Drawer, {DrawerAppContent} from '@material/react-drawer';
import LoggedUserPanel from "./LoggedUserPanel";

const host = "http://localhost:3005";
const socket = new openSocket('http://localhost:8000');

window.addEventListener("beforeunload", (e) => {
    // e.preventDefault();

    let x = setTimeout(() => {
        console.log('fm');
    }, 10000)

    fetch(host+"/unload", {
        credentials: "include"
    })
        .then(response => response.json())
        .then(() => {
            socket.emit("userDisconnected");
        })
        .catch((err) => {
            console.log(`Error while unload request: ${err}`);
        })
    location.reload();
    e.returnValue = "";
})

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: null,
            stateOfGame: 'Strona główna',
            game: "not-playing", // game-over, playing, not-playing
            userId: null,
            loggedPlayer: {
                id: 2121,
                name: "",
                score: null,
                color: "",
                password: ""
            },
            opponentPlayer: {
                id: -1,
                name: "",
                score: -1,
                color: ""
            }
        };
        this.setLoggedPlayer = this.setLoggedPlayer.bind(this);
        this.stateOfAGame = this.stateOfAGame.bind(this);
        this.gameBegin = this.gameBegin.bind(this);
        this.onGameBegin = this.onGameBegin.bind(this);
        this.updatePlayer = this.updatePlayer.bind(this);
        this.setOpponentPlayer = this.setOpponentPlayer.bind(this);
    }

    gameBegin(gameStatus) {
        if (gameStatus === "playing")
            // document.querySelector("#defaultCanvas0").style.display = "block";
            // document.querySelector('#score').parentElement.style.display = "block";
            return <Game
                onGameBegin={this.onGameBegin}
                currentPlayer={this.state.loggedPlayer}
                loggedPlayer={this.state.loggedPlayer}
                updatePlayer={this.updatePlayer}
            />;
        else if (gameStatus === "not-playing") return (
            <GameBegin
                opponentPlayer={this.state.opponentPlayer}
                setOpponentPlayer={this.setOpponentPlayer}
                onGameBegin={this.onGameBegin}
                statingFun={this.stateOfAGame}
                socket={socket}
                userId={this.state.userId}
                setLoggedPlayer={this.setLoggedPlayer}
                loggedPlayer={this.state.loggedPlayer}
            />
        )
        else if (gameStatus === "game-over") return (
            <GameOver/>
        );

    }

    updatePlayer (player) {
        this.setState({ loggedPlayer: player });
    }

    onGameBegin (a) {
        this.setState({ game: a });
    }

    setLoggedPlayer(player) {
        this.setState({
            loggedPlayer: {
                id: player.id,
                name: player.name,
                score: player.score,
                color: player.color
            }
        })
    }

    setOpponentPlayer(player) {
        this.setState({
            opponentPlayer: {
                id: player.id,
                name: player.name,
                score: player.score,
                color: player.color
            }
        })
    }

    stateOfAGame(a) {
        this.setState({stateOfGame: a === 1 ? "Strona główna" : "Game on!"});
    }

  render() {
    return (
            <div id="canvas-box">
                <header className={'main-header'}>
                    <p  id="logged-as">Grasz jako: <span id="user-name"></span></p>
                    <h1 style={{margin: '0', padding: '25px', textAlign: 'left', color: 'white'}}>\></h1>
                    <p style={{display: 'none'}} id="score-wrap">
                        Wynik: <span id="score">1</span><span id="score-fade">1</span>
                    </p>
                    <div>
                        <TopAppBar
                            title={ (this.state.loggedPlayer.name !== "") ? this.state.loggedPlayer.name : this.state.stateOfGame }
                            navigationIcon={<MaterialIcon
                                icon='menu'
                                onClick={() => this.setState({open: !this.state.open})}
                            />}
                            actionItems={[<MaterialIcon key='item' icon='bookmark' />]}
                        />
                        <TopAppBarFixedAdjust>
                        </TopAppBarFixedAdjust>
                    </div>
                </header>
                <div>
                    <Drawer
                        dismissible
                        open={this.state.open}
                    >
                        {/*<SomeDrawerContent />*/}
                    </Drawer>
                    <DrawerAppContent>
                    </DrawerAppContent>
                </div>
                <div id="leader-board-wrapper">
                <div style={{display: 'none'}} id="leader-board" className="popup">
                  <div className="close">
                      <IconButton className={'close-sign'}
                                  onMouseEnter={event => rotateIn(event, 180)}
                                  onMouseLeave={event => rotateOut(event)}
                                  style={{transform: 'rotate(0deg'}}
                      ><MaterialIcon icon='close' />
                      </IconButton>
                  </div>
                  <h2>Leader board</h2>
                  <hr style={{borderColor: 'red'}}></hr>
                  <ol>
                  </ol>
                </div>
                    {this.gameBegin(this.state.game)}
                {/*<GameBegin
                    onGameBegin={this.onGameBegin}
                    statingFun={this.stateOfAGame}
                    socket={socket}
                    userId={this.state.userId}
                    setLoggedPlayer={this.setLoggedPlayer}
                    loggedPlayer={this.state.loggedPlayer}
                />*/}
                <GameChat userId={this.state.userId} loggedPlayer={this.state.loggedPlayer} socket={socket} />
              </div>
            </div>
    );
  }
}

export default hot(module)(App);
