function join() {
    localStorage.setItem('Name', document.getElementById('name').value);
    window.location.href = '/chatbox/chatroom';
}

document.onkeydown = function (e) {
    e = e || window.event;
    switch (e.which || e.keyCode) {
          case 13 : 
          localStorage.setItem('Name', document.getElementById('name').value);
          window.location.href = '/chatbox/chatroom';
        break;
    }
}