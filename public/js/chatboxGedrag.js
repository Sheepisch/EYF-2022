//var socket = io.connect('http://xxx.hva.nl');
var socket = io();

const chatOutput = document.getElementById('chat-output'),
    chatNotification = document.getElementById('chat-notification'),
    chatUser = document.getElementById('chat-user'),
    chatMessage = document.getElementById('chat-message'),
    chatSend = document.getElementById('send');

console.log("test test");

chatSend.addEventListener('click', function(){
    socket.emit('message',{
        userName: chatUser.value,
        message: chatMessage.value
    })
});

socket.on('message', function(data){
    chatNotification.innerHTML = "";
    chatOutput.innerHTML +=
        `<p><strong>${data.userName}</strong>: ` +
        `${data.message}</p>`;
});

chatMessage.addEventListener('keypress', function(){
    socket.emit('eyf_typing',chatUser.value);
});

// define client event handler
var timeOutHandle = null;
socket.on('eyf_typing', function(data) {
    if (timeOutHandle != null) {
        clearTimeout(timeOutHandle);
    }
    chatNotification.innerHTML = `<p><em>${data} is typing a message ...</em></p>`;
    timeOutHandle = setTimeout(function(){
        timeOutHandle = null;
        chatNotification.innerHTML = "";
    },5000);
});
