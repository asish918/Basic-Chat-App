var socket = io();
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
});

socket.emit('joinRoom', { username, room });

socket.on('message', message => {
    outputMessage(message);

    chatMessages.scrollTop = chatMessages.scrollHeight;
});

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const mssg = e.target.elements.msg.value;
    
    socket.emit('chatMessage', mssg);

    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
});

function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
						<p class="text">
							${message.text}
						</p>`
    document.querySelector('.chat-messages').appendChild(div);
}