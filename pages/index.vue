<template>
  <main class="w-screen h-screen">
    <div v-if="(signedIn && !wannaSendCrystal)" class="flex justify-center w-screen h-screen">
      <p class="username-title text-1xl sm:text-3xl">
        {{ this.$store.getters['auth/getToken'].username }}
      </p>
      <h2 class="title absolute bottom select-none text-4xl sm:text-7xl">
        mining crystal
      </h2>

      <button v-if="miningEnded" class="mid-btn z-10 absolute buttonbox midlev standard-font py-2 px-4 no-outline" @click="wannaSendAction">
        SEND CRYSTAL
      </button>
      <!-- <counter v-if="signedIn" class="footer w-screen " @endedProgress="onMiningEnded" /> -->
    </div>
    <counter v-if="signedIn" class="footer w-screen " @endedProgress="onMiningEnded" />
    <!-- SHARE MODAL -->
    <div v-if="sharePrompt" class="share-modal z-50 flex justify-center w-screen h-screen">
      <button :disabled="isSending" class="mid-btn z-10 absolute buttonbox midlev standard-font py-2 px-4 no-outline" @click="sendCrystalAction()">
        <div v-if="!isSending">
          SEND
        </div>
        <div v-else>
          SENDING
        </div>
      </button>
      <button :disabled="isSending" class="close-modal-btn buttonbox standard-font absolute no-outline" @click="showSharePrompt(false)">
        CANCEL
      </button>
    </div>
    <!-- SHARE MODAL -->

    <div v-if="(signedIn && wannaSendCrystal)" class="flex flex-col items-center justify-start h-full">
      <h2 class="title select-none text-4xl sm:text-7xl">
        Share Crystal
      </h2>
      <div class="wrapper-share flex flex-col items-left h-full md:w-1/3 w-12/14 max-w-500px">
        <!-- MESSAGE -->
        <!-- <div class="outer-border w-260px sm:w-300px"> -->
        <div class="relative standard-font">
          <div class="message-title standard-font">
            MESSAGE TO PARTNER
          </div>

          <div>
            <div class="relative">
              <input v-model="message" type="message" class="message-input border-1 p-3 no-outline" placeholder="...">
            </div>
          </div>

          <div>
            <div class="relative">
              SELECT PARTNER
            </div>
          </div>
          <div>
            <div class="relative">
              <input v-model="search" type="search" class="search-box no-outline" placeholder="search...">
            </div>
          </div>
        </div>
        <!-- MESSAGE -->

        <div class="partner-list inner-border ">
          <div
            v-for="(user, index) in filteredList"
            :key="index"
            class="flex flex-row items-center justify-start max-h-12 my-4"
          >
            <!-- Partner avatar image <img :src="user.img" class="w-1/4 mr-4"> -->
            <button
              class="partner-btn"
              @click="selectAction(user); showSharePrompt(true)"
            >
              {{ user.username }}
            </button>
          </div>
        </div>

        <div class="absolute  bottom bg-white">
          <!-- <input v-model="search" type="search" class="search-box" placeholder="search..."> -->
        </div>
      </div>

      <!-- </div> -->
    </div>
    <div class="page">
      <client-only placeholder="Loading...">
        <crystal v-if="(signedIn && !wannaSendCrystal)" class="" />
        <drone-tone-low />
      </client-only>
    </div>
  </main>
</template>

<script>
import { mapState } from 'vuex'
import Crystal from '@/components/Three/Crystal'
import DroneToneLow from '@/components/Tone/FMDroneToneLow'
import Counter from '@/components/utils/Counter'
import { hasValue } from '~/plugins/utils.js'
import { connectToWebsocket } from '~/mixins/connectToWebsocket.js'

export default {
  name: 'Forum',
  components: {
    Crystal,
    DroneToneLow,
    Counter
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
      search: '',
      username: '',
      message: '',
      sharePrompt: false,
      isSending: false
    }
  },
  computed: {
    ...mapState({
      signedIn: function (state) {
        if (this.$store.getters['auth/isAuthenticated']) {
          return true
        } else {
          return false
        }
      },
      storeUserName: function (state) {
        return this.$store.getters['auth/getToken'].username
      },
      otherUsers: function (state) {
        if (hasValue(this.$store.getters['meta/loadedPosts'])) {
          const altered = this.$store.getters['meta/loadedPosts'].map(usr => ({
            id: usr.id,
            username: usr.username,
            img: 'crystal/crystals/crystal_01/Blue-1_baseTexBaked.jpg'
          }))
          return altered.filter((user) => {
            return !user.username.toLowerCase().includes(this.storeUserName.toLowerCase())
          })
        } else {
          return []
        }
      },
      wannaSendCrystal: function (state) {
        return this.$store.getters['app/DO_WANNA_SEND_CRYSTAL']
      },
      miningEnded: function (state) {
        return this.$store.getters['app/IS_MINING_ENDED']
      }
    }),
    filteredList() {
      // console.log(this.otherUsers) // eslint-disable-line no-console
      return this.otherUsers.filter((user) => {
        return user.username.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  async fetch({ store, params }) {
    if (store.getters['auth/isAuthenticated']) {
      try {
        const users = await store.dispatch('app/getUsers')
        console.log('users', users) // eslint-disable-line no-console
        store.commit('meta/setPosts', users)
      } catch (e) {
        console.log(e) // eslint-disable-line no-console
      }
    }
  },
  // async beforeMount() {
  //   console.log('***************** [p] "/" :: B4MOUNTED *****************') // eslint-disable-line no-console
  //   if (this.$store.getters['auth/isAuthenticated'] && !this.$store.getters['websocket/connected']) {
  //     try {
  //       console.log('[p] "/": connecting to websocket.....') // eslint-disable-line no-console
  //       await this.$store.dispatch('websocket/connect')
  //       console.log('[p] "/": connected? ', this.$store.getters['websocket/connected']) // eslint-disable-line no-console
  //     } catch (e) {
  //       console.log(e) // eslint-disable-line no-console
  //     }
  //   } else console.log('***************** [p] "/" :: authenticated && connected! ', (this.$store.getters['auth/isAuthenticated'] && this.$store.getters['websocket/connected'])) // eslint-disable-line no-console
  // },
  mounted() {
    // console.log('? this.$store.getters["websocket/getLogs"].length ', this.$store.getters['websocket/getLogs']) // eslint-disable-line no-console
    this.init()
  },
  methods: {
    init() {
      this.$store.commit('app/SET_SELECTED_PARTNER', null)
    },
    fastForwardToNetworks() {
      this.init()
      this.$store.commit('websocket/clearLogs')
      this.$router.push('/network')
    },
    wannaSendAction() {
      this.$store.commit('app/WANNA_SEND_CRYSTAL', true)
      this.init()
    },
    showSharePrompt(show) {
      this.sharePrompt = show
    },
    async sendCrystalAction() {
      this.isSending = true
      const user = this.$store.getters['app/GET_SELECTED_PARTNER']
      console.log('SENDING TO: ', user) // eslint-disable-line no-console
      await this.$store.dispatch('app/sendCrystal', {
        user: user,
        message: this.message
      })
        .then(async () => {
          await new Promise(resolve => setTimeout(resolve, 1000))
          this.message = ''
          // this.$store.commit('app/WANNA_SEND_CRYSTAL', false)
          // this.$store.commit('app/MINING_ENDED', false)
          this.$router.push('/network')
        })
    },
    selectAction(user) {
      console.log('app/SET_SELECTED_PARTNER ==> ', user) // eslint-disable-line no-console
      this.$store.commit('app/SET_SELECTED_PARTNER', user)
    },
    onMiningEnded() {
      if (!this.miningEnded) {
        this.$store.commit('app/MINING_ENDED', true)
      }
    }
  }
}
</script>

<style scoped>
/* .page{
  opacity: 0.5;
} */
.outer-border {
  /* border: 2px solid black; */
  position: relative;
  overflow: hidden;
}
.inner-border {
  /* position: absolute;
  left: 0; */
  overflow-x: hidden;
  overflow-y: scroll;
}
.inner-border::-webkit-scrollbar {
  display: none;
}

.select-partner{
  text-align: left;
  width:250px;
  margin-top: 30px;
}

.share-modal{
  z-index: 999;
  background: rgba(255, 255, 255, 0.8);
  width: 100vw;
  height: 100vh;
  position: absolute;
}

.message-input{
  width: 100%;
  height: 50px;
  border-color: #00024e;
  border-width: 2px;
  color: #00024e;
  background-color:white;
  border-radius: 25px;

  -moz-transition: width 0.1s ease;
  -webkit-transition: width 0.1s ease;
  -o-transition: width 0.1s ease;
  transition: width 0.1s ease;
}

/* .message-input:active, .message-input:focus{
  width: 350px;
} */

.partner-btn{
  padding: 0.8rem;
  border-color: #5ad6f3;
  border-width: 2px;
  color: #00024e;
  background-color:white;
  border-radius: 25px;
  width: 100%;
}

.partner-btn:hover{
  color: white;
  background-color:#5ad6f3;
}

.partner-list{
  /* background: #526488; */
  margin-top: 0.3rem;
  margin-bottom: 1rem;
}

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
}

.buttonbox:hover{
  background:rgba(144,255,231,1);
  width: 250px;
}

.buttonbox:disabled, .close-modal-btn:disabled{
  width: 200px;
  background:grey;
  opacity: 0.8;
}

.close-modal-btn {
  border-color: #00024e;
  border-width: 1px;
  color: #00024e;
  background-color:white;
  border-radius: 25px;

  position: absolute;
  width: 200px;
  /* height: 50px; */
  text-align: center;
  bottom: 25vh;
}

.close-modal-btn:hover {
  color: white;
  background:#00024e;
}

.notification {
  right: 0;
}
.nav-bar {
  list-style-type: none;
}

#container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex ;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  display: block;
  font-weight: 300;
  /* font-size: 100px; */
  color: #00024e;
  letter-spacing: 1px;
  font-size: 2rem;
}

.bottom{
  bottom: 0;
}

.username-title{
  color: #00024e;
  font-size: 1.5rem;
}

.subtitle {
  font-weight: 300;
  font-size: 1.5rem;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.search-box{
  padding: 0.5rem;
  width: 100%;
  border-color: #00024e;
  border-width: 2px;
  color: #00024e;
  background-color:white;
  border-radius: 25px;
}

.footer {
  position: absolute;
  text-align: center;
  /* top: 0; */
  bottom: 0;
  margin: auto;
  z-index: -999;
}

.midlev {
  position: absolute;
  width: 200px;
  /* height: 50px; */
  text-align: center;
  top: 0;
  bottom: 0;
  margin: auto;
}
</style>
