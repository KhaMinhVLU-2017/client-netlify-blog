
const defaultState = {
  id_user: null,
  username: null,
  email: null,
  __Token: null,
  shoppingcart: []
}

export default function reducer (state = defaultState, action) {
  switch (action.type) {
    case 'LOGGIN':
      return {id_user: action.id_user, username: action.username, email: action.email,avatarLink: action.avatarLink, __Token: action.__Token}
    case 'LOGOUT':
      return defaultState
    default:
      return state
  }
}
