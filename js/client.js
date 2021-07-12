
const socket = io('http://localhost:3000');

const form  = document.querySelector('#sendForm');
const container = document.querySelector('.container');
const messages = document.querySelector('#messageInp');

var join = new Audio('./joined.mp3')
var tone = new Audio('./message.mp3')

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const mass = messages.value;
    append1(`You : ${mass}`, 'right');
    socket.emit('sended', mass);
    messages.value = '';
})

const append1 = (messages, pos) => {
    const mes= document.createElement('div');
    mes.innerText = messages;
    mes.classList.add('message');
    mes.classList.add(pos);
    container.append(mes);
    if(pos=='center')
        join.play();
    if(pos=='left')
        tone.play()
}

const names = prompt("Enter Your name to join: ");
socket.emit('new-user-joined' , names)

socket.on('user-joined', data => {
    append1(`${data} joined the chat`, 'center');
})

socket.on('recieve', data => {
    append1(`${data.names}: ${data.message}`, 'left');
})

socket.on('leave', data => {
    append1(`${data} left the chat`, 'center');
})