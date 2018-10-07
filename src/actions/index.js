export function loginA (iduser, username, email, avatarLink, __Token) {
  return {
    type: 'LOGGIN',
    id_user: iduser,
    username,
    email,
    avatarLink,
    __Token
  }
}
export function logoutA () {
  return {type: 'LOGOUT'}
}