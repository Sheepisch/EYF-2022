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
    toast.show(message, () => {});
});

socket.on('message', async data => {
    // let messagesDiv = await document.querySelector('.messages')[0];

    // messagesDiv.innerHTML += getHtml(data.name, data.msg);

    let msg = document.createElement('div');
    msg.className = 'left-msg';
    console.log(localStorage.getItem('Name'))
    if(data.name == localStorage.getItem('Name')){
        msg.innerHTML = `<span>${data.msg}</span>`;
        msg.className = 'right-msg';
    } else {
        msg.innerHTML = `<span>${data.name}: ${data.msg}</span>`;
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
    msg = '';
}

function getHtml(name, msg) {
    if (name == localStorage.getItem('Name')) {
        return `<div class="right-msg">` + 
            `<span>`+ msg + `</span></div>`;
    } else {
        return `<div class="left-msg">` + 
            `<span><b>`+ name + `</b>: ` + msg + `</span></div>`;
    }
}