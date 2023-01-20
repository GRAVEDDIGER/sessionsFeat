function objectTranspiler(userData, message) {
    return (message) ? {
        text:message.text,
        author:{
        ...userData,
        id:userData.user,
        user:undefined,
        password:undefined
      }
      } : {
        author: {
          ...userData,
          id:userData.user,
          user:undefined,
          password:undefined
        }}
}
module.exports = objectTranspiler
