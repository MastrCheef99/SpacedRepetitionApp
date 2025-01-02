const socket = io();

const form = document.getElementById('form1');
const form2 = document.getElementById('form2');
const username = document.getElementById('username');
const password = document.getElementById('password');
const loginuser = document.getElementById('logusr');
const loginpass = document.getElementById('logpwd');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (username.value) {
        socket.emit('username', username.value)
        username.value = '';
    }
    if (password.value) {
        socket.emit('password', password.value)
        password.value = '';
    }
});

form2.addEventListener('submit', (e) => {
    e.preventDefault();
    if (loginuser.value) {
        socket.emit('loginuser', loginuser.value)
        loginuser.value = '';
    }
    if (loginpass.value) {
        socket.emit('loginpass', loginpass.value)
        loginpass.value = '';
    }
})

socket.on('incomplete', () => {
    console.log("Please enter a username and password");
});

socket.on('registration-success', (id)=>{
    console.log(id)
});

socket.on('registration-error', (err)=>{
    console.log("Error: ", err);
});

socket.on('redirect', (url) => {
    window.location.href = url; // Redirect the browser to the given URL
  });