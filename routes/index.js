var express = require('express');
var router = express.Router();
// const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const JSON = require('JSON');
const mysql = require('mysql');
const cors = require('cors');
const openSocket = require("socket.io-client");
const multer = require('multer');

let storage = multer.diskStorage({
  // file upload destination
  destination: (req, file, callback) => {
    callback(null, '../public/');
  },
  filename: (req, file, callback) => {
    callback(null, file.fieldname + '-' + Date.now());
  }
});

let upload = multer({ storage : storage}).single('avatar');

let connection = mysql.createConnection({
  host: 'localhost', // Don't change it !!
  user: 'root',
  password: '',
  database: 'snik_data'
});

router.get('/save-session-id', (req, res) => {
  res.cookie(
    'gitaraSiemaCookie',
    {"his is our last chance": "Suggar"},
    {expire: 100000 + Date.now()}
  );
  res.send(req.cookies);
});

router.post('/oby', (req, res) => {
  res.cookie("betterItWould", JSON.parse(req.body).first_name);
  console.log(`Gitarson: ${JSON.parse(req.body).first_name}`);
  res.send();
});

router.get('/login-user', (req, res) => {
  res.send(`Cookies: ${JSON.stringify(req.cookies.betterItWould)}`);
});


/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  // res.send('This is our front page!');
  res.sendFile(__dirname + '/index.html');
});

router.post('/new-user', (req, postRes) => {
  console.log(`POST REQUEST`);
  // console.log(Buffer.concat(req.body).toString());
  console.log(req.body);
  // connection.connect();
  connection.query('INSERT INTO users SET ?', req.body.basic, (err, res) => {
    if (err) throw err;
    console.log(res);
    connection.query('INSERT INTO profilePics SET ?', {id: res.insertId, file: req.body.pic}, (err, res) => {
      if (err) throw err;
      console.log(res);
      postRes.send("OK");
    });
  });

  upload(req, postRes, (err) => {
    if(err) {
      return res.end("Error uploading file.");
    }
  });
});

router.get("/profiles", (req, res) => {
  connection.query("SELECT name, score, color, file " +
      "FROM profilePics, users " +
      "WHERE profilePics.id = users.id", "",
      (err, data) => {
        if (err) throw err;
        res.send(data);
  });
});

router.post("/update-user/:id", (req, res) => {
  console.log(req.params);
  console.log(req.body);

  connection.query(
      `UPDATE users SET score=${req.body.score} WHERE id=${req.params.id}`, req.body, (err, res) => {
    if (err) throw err;
    console.log(res);
  });

  res.send(req.params.id)
});


router.get('/i-want-cookie', (req, res) => {
  console.log(`CIASTKO!!: ${req.cookies.io}`);
  res.send("Done");
});

function test(a) {
  console.log(a);
}

router.get("/active-users", (req, res) => {
  try {
    connection.query(
        "SELECT user_id, socket_id, activeUsers.name, color, file FROM activeUsers, users, profilePics WHERE users.id = user_id AND user_id = profilePics.id",
        "",
        (err, data) => {
      if (err) throw err;
      console.log(data);
      res.json(data);
      // connection.end();
    });
  } catch (e) {
    console.log(`Cannot get active users: ${e}`);
  }
  // res.json(proGamers);

});

router.get("/chat-bro", (req, res) => {
  const payload = { cookie: req.cookies.bro };
  res.json(payload);
});

router.get("/unload", (req, res) => {

  let socket = openSocket("http://localhost:8000");

  console.log("Before unload!");
  console.log(`Test cookie: ${req.cookies.io}`);
  try {
    connection.query(
        "DELETE FROM activeUsers WHERE socket_id = ?",
        req.cookies.io,
        (err) => {
          if (err) throw err;
          // console.log(res);
          console.log(`Disconnected user: ${req.cookies.io}`);
          socket.emit("userDisconnected");
          socket.disconnect();
          res.send("bullshit");
        }
    );
  } catch (e) {
    console.log(`Error while DELETE: ${e}`);
  }
});


let cookiesData = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  let user;

  try {
    const usr = req.body;
    user = {
      id: null,
      name: usr.name,
      user_id: req.body.id,
      connection_time_ms: 1,
      socket_id: req.cookies.io
    };
    console.log(`HMMM: ${JSON.stringify(user)}`);
  } catch (e) {
    console.log(`ONIE: ${e}`);
  }

    try {
      connection.query('INSERT INTO activeUsers SET ?', user, (err, res) => {
        if (err) throw err;
        console.log(res);
      });
    } catch (err) {
      console.log(`Error while INSERT: ${err}`);
    }
  res.send({ duckSays: "Quack you" });
}

router.post("/user-connected", cors(), cookiesData);

router.get('/api', (req, res) => {
  console.log('Hello! Cookies: ', req.cookies[0]);
  // connection.connect();
  connection.query('SELECT * FROM users', (err, response, fields) => {
    if (err) throw err;
    // fn = res;
    res.json(response);
    // connection.end();
  });
});

module.exports = router;
