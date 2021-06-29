<template>
  <main
    v-if="this.$store.getters['websocket/getLogs'].length > 0"
    class="shadow-md notification-container fixed pin-t w-screen text-secondary align-middle h-auto p-2 bg-white transition-all-500 absolute"
  >
    <div
      class="flex justify-center"
    >
      <!-- WEBSOCKET NOTIFICATION -->
      <div class="z-10">
        <!-- <p>NEW CRYSTAL RECEIVED</p> -->
        <nuxt-link class="nav-item" :to="`/network`">
          <button
            class="buttonbox standard-font py-2 px-4 no-outline"
            @click.prevent="fastForwardToNetworks"
          >
            NEW CRYSTAL RECEIVED
          </button>
        </nuxt-link>
      </div>
      <!-- WEBSOCKET NOTIFICATION -->
    </div>
  </main>
</template>

<script>
export default {
  methods: {
    init() {
      this.$store.commit('app/SET_SELECTED_PARTNER', null)
    },
    fastForwardToNetworks() {
    //   const crystals = await this.$store.dispatch('app/getUserCrystals')
    //   this.$store.commit('meta/setCrystals', crystals.data)

      this.init()
      this.$store.commit('websocket/clearLogs')
      this.$router.push('/network')
    }
  }
}
</script>

<style scoped>
.buttonbox {
  width: 80vw;
  max-width: 500px;
  height: 50px;
  border-color: #00024e;
  border-width: 1px;
  color: #00024e;
  background-color:white;
  border-radius: 25px;
  background: rgb(172,172,172);
  background: linear-gradient(270deg,rgba(144,255,231,1) 0%,  rgba(250,250,250,1) 100%);
  -moz-transition: width 0.1s ease;
  -webkit-transition: width 0.1s ease;
  -o-transition: width 0.1s ease;
  transition: width 0.1s ease;
}

.buttonbox:hover{
  background:rgba(144,255,231,1);
  /* width: 250px; */
}

.buttonbox:disabled, .close-modal-btn:disabled{
  width: 200px;
  background:grey;
  opacity: 0.8;
}
.notification-container{
    background: rgba(0, 0, 0, 0.5);
    text-align: center;
}
</style>
