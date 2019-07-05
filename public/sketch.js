
/*function setup () {
  // let canvas = createCanvas(4, 4);
  // canvas.parent('canvas-box');
  // background(23, 204, 112);
  // background(0, 0, 0);
  // frameRate(0);
  // document.querySelector("#defaultCanvas0").style.display = "none";
  // document.querySelector("#canvas-box").style.display = "none";
}*/

let fr = 0; // Turn on/off canvas
function gameBegin() {

  document.querySelector("#defaultCanvas0").style.display = "block";
  document.querySelector('#score').parentElement.style.display = "block";
  // frameRate(1);
}


let x = y = 210, draws = -1;

let players = 0;
fetch('http://localhost:3005/api')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    players = data;
    // renderStartPlayers(data);
  });


function grid(a, x, y) {
  for(let canvasX = a, canvasY = a; canvasX <= x; canvasX += a, canvasY +=a) {
    stroke(137, 250, 127)
    line(canvasX, 0, canvasX, x);
    line(0, canvasY, y, canvasY);
  }
}
let stop


function gameOver() {
  let i = 0
  let redTim = greenTim = 0;

  function gameOverText() {
    textSize(34);
    fill(255);
    text('Game Over!', 120, 220);
  }

  function red(color) {
      background(255, 0, 0);
      green();
      gameOverText();
  }

  function green() {
    greenTim = setTimeout(() => {
      background(0, 255, 0);
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
let currentPlayer = {"id": -1, "name": "", "score": 0, "color": undefined, "password": ""};

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

/*const socket = io('http://localhost:8000');
socket.on("snakeUpdate", (move)=>{
  // HMM
});*/

// function keyPressed() {
//   // socket.emit("snakeUpdate", { moveX, moveY });
//   let lastMove = [];
//   move.forEach((val, key) => {
//     if (val) lastMove[key] = true;
//   });
//
//   move.forEach((val, key) => {
//     move[key] = false;
//   });
//   if (keyCode === RIGHT_ARROW && !lastMove[1]) move[0] = true;
//   else if (keyCode === LEFT_ARROW && !lastMove[0]) move[1] = true;
//   else if (keyCode === UP_ARROW && !lastMove[3]) move[2] = true;
//   else if (keyCode === DOWN_ARROW && !lastMove[2]) move[3] = true;
//   else {
//     lastMove.forEach((val, key) => {
//       if (val) move[key] = true;
//     });
//   }
// }

function drawSnake(l) {
  for(let i = 0; i < l; i++){
    if(!i) {
      fill(currentPlayer.color);
      ellipse((moveX[(l - i)] + 8), (moveY[(l - i)] + 8), 15, 15);
    } else {
      fill(255, 0, 0);
      rect(moveX[(l - i)], moveY[(l - i)], 15, 15);
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
  fill(0, 255, 0);
  rect(randomX, randomY, 15, 15);
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

    // frameRate(++fr);
  }
}

function selfEat(x, y) {
  for(let i = 0; i < (x.length - 1); i++) {
    if (x.length > 4) {
      if (((x[i] == x[(x.length - 1)])) && ((y[i] == y[(y.length - 1)]))) {
        gameOver();
      }
    }
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

let randomX = randomY = -15;
function draw() {

  // We count calls of draw() function
  // ++draws;
  // background(23, 204, 112);

  // Treat apper!
  // randomTreat();

  // Grid!
  // grid(15, 435, 435);

  // if (move[0]) x+= 15; // Right
  // if (move[1]) x-= 15;  // Left
  // if (move[2])  y -= 15; // Up
  // if (move[3]) y += 15; // Down
//
  // moveX[snakeLength] = x;
//
  // moveY[snakeLength] = y;


  // treatEat();

  // selfEat(moveX, moveY);



  /*if (moveX[snakeLength] == -15 || moveX[snakeLength] == 435) {
    // gameOver();
  } else if (moveY[snakeLength] == -15 || moveY[snakeLength] == 435) {
    // gameOver();
  } else {
    // drawSnake(snakeLength);
    // moveX.splice(0, moveX.length - snakeLength);
    // moveY.splice(0, moveY.length - snakeLength);
  }*/

  // console.log(moveX);
}

/*
*
* End of snake code
* --------------------------
* Interface code
**/

function showLeaderboard() {
  document.querySelector("#leader-board-wrapper").style.display = "block";
  document.querySelector("#leader-board").style.display = "block";
  document.querySelector("#leader-board").style.height = document.querySelector("#leader-board").scrollHeight + "px";
}


for (let close of document.querySelectorAll('.close')) {
  close.addEventListener("click", () => closePopup(close.parentElement));
}

document.querySelectorAll('.popup')[0].firstElementChild.addEventListener("click", () => {
  location.reload();
});

function closePopup(a) {
  a.style.height = a.scrollHeight + "px";
  setTimeout(() => {
    a.style.marginLeft = "444px";
    a.style.height = "100px";
    // close.style.width = "0px";
    a.style.opacity = "0";
  }, 10);
  setTimeout(() => {
    a.style.display = "none";
    a.parentElement.style.display = "none";
  }, 500);
}

// Add player
/*document.querySelector('#submit-name').addEventListener("click", () => {
  currentPlayer.name = document.querySelector("#name-input").value;
  document.querySelector('#user-name').innerHTML = currentPlayer.name;
  currentPlayer.id = (players) ? players.length + 1 : 1;
  closePopup(document.querySelector('#game-begin'));
  // gameBegin();
});*/


setTimeout(() => {
  // renderStartPlayers(players);
}, 0);

// Make players clickable
function click() {
  const userss = document.querySelectorAll('.floating-user');
  userss.forEach((val, a) => {
    if (a != (document.querySelectorAll('.floating-user').length - 1)) { // To skip add button
      val.addEventListener('click', (e) => {
        const passwordInput = document.querySelector('#login-panel input[type="password"]');
        /*Here we add unblur class, to not hide panel, while switching
        * through users
        */
        // passwordInput.classList.add('unblur');
        document.querySelector("#welcome-name").innerHTML = '';
        currentPlayer.id = players[(parseInt(e.target.getAttribute("id") || e.target.parentNode.getAttribute("id")))-1].id;
        currentPlayer.name = players[(parseInt(e.target.getAttribute("id") || e.target.parentNode.getAttribute("id")))-1].name;
        currentPlayer.color = players[(parseInt(e.target.getAttribute("id") || e.target.parentNode.getAttribute("id")))-1].color;
        currentPlayer.password = players[(parseInt(e.target.getAttribute("id") || e.target.parentNode.getAttribute("id")))-1].password;
        document.querySelector('#user-name').innerHTML = currentPlayer.name;
        // setTimeout(() => {
        //     passwordInput.classList.remove('unblur');
        // }, 1000);
        login(e.target);
      });
      /*val.addEventListener("dblclick", (e) => {
        currentPlayer.id = players[(parseInt(e.target.getAttribute("id") || e.target.parentNode.getAttribute("id")))-1].id;
        currentPlayer.name = players[(parseInt(e.target.getAttribute("id") || e.target.parentNode.getAttribute("id")))-1].name;
        currentPlayer.color  = players[(parseInt(e.target.getAttribute("id") || e.target.parentNode.getAttribute("id")))-1].color;
        document.querySelector('#user-name').innerHTML = currentPlayer.name;
        closePopup(document.querySelector('#game-begin'));
        gameBegin();
    });*/
    }
  });
}

// document.querySelector('#login-panel').addEventListener('click', (e) => {
//   document.querySelector('#login-panel input[type="password"]')
//     .classList.add('unblur');
// });



// document.querySelector('#login-panel input[type="password"]').addEventListener('blur', (e) => {
//   blurCloseLogin(e);
// });

// function blurCloseLoginNewUser(a, b) {
//   setTimeout(() => {
//     console.log("Target: " + a.target);
//     if (!(/.*unblur.*/.test(a.target.classList))) {
//       // loginPanel.style.height = 0;
//       // loginPanel.style.display = 'none';
//       document.querySelector('#add-user').style.display = 'none';
//     } else {
//       a.target.classList.remove('unblur');
//       a.target.focus();
//     }
//   }, 0);
// }

// function blurCloseLogin(a) {
//   const loginPanel = document.querySelector('#login-panel');
//   setTimeout(() => {
//     // If passwordInput don't have unblur class
//     if (!(/.*unblur.*/.test(passwordInput.classList))) {
//       loginPanel.style.height = 0;
//       loginPanel.style.display = 'none';
//     } else {
//       passwordInput.classList.remove('unblur');
//       passwordInput.focus();
//     }
//   }, 150);
// }

function login(a) {

}




document.querySelector("body").addEventListener("keydown", () => {
  setTimeout(() => {
    if (document.querySelector("#name").value.length > 2) {
      // document.querySelector("#submit-name").style.background = "rgb(247, 64, 64)";
      // document.querySelector("#submit-name").style.color = "white";
      document.querySelector("#welcome-name").innerHTML = document.querySelector("#name").value;
    } else {
      // document.querySelector("#submit-name").style.background = "white";
      document.querySelector("#welcome-name").innerHTML = '';
      // document.querySelector("#submit-name").style.color = "black";
    }
  }, 5);
});



function randomColor() {
  // return `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
  return `rgb(255, 45, ${(Math.random() * 50) + 70})`;
  // Math.random() * (max - min) + min
}

function colorUsers() {
  const users = document.querySelectorAll('.floating-user');
  users.forEach((val, key) => {
    if (key < players.length) {
      if (players[key].color && players[key]){
        val.style.background = players[key].color;
        val.style.boxShadow = `2px 1px 9px 0 ${sGetHsl(players[key].color, 30)}`;
      } else {
        let rc = randomColor();
        val.style.background = rc;
        val.style.boxShadow = `2px 1px 9px 0 ${sGetHsl(rc, 30)}`;
      }
    }
  });
}

console.log(`GET HSL: ${sGetHsl("rgb(211, 123, 54)", 20)}`)

function sGetHsl(c, p) {
  // c - color in rgb(), p - lightness to drop in %
  c = c.slice(4, c.length - 1);
  let rgb = [parseInt(c.split(",")[0]), parseInt(c.split(",")[1]), parseInt(c.split(",")[2])];
  let h = hue(color(rgb[0], rgb[1], rgb[2]));
  let s = saturation(color(rgb[0], rgb[1], rgb[2]));
  let l = lightness(color(rgb[0], rgb[1], rgb[2]));
  return `hsl(${h}, ${s}%, ${l - p}%)`;
}

function colorUsersCall(){
  let int = setInterval(() => {
    if (document.querySelectorAll('.floating-user').length) {
      console.log('GIT: ' + document.querySelectorAll('.floating-user').length);
      setTimeout(() => {
        // colorUsers();
        // document.querySelectorAll('form input').forEach((val) => {
        //   val.addEventListener('blur', (e) => {
        //     setTimeout(() => {
        //       blurCloseLoginNewUser(e);
        //     }, 0);
        //   });
        // });
        document.querySelectorAll('form input').forEach((val) => {
          val.classList.add('unblur');
        });
        document.querySelector('#add-user').addEventListener('click', () => {
          document.querySelectorAll('form input').forEach((val) => {
            val.classList.add('unblur');
          });
        });
      }, 20);
      clearInterval(int);
    }
  }, 500);
}

colorUsersCall();

function getPropertyValue(element, property) {
  // It's our own function, return value of given property of a given element
  return parseFloat(window.getComputedStyle(element).getPropertyValue(`${property}`));
}


document.querySelectorAll('.floating-user > p').forEach((val, key) => {

});

function renderStartPlayers(a) {
  let i = 0;
  const playersWrapper = document.querySelector('#users-float');
  const loginPanel = document.querySelector('#login-panel');
  const addUser = document.querySelector('#add-user');
  uDiv = document.createElement("div");
  uDiv.style.background = "rgb(49, 131, 227)";
  uDiv.addEventListener("click", (e) => {
    addUser.style.display = "block";
    loginPanel.style.display = 'none';
    loginPanel.style.height = 0;
  });
  uP = document.createElement("p");
  uP.appendChild(document.createTextNode(" + Dodaj gracza..."));
  uDiv.appendChild(uP);
  uDiv.classList.add("floating-user");
  playersWrapper.appendChild(uDiv);
  click();
}


let pickNewPlayerColor = new CP(document.querySelector('#color'));
pickNewPlayerColor.on("change", function(color) {
  this.source.style.background = `#${color}`;
  this.source.value = `rgb(${CP.HEX2RGB(color)})`;
  this.source.innerText = `rgb(${CP.HEX2RGB(color)})`;
  currentPlayer.color = `rgb(${CP.HEX2RGB(color)})`;
  // document.querySelector('#canvas-box').style.background = '#' + color;
});


document.querySelector('#sent-message-arrow').addEventListener('mouseenter', (e) => {
  e.target.style.transform = "rotateZ(60deg)";
  setTimeout(() => {
    e.target.style.transform = "rotateZ(-58deg)";
  }, 166.6);
  setTimeout(() => {
    e.target.style.transform = "rotateZ(0deg)";
  }, 333.2);
});

function sentMessage(a, sr) { // sr: sent received a: message content
  if (a) {
    hidePanel(0);
    let conv = document.querySelector('#conversation');
    let messageHolder = document.createElement('div');
    messageHolder.setAttribute('class', 'message-holder');
    let messageInput = a;
    let message = document.createElement('div');
    let messageText = document.createElement('p');
    messageText.appendChild(document.createTextNode(messageInput));
    messageInput = "GIT";
    message.style.opacity = '1';
    if (sr == 'sent') {
      message.setAttribute('class', 'chat-cloud-right chat-cloud');
      message.style.background = currentPlayer.color;
      message.style.boxShadow = `2px 1px 9px 0 ${sGetHsl(currentPlayer.color, 30)}`;
      setTimeout(() => {
        message.style.opacity = '1';
        message.style.transform = 'translateX(0px)';
      }, 20);
    }
    else if (sr == 'received') {
      message.style.boxShadow = `2px 1px 9px 0 ${sGetHsl("rgb(217, 0, 255)", 30)}`;
      message.setAttribute('class', 'chat-cloud-left chat-cloud');
      setTimeout(() => {
        message.style.opacity = '1';
        message.style.transform = 'translateX(0px)';
      }, 20);
    }
    message.appendChild(messageText);
    messageHolder.appendChild(message);
    conv.appendChild(messageHolder);
    if (getHeightOfMessages() > 348)
    document.querySelector('#conversation').style.overflowY = 'scroll';
    else
    document.querySelector('#conversation').style.overflowY = 'vivible';
    return message;
  }
}

document.querySelector('#sent-message').addEventListener('click', () => {
  // sentMessage(document.querySelector('#message-input').value, 'sent');
});

let messageTextArea = document.querySelector('#message-input');

// messageTextArea.addEventListener('keypress', (e) => {
//   console.log(e.which);
//   if (e.which == 13 && !e.shiftKey) {
//     e.preventDefault();
//     sentMessage(document.querySelector('#message-input').value, 'sent');
//   }
// });




let to;
function hidePanel(delay) {
  to = setTimeout(() => {
    const userTypingPopup = document.querySelector('#user-typing-popup');
    userTypingPopup.style.opacity = "0";
    userTypingPopup.style.transform = "translateY(20px)";
    checkIfTyping = true;
  }, delay);
}

// const socket = openSocket('http://localhost:8000');

const sent = document.querySelector('#sent-message');
const messageInput = document.querySelector('#message-input');

sent.addEventListener('click', () => {
  hidePanel(0);
  // socket.emit('chat message', messageInput.value); // here we emitting "chat message" event
  messageInput.value = "";
  return false;
});

messageInput.addEventListener('click', (e) => {
  if (!currentPlayer.name) {
    alert("You need to select user in order to send a message!");
  }
});

function loginToGame(pass) {
  // alert(`Gitarka! ${pass}`);
  if (sha256(pass.target.value) === currentPlayer.password) {

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

    alert("BOI");
    document.querySelector('#game-begin').style.borderColor = currentPlayer.color;
    document.querySelector('#game-begin').style.boxShadow = `1px 0px 20px 6px ${currentPlayer.color}`;
    document.querySelector('#close-highlight').style.background = currentPlayer.color;
    // document.querySelector('#login-panel').style.height = 0;
    document.querySelector('#login-panel').style.display = "none";
    setTimeout(() => {
      document.querySelector('#welcome-name').innerText = currentPlayer.name;
    }, 100);
    setTimeout(() => {
      document.querySelector('#close-highlight').style.background = 'rgb(247, 64, 64)';
      document.querySelector('#game-begin').style.borderColor = 'rgb(247, 64, 64)';
      document.querySelector('#game-begin').style.boxShadow = '1px 0px 5px 0px rgb(247, 64, 64)';
    }, 1000);
  } else {
    alert(':-(')
  }
}

// messageTextArea.addEventListener('keypress', (e) => { // aka on Submit
//   // Enter key code is 13
//   if (e.which == 13 && !e.shiftKey) {
//     e.preventDefault();
//     hidePanel(0);
//     sentMessage(document.querySelector('#message-input').value, 'sent');
//     // socket.emit('hide panel');
//     socket.emit('chat message', messageInput.value); // here we emitting "chat message" event
//     messageInput.value = "";
//     return false;
//   }
// });
//
// function getHeightOfMessages() {
//   let messages = document.querySelectorAll('.chat-cloud');
//   let height = 0;
//   messages.forEach((val, key) => {
//     height += (getPropertyValue(val, 'height') + 10);
//   });
//   return height;
// }
//
// let checkIfTyping = true;
//
//
// messageTextArea.addEventListener('input', (e) => {
//   const userTypingPopup = document.querySelector('#user-typing-popup');
//   socket.emit('user typing', {'id': socket.id, 'un': currentPlayer.name});
// });
//
//
// socket.on('chat message', (msg) => { // sockt receive emit from io
//   sentMessage(msg, 'received');
// });
//
// socket.on('user typing', (data) => {
//   const userTypingPopup = document.querySelector('#user-typing-popup');
//   const userTypingName = document.querySelector('#user-typing-name');
//   userTypingName.innerText = data.un;
//   // socket.emit('user typing', socket.id);
//   userTypingPopup.style.opacity = "1";
//   userTypingPopup.style.transform = "translateY(-20px)";
//   clearTimeout(to);
//   hidePanel(4000);
// });
//
// socket.on('hide panel', () => {
//   hidePanel(0);
// });

let mongoUsers;
/*________________________________*
* --------------------------------*
* ________________________________*
* SOPHISTICATED IS THE KEYWORD !!!*
* --------------------------------*
* ________________________________*
*/
// setTimeout(() => {
//   fetch('http://localhost:3000/api/users')
//     .then(function(response) {
//       return response.json();
//     })
//     .then(function(myJson) {
//       mongoUsers = myJson;
//       console.log(JSON.stringify(myJson));
//       alert(myJson[0].name);
//     });
// }, 3000);


// document.querySelector('#')
