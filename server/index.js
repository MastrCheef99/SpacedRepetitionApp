const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io')
const sqlite3 = require('sqlite3').verbose();


const app = express();
const server = createServer(app);
const io = new Server(server);
const dbPath = 'main.db';

const db = new sqlite3.Database(dbPath);

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL
  )
`;

db.serialize(() => {
    db.run(createTableQuery, (err) => {
      if (err) {
        console.error('Error creating table:', err.message);
      } else {
        console.log('Table created successfully.');
      }
    });
});

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});
app.use(express.static(__dirname));

io.on('connection', (socket) => {
    let currentusr, currentpwd;

    socket.on('username', (usr) => {
        currentusr = usr;
        console.log("Username: ", usr);
        checkAndInsert(); // Check after username update
    });

    socket.on('password', (pwd) => {
        currentpwd = pwd;
        console.log("Password: ", pwd);
        checkAndInsert(); // Check after password update
    });

    // Move the check and insert logic into a function
    function checkAndInsert() {
        if (currentusr && currentpwd) {
            // Check if the username exists before inserting
            doesUsernameExist(db, currentusr, (exists) => {
                if (exists) {
                    console.log(`Username "${currentusr}" already exists.`);
                    socket.emit('registration-error', 'Username already exists.');
                    return;
                }

                // If username does not exist, insert into the database
                const sql = `INSERT INTO users (username, password) VALUES (?, ?)`;
                db.run(sql, [currentusr, currentpwd], function(err) {
                    if (err) {
                        console.error('Error inserting data:', err.message);
                        socket.emit('registration-error', err.message);
                        return;
                    }
                    console.log(`User added with ID: ${this.lastID}`);
                    socket.emit('registration-success', this.lastID);
                });
            });
        } else {
            socket.emit('incomplete'); // Notify incomplete information
        }
    }

    // Function to check if a username exists
    function doesUsernameExist(db, username, callback) {
        const sql = `SELECT 1 FROM users WHERE username = ? LIMIT 1`;
        db.get(sql, [username], (err, row) => {
            if (err) {
                console.error('Error checking username:', err.message);
                callback(false); // Return false on error
                return;
            }
            callback(!!row); // Return true if row exists, false otherwise
        });
    }
});

io.on('connection', (socket)=>{
  let loginusr, loginpass;
  socket.on('loginuser', (loginusername)=>{
    loginusr = String(loginusername);
    console.log("Logging in ", loginusername);
  });
  socket.on('loginpass', (loginpassword)=>{
    loginpass = String(loginpassword);
    console.log("Logging in a user with password ", loginpassword);
    checkAndLogin();
  });
  function checkAndLogin(){
    if (loginusr && loginpass){
      const sql = `SELECT password FROM users WHERE username = ? LIMIT 1`;
      db.get(sql, [loginusr], (err, output)=>{
        correctpass = String(output.password)
        if(loginpass == correctpass){
          socket.emit('redirect', '/login.html');
        }
      });
    }
  }
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});