function sketch (p) {
    let fr = 1;
    p.setup = () => {
        let canvas = p.createCanvas(435, 435);
        // canvas.parent('its-gamers-time');
        p.background(23, 204, 112);
        p.frameRate(fr);
    }

    let y;
    let x = y = 210, draws = -1;

    let players = 0;
    fetch('http://localhost:3005/api')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            players = data;
            // renderStartPlayers(data);
        }).catch(e => console.log(`Error while fetching players: ${e}`));


    function grid(a, x, y) {
        for(let canvasX = a, canvasY = a; canvasX <= x; canvasX += a, canvasY +=a) {
            p.stroke(137, 250, 127);
            p.line(canvasX, 0, canvasX, x);
            p.line(0, canvasY, y, canvasY);
        }
    }
    let stop


    function gameOver() {
        let i = 0;
        let greenTim;
        let redTim = greenTim = 0;

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

        frameRate(0);

        stop = setInterval(() => {
            red();
            i++;
            if(i >= 5) clearInterval(stop);
        }, 1000);

        setTimeout(() => {
            showLeaderboard();
        }, 3000);

        players = pushUser(players, currentPlayer);

        listPlayers(players);
    }
// It is very important declaration XD
    let currentPlayer/* = {"id": -1, "name": "", "score": 0, "color": undefined, "password": ""}*/;

    let g;
    p.myCustomRedrawAccordingToNewPropsHandler = (props) => {
        g = props.git;
        currentPlayer = g;
    }


    setTimeout(() => {
        console.log(`GKeys: ${Object.keys(g)}`);
        console.log(`GPlayer: ${g.color}`);
    }, 1000);

    // for (let v of currentPlayer)
    //     console.log(`currentPlayer: ${v}`);

    // currentPlayer.id = p.lp.id;
    // currentPlayer.name = p.lp.name;
    // currentPlayer.color = p.lp.color;
    // currentPlayer.password = p.lp.password;


    function pushUser(p, cid) {
        currentPlayer.score = snakeLength;

        let exist = false;

        if (!p) p = [];

        p.forEach((val, key) => {
            if (val.id == cid.id) {
                exist = true;
            }
        });


        if (!exist) { // Do when DO NOT exist
            p.push(currentPlayer);
            localStorage.setItem("players", JSON.stringify(p));
        } else if(currentPlayer.id != -1)
            p[(parseInt(currentPlayer.id) - 1)].score = currentPlayer.score;


        return p;
    }

    function swap(arr, a, b) {
        let temp = arr[a];
        arr[a] = arr[b];
        arr[b] = arr[temp];
    }

    function listPlayers(p) {
        let b;

        for(let i = 0; i < p.length - 1; i++) {
            for (let j = i + 1; j < p.length; j++) {
                if (p[j].score > p[i].score) {
                    b = p[j];
                    p[j] = p[i];
                    p[i] = b;
                }
            }
        }

        let li, text;

        p.forEach((val, key) => {
            li = document.createElement("li");
            text = document.createTextNode(val.name + " " + val.score);
            li.appendChild(text);
            document.querySelector('ol').appendChild(li);
        });
        return p;
    }

    const socket = io('http://localhost:8000');
    socket.on("snakeUpdate", (move)=>{
        // HMM
    });

    p.keyPressed = () => {
        // socket.emit("snakeUpdate", { moveX, moveY });
        let lastMove = [];
        move.forEach((val, key) => {
            if (val) lastMove[key] = true;
        });

        move.forEach((val, key) => {
            move[key] = false;
        });
        if (keyCode === RIGHT_ARROW && !lastMove[1]) move[0] = true;
        else if (keyCode === LEFT_ARROW && !lastMove[0]) move[1] = true;
        else if (keyCode === UP_ARROW && !lastMove[3]) move[2] = true;
        else if (keyCode === DOWN_ARROW && !lastMove[2]) move[3] = true;
        else {
            lastMove.forEach((val, key) => {
                if (val) move[key] = true;
            });
        }
    }


    let moveX = [];
    let moveY = [];

    let move = [
        false,
        false,
        true,
        false
    ];

    let snakeLength = 1;

    // moveX[1] = moveY[1] = 195;
    moveX[0] = moveY[0] = 180;


    function drawSnake(l) {
        for(let i = 0; i < l; i++){
            if(i === 0) {
                p.fill(currentPlayer.color);
                p.ellipse((moveX[(l - i)] + 8), (moveY[(l - i)] + 8), 15, 15);
            } else {
                p.fill(255, 0, 0);
                p.rect(moveX[(l - i)], moveY[(l - i)], 15, 15);
            }
        }
    }

    function randomTreat() {
        setTimeout(() => {
            if (randomX == -15) {
                randomX = Math.floor(Math.random()*29)*15;
                randomY = Math.floor(Math.random()*29)*15;
            }
        }, Math.floor(Math.random()*5000));
        p.fill(0, 255, 0);
        p.rect(randomX, randomY, 15, 15);
    }
    let an = document.querySelector('#score');
    let am = document.querySelector('#score-fade');
    function treatEat() {
        if (moveX[snakeLength] == randomX && moveY[snakeLength] == randomY) {
            randomX = randomY = -15;
            snakeLength++;
            am.style.transition = "0.5s all ease";
            an.style.transform = "translateY(20px) rotateZ(-30deg) rotateX(-50deg)";
            am.style.transform = "translateY(-20px) rotateZ(30deg) rotateX(50deg)";
            setTimeout(() => {
                am.style.opacity = "0";
            }, 100);
            setTimeout(() => {
                // am.style.opacity = "0";
                an.style.transition = "0.5s all ease";
                an.style.transform = "translateY(0px)"
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

            p.frameRate(++fr);
        }
    }

    function selfEat(x, y) {
        for(let i = 0; i < (x.length - 1); i++) {
            if (x.length > 4) {
                if (((x[i] == x[(x.length - 1)])) && ((y[i] == y[(y.length - 1)]))) {
                    // gameOver();
                }
            }
        }
    }

    let randomY;
    let randomX = randomY = -15;
    p.draw = () => {

        // We count calls of draw() function
        ++draws;
        p.background(23, 204, 112);

        // Treat appear!
        randomTreat();

        // Grid!
        grid(15, 435, 435);

        if (move[0]) x += 15; // Right
        if (move[1]) x -= 15;  // Left
        if (move[2]) y -= 15; // Up
        if (move[3]) y += 15; // Down

        moveX[snakeLength] = x;


        moveY[snakeLength] = y;


        treatEat();

        selfEat(moveX, moveY);


        if (moveX[snakeLength] == -15 || moveX[snakeLength] == 435) {
            gameOver();
        } else if (moveY[snakeLength] == -15 || moveY[snakeLength] == 435) {
            gameOver();
        } else {
            if (snakeLength == 1)
                setTimeout(() => drawSnake(snakeLength), 1000);
            else
                drawSnake(snakeLength);
            moveX.splice(0, moveX.length - snakeLength);
            moveY.splice(0, moveY.length - snakeLength);
        }
    }

    // let g;
    // p.myCustomRedrawAccordingToNewPropsHandler = (props) => {
    //     g = props.git;
    // }
    // setTimeout(() => console.log(`currentPlayer: ${Object.keys(g)}`), 1000);

}