const userForm = document.getElementById('userForm')
const getUserData = () => {
    const user = document.querySelectorAll('#userForm >input')
    return  {
      author:{[user[0].name]: user[0].value,
      [user[1].name]: user[1].value,
      [user[2].name]: user[2].value,
      [user[3].name]: user[3].value,
      [user[4].name]: user[4].value,
      [user[5].name]: user[5].value}
    }
  }
  userForm.addEventListener('submit', (e) => {
    e.preventDefault()
    getUserData()
  })
