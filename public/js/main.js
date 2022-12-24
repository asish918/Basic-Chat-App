var socket = io();
const chatForm = document.getElementById('chat-form');

socket.on('message', message => {
    outputMessage(message);
});

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const mssg = e.target.elements.msg.value;
    
    socket.emit('chatMessage', mssg);
});

function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">Brad <span>9:12pm</span></p>
						<p class="text">
							${message}
						</p>`
    document.querySelector('.chat-messages').appendChild(div);
}