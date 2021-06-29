// const WebSocket = require('ws')
const WebSocket = require('isomorphic-ws')

export const state = () => ({
  websocketUrl: `${process.env.wssUrl}`,
  socket: null,
  connected: false,
  message: '',
  logs: []
})

export const getters = {
  connected: state => state.connected,
  websocketUrl: state => state.websocketUrl,
  getLogs: state => state.logs
}

export const mutations = {
  setConnected(state, status) {
    state.connected = status
  },
  addLogs(state, data) {
    state.logs.push({ event: 'Received message', data })
    // console.log(state.logs) // eslint-disable-line no-console
  },
  clearLogs(state) {
    state.logs = []
  },
  setSocket(state, socket) {
    state.socket = socket
  }
}

export const actions = {
  connect({ rootGetters, state, commit, dispatch }) {
    if (state.connected || !rootGetters['auth/getToken']) return
    // this.socket = new WebSocket('wss://echo.websocket.org')
    console.log('WebSocket connection attempt to', state.websocketUrl) // eslint-disable-line no-console

    this.socket = new WebSocket(state.websocketUrl)
    console.log('socket -> ', this.socket) // eslint-disable-line no-console
    commit('setSocket', this.socket)

    this.socket.onopen = () => {
      commit('setConnected', true)
      console.log('WebSocket CONNECTED') // eslint-disable-line no-console
      // Construct a msg object containing the data the server needs to process the message from the chat client.
      // user_id: rootGetters['meta/getUser'].id
      const msg = {
        user_id: rootGetters['auth/getToken'].id
      }

      // Send the msg object as a JSON-formatted string.
      console.log('WebSocket init ', JSON.stringify(msg)) // eslint-disable-line no-console
      this.socket.send(JSON.stringify(msg))

      this.socket.onmessage = async ({ data }) => {
        const parsed = JSON.parse(data)
        console.log('WebSocket MESSAGE RECEIVED', parsed) // eslint-disable-line no-console
        if (parsed.crystal && parsed.success === true) {
          commit('addLogs', parsed)
          const crystals = await dispatch('app/getUserCrystals', null, { root: true })
          console.log('KRISTALYOK WEBSOKETBOL ', crystals) // eslint-disable-line no-console

          commit('meta/setCrystals', crystals.data, { root: true })
        }
      }
      this.socket.onerror = ({ error }) => {
        console.log('WebSocket ERRROR') // eslint-disable-line no-console
        console.log(error) // eslint-disable-line no-console
        commit('setConnected', false)
      }
    }
  },
  disconnect({ state, commit }) {
    this.socket.close()
    commit('setConnected', false)
    this.logs = []
  },
  sendMessage({ state, commit, e }) {
    this.socket.send(this.message)
    this.logs.push({ event: 'Sent message', data: this.message })
    this.message = ''
  }
}
