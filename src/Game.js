import React, { Component } from "react";
import { hot } from 'react-hot-loader';
import './style.css';
import openSocket from 'socket.io-client';
import P5Wrapper from 'react-p5-wrapper';
// import sketch from './sktch.js';
const socket = new openSocket('http://localhost:8000');

function sketch(p) {
    let a , b;
    a = b = 180;
    let fr = 60;


    class Snake {
        constructor(color) {
            this.color = color;

            this.move = [
                false, // Right
                false, // Left
                true,  // Up
                false  // Down
            ];

            this.moveX = [180];
            this.moveY = [180];

            this.x = 180;
            this.y = 180;
            this.length = 1;
            this.moved = false;

            this.randomX = -15;
            this.randomY = -15;

            this.buffMoveX = [];
            this.buffMoveY = [];
            this.buffMoveXFront = this.x;
            this.buffMoveYFront = this.y;

            this.letUp = false;
            this.letDown = false;
            this.letRight = false;
            this.letLeft = false;

            this.speed = 0.8;
        }

        drawSnake() {
            for (let i = 0; i < this.length; i++) {
                p.fill(this.color);
                if (i === this.length-1)
                    p.ellipse((snake.moveX[this.length-1])+8, (snake.moveY[i])+8, 15, 15);
                else
                    p.rect((snake.moveX[i]), (snake.moveY[i]), 15, 15);
            }

            let mod15 = true;

            this.moveX.forEach(val => {if (val %15 !== 0) mod15 = false});
            if (!mod15)
                this.moveY.forEach(val => {if (val %15 !== 0) mod15 = false});

            if (snake.moveX[this.length-1]%15 === 0 && snake.moveY[this.length-1]%15 === 0) {
                selfEat(snake.moveX, snake.moveY);
                treatEat(snake);
                checkIfLose(snake);
                // console.log("Modulo 15");
                for (let j = 0; j < this.length-1; j++) {
                    this.buffMoveX[j] = this.moveX[j+1];
                    this.buffMoveY[j] = this.moveY[j+1];
                    // console.log(`moveY[${j}]: ${this.moveY[j]}`);
                }
                // console.log("buffX: "+this.buffMoveX);
                // console.log("buffY: "+this.buffMoveY);

                this.letUp = this.letDown = this.letLeft = this.letRight = false;

                if (this.move[0]) { this.x += 15; this.letRight = true } // Right
                if (this.move[1]) { this.x -= 15; this.letLeft = true } // Left
                if (this.move[2]) { this.y -= 15; this.letUp = true} // Up
                if (this.move[3]) { this.y += 15; this.letDown = true} // Down
            }

            // Increment segments (X, y) dependently to speed
            if (this.moveX[this.length-1] < this.x && this.letRight) {
                this.moveX[this.length-1] += this.speed;
                // Floor moveX
                if (this.moveX[this.length-1] > this.x)
                    this.moveX[this.length-1] = this.x;
            } else if (this.moveX[this.length-1] > this.x && this.letLeft) {
                this.moveX[this.length-1] -= this.speed;
                // Floor moveX
                if (this.moveX[this.length-1] < this.x)
                    this.moveX[this.length-1] = this.x;
            }
            // Increment segments (x, Y) dependently to speed
            if (this.moveY[this.length-1] < this.y && this.letDown) {
                this.moveY[this.length-1] += this.speed;
                // Floor moveY
                if (this.moveY[this.length-1] > this.y)
                    this.moveY[this.length-1] = this.y;
            } else if (this.moveY[this.length-1] > this.y && this.letUp) {
                this.moveY[this.length-1] -= this.speed;
                // Floor moveY
                if (this.moveY[this.length-1] < this.y)
                    this.moveY[this.length-1] = this.y;
            }

            for (let i = 0; i < this.length-1; i++) {
                // console.log(`moveX: ${this.moveX[i]}`);
                if (this.moveX[i] < this.buffMoveX[i]) {
                    this.moveX[i] += this.speed;
                    // Floor moveX
                    if (this.moveX[i] > this.buffMoveX[i])
                        this.moveX[i] = this.buffMoveX[i];
                } else if (this.moveX[i] > this.buffMoveX[i]) {
                    this.moveX[i] -= this.speed;
                    // Floor moveX
                    if (this.moveX[i] < this.buffMoveX[i])
                        this.moveX[i] = this.buffMoveX[i];
                }
                // Increment segments (x, Y) dependently to speed
                if (this.moveY[i] < this.buffMoveY[i]) {
                    this.moveY[i] += this.speed;
                    // Floor moveY
                    if (this.moveY[i] > this.buffMoveY[i])
                        this.moveY[i] = this.buffMoveY[i];
                } else if (this.moveY[i] > this.buffMoveY[i]) {
                    this.moveY[i] -= this.speed;
                    // Floor moveY
                    if (this.moveY[i] < this.buffMoveY[i])
                        this.moveY[i] = this.buffMoveY[i];
                }
            }




            // this.moveX.splice(0, this.moveX.length - this.length);
            // this.moveY.splice(0, this.moveY.length - this.length);

        }
    }

    const delay = ms => new Promise(res => setTimeout(res, ms));

    let player = {
        id: -1,
        name: "",
        score: -1,
        color: "rgb(0, 0, 0)",
        password: ""
    };
    let drawReady = false;
    let snake;
    p.myCustomRedrawAccordingToNewPropsHandler = (props) => {
        player = props.player;
        if (player !== null ) {
            console.log(player.color);
            snake = new Snake(player.color);
            drawReady = true;
        }
    };


    // await delay(500);


    const yourFunction = async (p) => {
        await delay(5000);
        console.log("Waited 5s");
    };


    // p5.js setup
    p.setup = () => {
        let canvas = p.createCanvas(435, 435);
        p.background(23, 204, 112);
        p.frameRate(fr);
    };

    // p5.js draw
    p.draw = () => {
        p.background(23, 204, 112);
        grid(15, 435, 435);
        if (drawReady) {
            snake.drawSnake();
            randomTreat(snake);
        }
    };

    socket.on("snakeUpdate", (move)=>{
        // HMM
    });

    p.keyPressed = () => {
        socket.emit("snakeUpdate", { snake: { moveX, moveY } });
        let lastMove = [];
        snake.move.forEach((val, key) => {
            if (val) lastMove[key] = true;
        });

        snake.move.forEach((val, key) => {
            snake.move[key] = false;
        });
        if (p.keyCode === p.RIGHT_ARROW && !lastMove[1]) snake.move[0] = true;
        else if (p.keyCode === p.LEFT_ARROW && !lastMove[0]) snake.move[1] = true;
        else if (p.keyCode === p.UP_ARROW && !lastMove[3]) snake.move[2] = true;
        else if (p.keyCode === p.DOWN_ARROW && !lastMove[2]) snake.move[3] = true;
        else {
            lastMove.forEach((val, key) => {
                if (val) snake.move[key] = true;
            });
        }
    }

    function checkIfLose(snake) {
        if (snake.moveX[snake.length-1] === -15 || snake.moveX[snake.length-1] === 435) {
        } else if (snake.moveY[snake.length-1] === -15 || snake.moveY[snake.length-1] === 435) {
            gameOver(player);
        }
    }

    // Our grid
    function grid(a, x, y) {
        for(let canvasX = a, canvasY = a; canvasX <= x; canvasX += a, canvasY +=a) {
            p.stroke(137, 250, 127);
            p.line(canvasX, 0, canvasX, x);
            p.line(0, canvasY, y, canvasY);
        }
    }

    function randomTreat(s) {
        setTimeout(() => {
            if (s.randomX === -15) {
                s.randomX = Math.floor(Math.random()*29)*15;
                s.randomY = Math.floor(Math.random()*29)*15;
                console.log(`rX: ${s.randomX}`);
            }
        }, Math.floor(Math.random()*5000));
        p.fill("black");
        p.rect(s.randomX, s.randomY, 15, 15);
    }

    function selfEat(x, y) {
        for(let i = 0; i < (x.length - 1); i++) {
            if (x.length > 4) {
                if (((x[i] == x[(x.length - 1)])) && ((y[i] == y[(y.length - 1)]))) {
                    gameOver(player);
                }
            }
        }
    }

    function treatEat(snake) {
        let an = document.querySelector('#score');
        let am = document.querySelector('#score-fade');
        if (snake.moveX[snake.length-1] === snake.randomX && snake.moveY[snake.length-1] === snake.randomY) {

            snake.moveX[snake.length] = snake.randomX;
            snake.moveY[snake.length] = snake.randomY;

            snake.length++;
            snake.speed+=0.5;
            snake.randomX = snake.randomY = -15;
            am.style.transition = "0.5s all ease";
            an.style.transform = "translateY(20px) rotateZ(-30deg) rotateX(-50deg)";
            am.style.transform = "translateY(-20px) rotateZ(30deg) rotateX(50deg)";
            setTimeout(() => {
                am.style.opacity = "0";
            }, 100);
            setTimeout(() => {
                // am.style.opacity = "0";
                an.style.transition = "0.5s all ease";
                an.style.transform = "translateY(0px)";
                setTimeout(() => {
                    am.style.transition = "";
                    am.style.opacity = "1";
                    an.style.transition = "";
                    am.style.transform = "";
                    // am.style.transition = "none";
                }, 1000);
            }, 0);
            an.innerText = snakeLength;
            setTimeout(() => {
                am.innerText = snakeLength;
            }, 1000);
        }
    }


    function gameOver(player) {
        let i = 0;
        let redTim = 0, greenTim = 0;

        let changeAppState;

        p.myCustomRedrawAccordingToNewPropsHandler = (props) => {
            if (snake.length > player.score) {
                player.score = snake.length;
                props.updatePlayer(player);
                fetch(`http://localhost:3005/update-user/${player.id}`, {
                    // mode: "cors",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(player)
                })
                    .catch(e => { console.log(`Error while updating user: ${e}`) })
                    .then(() => { props.onGameBegin("game-over") });
            }
        };

        function gameOverText() {
            p.textSize(34);
            p.fill(255);
            p.text('Game Over!', 120, 220);
        }

        function red(color) {
            p.background(255, 0, 0);
            green();
            gameOverText();
        }

        function green() {
            greenTim = setTimeout(() => {
                p.background(0, 255, 0);
                gameOverText();
                clearTimeout(greenTim);
            }, 500);
        }

        stop = setInterval(() => {
            red();
            i++;
            if(i >= 5) clearInterval(stop);
        }, 1000);

        setTimeout(() => {
            // showLeaderboard();
            // changeAppState("game-over", "gówne");
            p.background("#141414");
            p.fill("crimson");
            document.querySelector("#continue-overlay").style.display = "block";
            p.remove();
        }, 6000);


        p.frameRate(0);


        // players = pushUser(players, currentPlayer);

        // listPlayers(players);
    }

}

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            player: null

        }

        this.hmm = this.hmm.bind(this);
        this.setLp = this.setLp.bind(this);
        this.setLp();
        this.refresh = this.refresh.bind(this);
    }

    setLp() {
        // this.setState({ lp: this.props.loggedPlayer })
        // console.log(`LP: ${ Object.keys(this.state.lp) }`);
    }

    refresh() {
        this.setState({ id: null });
    }

    componentDidMount() {
        /*fetch("http://localhost:3005/api")
            .then(response => response.json())
            .then(data => { this.setState({ players: data }) })
            .catch(e => { console.log(`Error while fetching players: ${e}`) });*/
        this.setState({ player: this.props.loggedPlayer });
    }


    hmm() {
        let i = 0;
        this.setState({ gitarka: 222 });
    }

    render() {
        return (
            <div
                id={"its-gamers-time"}
                style={{
                    padding: "20px",
                    width: "435px",
                    height: "435px"
                }}
            >
                <P5Wrapper
                    sketch={sketch}
                    git={this.props.currentPlayer}
                    onGameBegin={this.props.onGameBegin}
                    refresh={this.refresh}
                    player={this.state.player}
                    updatePlayer={this.props.updatePlayer}
                />
                <div
                    id={"continue-overlay"}
                    style={{
                        display: "none",
                        position: "absolute",
                        top: "340px",
                        left: "0",
                        width: "400px",
                        height: "50px"
                    }}
                >
                    <h3
                        style={{
                            fontSize: "40px",
                            textDecoration: "underline",
                            cursor: "pointer",
                            textShadow: "1px 2px 5px black",
                            color: "black"
                        }}
                        onClick={() => this.refresh()}
                    >Show leader board</h3>
                </div>
            </div>
        )
    }
}

export default hot(module)(Game);