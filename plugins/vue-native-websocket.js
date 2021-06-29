import VueNativeSock from 'vue-native-websocket'
import Vue from 'vue'
// import store from './store'

export default ({ app, store }) => {
  //   console.log('           VueNativeSock') // eslint-disable-line no-console
  //   console.log(Vue) // eslint-disable-line no-console
  //   console.log(VueNativeSock) // eslint-disable-line no-console
  //   console.log(process.env.wssUrl) // eslint-disable-line no-console
  //   console.log(store) // eslint-disable-line no-console
  Vue.use(VueNativeSock, process.env.wssUrl, {
    store: store,
    format: 'json',
    reconnection: true, // (Boolean) whether to reconnect automatically (false)
    reconnectionAttempts: 5, // (Number) number of reconnection attempts before giving up (Infinity),
    reconnectionDelay: 3000 // (Number) how long to initially wait before attempting a new (1000)
  })
}
