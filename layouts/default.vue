<template>
  <!-- <v-app> -->
  <!-- <v-content class="pa-0 ma-0"> -->
  <div class="w-full p-0 m-0 text-base antialiased leading-normal overflow-hidden">
    <!-- <Navbarorig
      :is-main-page="checkIfMainPage()"
      :anchor-navigation-links="_anchorNavigationLinks"
      :scroll-navigation-links="_scrollNavigationLinks"
    /> -->
    <!-- <Nuxt /> -->
    <!-- <TheFooter /> -->
    <!-- <Navbar /> -->
    <Nuxt />
    <!-- <AppFooter /> -->
    <Infomodal
      v-if="showInfoModal"
      @close="hideInfoModal"
    />

    <Notification />

    <button class="info-btn-container no-outline" @click="showInfoModal = toggleInfoModal()">
      <NuxtLink :to="'#info'" />
      <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none" /><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" /></svg>
    </button>
    <client-only placeholder="Loading...">
      <drone-tone-low />
    </client-only>
  </div>
  <!-- </v-content> -->
  <!-- </v-app> -->
</template>

<script>
// import { mapState } from 'vuex'
import DroneToneLow from '@/components/Tone/FMDroneToneLow'

export default {
  components: {
    // Navbar: () => import('~/components/Navbar'),
    Infomodal: () => import('~/components/InfoModal'),
    Notification: () => import('~/components/Notification'),
    DroneToneLow
  },
  data() {
    return {
      showInfoModal: false
      // isMainPage: false
      // displaySidenav: false,
      // anchorNavigationLinks: [],
      // scrollNavigationLinks: [],
    }
  },
  watch: {
    $route(to) {
      this.checkForHash(to)
      // this.checkIfMainPage()
      // this.setNavLinks()
    }
  },
  mounted() {
    this.checkForHash(this.$route)
    // this.setNavLinks()
  },
  // head() {
  //   return this.$nuxtI18nSeo()
  // },
  methods: {
    toggleInfoModal() {
      if (!this.showInfoModal) this.$router.push(`${this.$route.path}#info`)
      else this.hideInfoModal()
    },
    hideInfoModal() {
      this.showInfoModal = false
      if (history.length > 2) {
        this.$router.back()
      } else {
        // eslint-disable-next-line no-console
        console.log('this.$route.path ', this.$route)
        this.$router.push(this.$route.path)
      }
    },
    checkForHash(to) {
      // console.log(to) // eslint-disable-line no-console
      this.showInfoModal = to.hash.includes('info')
      // this.showInfoModal = true
    }
    // checkIfMainPage: function (state) {
    //   const links = ['pages.legal', 'pages.privacy', 'pages.disclaimer']
    //   this.isMainPage = links.every((pageName) => {
    //   // this.isMainPage = state.app.subPages.every((pageName) => {
    //     // return this.$route.path.indexOf(`/${pageName}`) === -1
    //     // console.log(this) // eslint-disable-line no-console
    //     console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&') // eslint-disable-line no-console
    //     // console.log(`/${this._i18n.t(`pages.${pageName}`)}`) // eslint-disable-line no-console
    //     console.log(this._i18n.t(pageName)) // eslint-disable-line no-console
    //     console.log(this.$route.path.indexOf(`/${this._i18n.t(pageName)}`)) // eslint-disable-line no-console
    //     console.log(this.$route.path.indexOf(`/${this._i18n.t(pageName)}`) === -1) // eslint-disable-line no-console
    //     return this.$route.path.indexOf(`/${this._i18n.t(pageName)}`) === -1
    //     // return this.$route.path.indexOf(`/${this._i18n.t(`pages.${pageName}`)}`) === -1
    //   })
    //   console.log(`CALLED=> checkIfMainPage: ${this.isMainPage}`) // eslint-disable-line no-console
    //   return this.isMainPage
    // }
    // checkIfMainPage: function () {
    //   const links = ['pages.legal', 'pages.privacy', 'pages.disclaimer']
    //   return links.every((pageName) => {
    //   // this.isMainPage = links.every((pageName) => {
    //   // this.isMainPage = state.app.subPages.every((pageName) => {
    //     // return this.$route.path.indexOf(`/${pageName}`) === -1
    //     console.log(this._i18n.t(pageName)) // eslint-disable-line no-console
    //     console.log(this.$route.path.indexOf(`/${this._i18n.t(pageName)}`)) // eslint-disable-line no-console
    //     console.log(this.$route.path.indexOf(`/${this._i18n.t(pageName)}`) === -1) // eslint-disable-line no-console
    //     return this.$route.path.indexOf(`/${this._i18n.t(pageName)}`) === -1
    //     // return this.$route.path.indexOf(`/${this._i18n.t(`pages.${pageName}`)}`) === -1
    //   })
    //   // console.log(`CALLED=> checkIfMainPage: ${this.isMainPage}`) // eslint-disable-line no-console
    //   // return this.isMainPage
    // }
  }
  // computed: {
  //   checkIfMainPage: function () {
  //     const links = ['pages.legal', 'pages.privacy', 'pages.disclaimer']
  //     return links.every((pageName) => {
  //     // this.isMainPage = links.every((pageName) => {
  //     // this.isMainPage = state.app.subPages.every((pageName) => {
  //       // return this.$route.path.indexOf(`/${pageName}`) === -1
  //       console.log(this._i18n.t(pageName)) // eslint-disable-line no-console
  //       console.log(this.$route.path.indexOf(`/${this._i18n.t(pageName)}`)) // eslint-disable-line no-console
  //       console.log(this.$route.path.indexOf(`/${this._i18n.t(pageName)}`) === -1) // eslint-disable-line no-console
  //       return this.$route.path.indexOf(`/${this._i18n.t(pageName)}`) === -1
  //       // return this.$route.path.indexOf(`/${this._i18n.t(`pages.${pageName}`)}`) === -1
  //     })
  //     // console.log(`CALLED=> checkIfMainPage: ${this.isMainPage}`) // eslint-disable-line no-console
  //     // return this.isMainPage
  //   }
  // }
}
</script>

<style>
  html{
    font-weight: lighter;
  }
  body {
    margin: 0px;
    color: #000000;
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-family: 'PT Serif', serif;
    color: #000;
    outline: none;
  }

  @font-face {
    font-family: 'NimbusSansNovusT';
    src: url('~static/fonts/NimbusSansNovusT-Regular.woff') format('woff'), /* Modern Browsers */
         url('~static/fonts/NimbusSansNovusT-Regular.ttf') format('truetype'); /* Safari, Android, iOS */
         /*url('./fonts/NimbusSansNovusT-Regular.svg#NimbusSansNovusT-Regular') format('svg');  Legacy iOS */
    font-style: normal;
    font-weight: normal;
    text-rendering: optimizeLegibility;
}

.no-outline{
  outline: none;
}

.no-outline:focus,.no-outline:active{
  outline: none;
}

.info-btn-container{
  position: fixed;
  right: 15px;
  bottom: 30px;
  z-index: 9999;
  opacity: 0.8;
  padding:1rem;
}

.info-btn-container:hover{
  opacity: 1;
}

.info-btn-container svg{
  fill: black;
}

.standard-font {
  /* font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; */
    font-family: 'NimbusSansNovusT';
    /* font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; */
}
  /* * {
    border-color: blue;
    border-style: dashed;
    border-width: 1px;
  } */

</style>
