export const connectToWebsocket = {
  // asyncData(context) {
  //   console.log("(Mixin) '" + context.route.path + "'::AsyncData: " + JSON.stringify(context.route.params)) // eslint-disable-line no-console
  // },
  // fetch(context) {
  //   console.log("(Mixin) '" + context.route.path + "'::Fetch: " + JSON.stringify(context.route.params)) // eslint-disable-line no-console
  // },
  async beforeMount() {
    // console.log('***************** [p] "', this.$router.history.current.path, '" :: B4MOUNTED *****************') // eslint-disable-line no-console
    if (this.$store.getters['auth/isAuthenticated'] && !this.$store.getters['websocket/connected']) {
      try {
        // console.log('[p] "', this.$router.history.current.path, '": connecting to websocket.....') // eslint-disable-line no-console
        await this.$store.dispatch('websocket/connect')
        // console.log('[p] "', this.$router.history.current.path, '": connected? ', this.$store.getters['websocket/connected']) // eslint-disable-line no-console
      } catch (e) {
        console.log(e) // eslint-disable-line no-console
      }
    } else {
      console.log('***************** [p] "', this.$router.history.current.path, '" :: authenticated && connected! ', (this.$store.getters['auth/isAuthenticated'] && this.$store.getters['websocket/connected'])) // eslint-disable-line no-console
    }
  },
  computed: {
    routeParams() {
      return this.$route.params
    }
  }
}
