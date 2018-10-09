import openSocket from 'socket.io-client'

var api = {
  local: 'https://209.97.186.216',
  network: 'http://192.168.98.109:4000'
  // local: 'https://172.16.12.148:4000'
}

const socket = openSocket(api.local)

export default { api, socket }
