function join() {
    localStorage.setItem('Name', document.getElementById('name').value);
    window.location.href = '/chatbox/chatroom';
}