let socket = io();

const chatOutput = document.getElementById('chat-output');
const chatNotification = document.getElementById('chat-notification');
const chatUser = document.getElementById('chat-user');
const chatMessage = document.getElementById('chat-message');
const chatSend = document.getElementById('chat-send');

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
let timeOutHandle = null;
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
