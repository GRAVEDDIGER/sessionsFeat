/* eslint-disable no-undef */
const socket = io()
const messageForm = document.getElementById('messageForm')
// const buttonUser = document.getElementById('userSave')
const chatBox = document.getElementById('chatBox')
let currentUser
// socket.emit('userRequest')
// console.log('user> ', currentUser)
socket.on('userResponse', async (userFromSession) => {
  currentUser = JSON.parse(userFromSession)
  if (!currentUser) await fetch('/login')
})
socket.on('serverMessage', (messageFromServer) => {
  if (currentUser === undefined) {
    socket.emit('userRequest')
}

    let parsedMessage = []
    console.log('adadad')
    if (Array.isArray(JSON.parse(messageFromServer)))      {
 parsedMessage = JSON.parse(messageFromServer)
}    else {
      console.log('single message')
      parsedMessage.push(JSON.parse(messageFromServer))
    }

    parsedMessage.forEach((innerMessage) => {
      currentUser = currentUser || innerMessage
      console.log(innerMessage, currentUser, '****************')
      const { author, text } = innerMessage

      chatBox.innerHTML += `<div class="msgContainer ${
        author.id === currentUser.author.id ? 'derecha' : null
      }">
             <img class="imgTag" src="${author.avatar}" alt="${
        author.id
      }"><span class="msgTag"><b> ${
        author.id
      } </b></span> <span class="dateTag"> [${new Date(
        Date.now()
      ).toLocaleString()}] </span> <span class="messageTag">${text}</span>
         </div>`
    })
})

let currentMessage

messageForm.addEventListener('submit', (e) => {
  e.preventDefault()
  currentMessage = document.getElementById('messageBox').value
  console.log(currentUser)
  if (currentMessage !== undefined) {
    socket.emit('clientMessage', JSON.stringify({ text: currentMessage }))
  } else {
    alert('Dude you should be sending empty messages arround the world!!!')
  }
})
