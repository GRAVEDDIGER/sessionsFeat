const socket =io()
const userForm = document.getElementById("userForm");
const messageForm =document.getElementById("messageForm");
const buttonUser = document.getElementById("userSave");
const chatBox = document.getElementById("chatBox");
let currentUser;
let currentMessage;
const getUserData = () => {
  const user = document.querySelectorAll("#userForm >input");
  return (currentUser = {
    author:{[user[0].name]: user[0].value,
    [user[1].name]: user[1].value,
    [user[2].name]: user[2].value,
    [user[3].name]: user[3].value,
    [user[4].name]: user[4].value,
    [user[5].name]: user[5].value}
  });
};
userForm.addEventListener("submit", (e) => {
  e.preventDefault();
  getUserData();
});
messageForm.addEventListener('submit',e=>{
    e.preventDefault();
    currentMessage=document.getElementById("messageBox").value
    if(currentUser!==undefined &&currentMessage!==undefined) 
        socket.emit('clientMessage',JSON.stringify({...currentUser,text:currentMessage}))
    else 
        alert("Failed to send message either user is not logged or message is undefined")
})

socket.on('serverMessage',(message)=>{
    const messageObj = JSON.parse(message)
    currentUser=currentUser||{id:" "}
    messageObj.forEach(innerMessage=>{
      console.log(innerMessage)
      const {author,text}=innerMessage
      chatBox.innerHTML+=`<div class="msgContainer ${(author.id===currentUser.id)? 'derecha' :null}">
      <img class="imgTag" src="${author.avatar}" alt="${author.id}"><span class="msgTag"><b> ${author.id} </b></span> <span class="dateTag"> [${new Date(Date.now()).toLocaleString()}] </span> <span class="messageTag">${text}</span>
</div>`
})
})
