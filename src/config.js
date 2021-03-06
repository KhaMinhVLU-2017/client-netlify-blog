import openSocket from 'socket.io-client'

var api = {
  local: 'https://judasfateblog.cf/blogserver',
  network: 'http://192.168.98.109:4000'
  // local: 'https://172.16.12.148:4000'
}

const socket = openSocket(api.local, {
  path: '/blogserver/socket.io/'
})

export default { api, socket }
