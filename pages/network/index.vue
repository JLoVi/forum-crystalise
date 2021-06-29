<template>
  <main class="network-wrapper w-screen h-screen .inner-border">
    <div class="n-container flex flex-col self-center">
      <p class="text-1xl sm:text-3xl">
        {{ this.$store.getters['auth/getToken'].username }}
      </p>
      <h2 class="title select-none text-4xl sm:text-7xl">
        Crystal History
      </h2>
      <div class="flex standard-font flex-col items-center justify-between w-full">
        <div v-if="selectedUser && holdOn && this.$store.getters['auth/getToken'].username" class="sentcrystal standard-font">
          <div>
            Crystal sent to
          </div>
          <div>
            {{ selectedUser.username }}
          </div>
        </div>
        <tab-view
          v-if="!holdOn"
          :dataarray="getReadableCrystalArray"
        />
      </div>
      <div class="footer">
        <button class="buttonbox standard-font" @click="resetAction">
          NEW CRYSTAL
        </button>
      </div>
    </div>
    <div class="page">
      <!-- <client-only placeholder="Loading...">
        <drone-tone-low />
      </client-only> -->
    </div>
  </main>
</template>

<script>
import { mapState } from 'vuex'
// import DroneToneLow from '@/components/Tone/FMDroneToneLow'
import { hasValue } from '~/plugins/utils.js'
import { connectToWebsocket } from '~/mixins/connectToWebsocket.js'

export default {
  name: 'ThreeTest',
  components: {
    // DroneToneLow,
    TabView: () => import('~/components/TabView')
  },
  mixins: [connectToWebsocket],
  /*
  // Watch for $route.query.page to call Component methods (asyncData, fetch, validate, layout, etc.)
  watchQuery: ['page'],
  // Key for <NuxtChild> (transitions)
  key: to => to.fullPath,
  // Called to know which transition to apply
  transition(to, from) {
    if (!from) { return 'slide-left' }
    return +to.query.page < +from.query.page ? 'slide-right' : 'slide-left'
  }, */
  middleware: ['check-auth', 'auth'],
  data() {
    return {
      holdOn: false
    }
  },
  computed: {
    ...mapState({
      selectedUser: function (state) {
        if (hasValue(this.$store.getters['app/GET_SELECTED_PARTNER'])) {
          return this.$store.getters['app/GET_SELECTED_PARTNER']
        } else {
          return null
        }
      }
    }),
    getReadableCrystalArray() {
      const usrid = this.$store.getters['auth/getToken'].id
      if (this.$store.getters['meta/getCrystals']) {
        const reformattedArray = this.$store.getters['meta/getCrystals'].map((obj) => {
          // console.log(obj) // eslint-disable-line no-console
          // console.log('obj', obj) // eslint-disable-line no-console
          const rObj = {}
          rObj.sender_id = this.getUserbyId(obj.sender_id).username
          rObj.receiver_id = this.getUserbyId(obj.receiver_id).username
          rObj.category = (obj.sender_id === usrid) ? 'sent' : 'received'
          rObj.message = obj.message
          rObj.time_created = obj.time_created
          // console.log(rObj) // eslint-disable-line no-console
          return rObj
        })
        // console.log('reformattedArray', reformattedArray) // eslint-disable-line no-console
        return reformattedArray.sort(this.comparebyTime)
      } else {
        return []
      }
    }
  },
  // asyncData(context) {
  //   return context.app.$axios
  //     // .$get('/posts/'+ context.params.postId + '.json' )
  //     .$get('/projects/all/' + context.app.store.getters['app/GET_LOCALE'])
  //     .then((data) => {
  //       return {
  //         loadedPosts: data
  //       }
  //     })
  //     .catch(e => context.error(e))
  // },
  async fetch({ store, params }) {
    // if (typeof (store.state.products.byId[params.id]) === 'undefined') {
    //   return store.dispatch('products/loadProduct', { id: params.id })
    // }
    const crystals = await store.dispatch('app/getUserCrystals')
    store.commit('meta/setCrystals', crystals.data)
  },
  // async beforeMount() {
  //   console.log('***************** [p] "/network" :: B4MOUNTED *****************') // eslint-disable-line no-console
  //   if (this.$store.getters['auth/isAuthenticated'] && !this.$store.getters['websocket/connected']) {
  //     try {
  //       console.log('[p] "/network": connecting to websocket.....') // eslint-disable-line no-console
  //       await this.$store.dispatch('websocket/connect')
  //       console.log('[p] "/network": connected? ', this.$store.getters['websocket/connected']) // eslint-disable-line no-console
  //     } catch (e) {
  //       console.log(e) // eslint-disable-line no-console
  //     }
  //   } else console.log('***************** [p] "/network" :: authenticated && connected! ', (this.$store.getters['auth/isAuthenticated'] && this.$store.getters['websocket/connected'])) // eslint-disable-line no-console
  // },
  mounted() {
    // console.log(' *****************   MOUNTED  PAGE ********************') // eslint-disable-line no-console
    this.resetCrystalStoreData()
    this.counter()
  },
  methods: {
    resetCrystalStoreData() {
      this.$store.commit('app/WANNA_SEND_CRYSTAL', false)
      this.$store.commit('app/MINING_ENDED', false)
    },
    comparebyTime(a, b) {
      const bandA = Date.parse(a.time_created.trim())
      const bandB = Date.parse(b.time_created.trim())
      // console.log(bandA, ' <==> ', bandB) // eslint-disable-line no-console
      let comparison = 0
      if (bandA > bandB) {
        comparison = 1
      } else if (bandA < bandB) {
        comparison = -1
      }
      return comparison * -1
    },
    getUserbyId(id) {
      // console.log('NEW SEARCH for ', id) // eslint-disable-line no-console
      return this.$store.getters['meta/loadedPosts'].find((element) => {
        if (element.id === id) {
          // console.log('curr', element.username, ' ', element.id, ' === ', id) // eslint-disable-line no-console
          return element.username
        }
      })
    },
    resetAction() {
      this.$router.push('/')
    },
    async counter() {
      this.holdOn = true
      if (this.selectedUser) {
        await new Promise(resolve => setTimeout(resolve, 5000))
      }
      this.holdOn = false
    }
  }
}
</script>

<style scoped>
.buttonbox {
  width: 200px;
  height: 50px;
  border-color: #00024e;
  border-width: 1px;
  color: #00024e;
  background-color:white;
  border-radius: 25px;
  background: rgb(172,172,172);
  background: linear-gradient(270deg, rgba(250,250,250,1) 0%, rgba(144,255,231,1) 100%);
  -moz-transition: width 0.1s ease;
  -webkit-transition: width 0.1s ease;
  -o-transition: width 0.1s ease;
  transition: width 0.1s ease;
  outline: none;
}

.buttonbox:hover{
  background:rgba(144,255,231,1);
  width: 250px;
}

.nav-bar {
  list-style-type: none;
}

.n-container {
  text-align: center;
}

.network-wrapper{
  background: rgb(172,172,172);
  background: linear-gradient(90deg, rgba(172,172,172,1) 0%, rgba(173,255,252,1) 50%, rgba(144,255,231,1) 100%);
}

.title {
  display: block;
  font-weight: 300;
  /* font-size: 100px; */
  color: #35495e;
  letter-spacing: 1px;
  text-align: center;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.footer {
  position: absolute;
  text-align: center;
  /* top: 0; */
  bottom: 10px;
  width: 100%;
  margin: auto;
}

.midlev {
  position: absolute;
  width: 150px;
  /* height: 50px; */
  text-align: center;
  top: 0;
  bottom: 0;
  margin: auto;
}
.sentcrystal {
  animation-name: shakeError;
  animation-fill-mode: forwards;
  animation-duration: 3.0s;
  animation-timing-function: ease-in-out;
}
@keyframes shakeError {
  0% {
    transform: translateX(0);
    opacity: 0; }
  15% {
    transform: translateX(0.375rem);
    opacity: 1; }
  30% {
    transform: translateX(-0.375rem); }
  45% {
    transform: translateX(0.375rem); }
  60% {
    transform: translateX(-0.375rem);
    opacity: .8; }
  75% {
    transform: translateX(0.375rem);
    opacity: .6; }
  90% {
    transform: translateX(-0.375rem);
    opacity: .4; }
  100% {
    transform: translateX(0);
    opacity: 0; }
}

</style>
