const socket = io('http://localhost:5297')
const messageContainer = document.getElementById('messages')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-textarea')

window.onload = () => {
  socket.emit('initialize-user', { userToChatId: messageInput.dataset.usertochat, userId: messageInput.dataset.id })
}

let currentUser, userToChat

socket.on('users', data => {
  currentUser = data.currentUser
  userToChat = data.userToChat

  let messages = data.messages

  console.log("hello from user-room")
})

messageForm.addEventListener('submit', e => {
  e.preventDefault();
  const message = messageInput.value

  console.log(message)

  // appendMessage(`${message}`)
  
  socket.emit('new-message', { firstUser: currentUser, secondUser: userToChat, content: message })

  messageInput.value = ''
})

socket.on('send-new-message', data => {
  appendMessage(data.message.content, data.creator)
})

function appendMessage(message, creator) {
  let template = ` <li class="d-flex justify-content-between mb-4">
  <img src="https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png" alt="avatar"
    class="rounded-circle d-flex align-self-start me-3 shadow-1-strong" width="60">
  <div class="card">
    <div class="card-header d-flex justify-content-between p-3">
      <p class="fw-bold mb-0">${creator}</p>
    </div>
    <div class="card-body">
      <p class="mb-0">
        ${message}
      </p>
    </div>
  </div>
</li>`

  messageContainer.innerHTML += template
}

// socket.on('user-connected', name => {
//   appendMessage(`${name} connected`)
// })

// socket.on('user-disconnected', name => {
//   appendMessage(`${name} disconnected`)
// })

/*
 <li class="d-flex justify-content-between mb-4">
    <div class="card w-100">
      <div class="card-header d-flex justify-content-between p-3">
        <p class="fw-bold mb-0">Lara Croft</p>
        <p class="text-muted small mb-0"><i class="far fa-clock"></i> 13 mins ago</p>
      </div>
      <div class="card-body">
        <p class="mb-0">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
          laudantium.
        </p>
      </div>
    </div>
    <img src="https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png" alt="avatar"
      class="rounded-circle d-flex align-self-start ms-3 shadow-1-strong" width="60">
  </li>
*/