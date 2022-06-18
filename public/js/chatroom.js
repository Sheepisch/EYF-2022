const socket = io();
const name = localStorage.getItem('Name');
if (name == undefined) {
    window.location.href = '/chatbox';
}
socket.emit('new-client', name + 'has joined the chat');

let toast = new Toast({
    type: 'info',
    duration: 5000,
    animate: true
});

socket.on('client', (message) => {
    toast.show(message);
});

socket.on('message', data => {
    let msg = document.createElement('div');
    msg.className = 'left-msg';
    msg.innerHTML = `<span>${data.name}: ${data.msg}</span>`;

    if(data.name == localStorage.getItem('Name')){
        msg.className = 'right-msg';
        msg.innerHTML = `<span>${data.msg}</span>`;
    } else {
        msg.className = 'left-msg';
    }
    document.querySelector('.messages').appendChild(msg);
});

function sendMessage() {
    let msg = document.getElementById('msg').value;
    socket.emit('message', {
        'name': localStorage.getItem('Name'),
        'msg': msg,
    });
    document.getElementById('msg').value = '';
}

document.onkeydown = function (e) {
    e = e || window.event;
    switch (e.which || e.keyCode) {
          case 13 : 
            let msg = document.getElementById('msg').value;
            socket.emit('message', {
                'name': localStorage.getItem('Name'),
                'msg': msg,
            });
            document.getElementById('msg').value = '';
            // sendMessage();
        break;
    }
}
