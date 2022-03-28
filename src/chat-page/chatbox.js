let existingChat = "";



function sendMessage() {
    let newChat = document.getElementById("chatIn").value;
    existingChat = existingChat + "\r\n" + newChat;
    scrollDown();
    document.getElementById("chatOut").innerHTML = existingChat;
    document.getElementById("chatIn").value = "";
}

function scrollDown() {
    let newChat = document.getElementById("chatIn")
    newChat.scrollTop = newChat.scrollHeight;
}