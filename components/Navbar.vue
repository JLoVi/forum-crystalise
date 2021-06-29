<template>
  <!-- ************************************************** -->
  <!-- ***************  NAVBAR  ************************* -->
  <!-- ************************************************** -->
  <div
    v-scroll="handleScroll"
    :class="{
      '(1) w-full ml-0 overflow-hidden': isUncollapsed,
      '(2) w-full ml-0': !isUncollapsed
      // '(3) full-opaque': !isUncollapsed && !hoverredNav && !isUserScrollingUp,
      // '(4) mid-opaque': (!isUncollapsed && isBigScreen && isUserScrolling) && (hoverredNav || isUserScrollingUp)
    }"
    class="fixed z-10 flex flex-col transition-all-300 full-opaque"
  >
    <Consent />

    <!-- ************************************************** -->
    <!-- ***************  NAVIGATION CONTAINER ************ -->
    <!-- ************************************************** -->
    <nav
      :class="{
        '(1) flex-col content-around justify-start h-screen w-screen bg-primary': isUncollapsed,
        '(2) flex-row items-center justify-between w-full bg-transparent': !isUncollapsed,
      }"
      class="navigation-container bg-primary flex flex-wrap lg:flex-no-wrap py-0 my-0 px-0 mx-0 pin-t transition-all-500"
      @mouseover="hoverredNav = true"
      @mouseleave="hoverredNav = false"
    >
      <!-- ************************************************** -->
      <!-- ***************  MAIN LOGO SECTION    ************ -->
      <!-- ************************************************** -->
      <section
        :class="{
          // '(1) max-w-200px lg:max-w-260px xxl:max-w-400px': !isUncollapsed && isBigScreen && isMainPage && ((!isUserScrolling || hoverredNav || isUserScrollingUp  && isBigScreen))
          // '(2) max-w-60px sm:max-w-85px xxl:max-w-200px': !isUncollapsed && ((isUserScrolling && !hoverredNav && !isUserScrollingUp) || (hoverredNav && !isBigScreen && !isUserScrollingUp && isUserScrolling !== 0))
        }"
        class="logo-section w-1/4 md:w-1/6 always-on-top transition-all-500 || flex flex-row flex-nowrap items-center content-center justify-center || max-w-200px lg:max-w-260px xxl:max-w-400px"
      >
        <!-- <a :href="'/'" class="h-2/3 w-2/3 ml-auto mr-auto mx-1/6 my-1/6 transition-all-500 || _border _border-yellow">
          <CsaLogo />
        </a> -->
        <NuxtLink
          :to="localePath('index')"
          class="h-1/3 w-2/3 ml-auto mr-auto mx-1/6 my-1/24 transition-all-500 || _border _border-yellow"
          @click.native="toggleHamburger(true)"
        >
          <!-- <CsaLogo /> -->
          <!-- <img
            class="w-full max-w-500px max-h-500px ml-auto mr-auto text-center"
            :src="`\/svgs\/logos/csa_logo_${this.$i18n.locale.toUpperCase()}.svg`"
          > -->
          <img
            class="w-full max-w-206px max-h-40px ml-auto mr-auto text-center"
            :src="`\/svgs\/logos/Silvestris_logo_final-12.svg`"
          >
        </NuxtLink>
      </section>
      <!-- ************************************************** -->
      <!-- ************ MENU BAR CONTAINER BOX ************** -->
      <!-- ************************************************** -->
      <div
        :class="{
          'w-1/3 hidden justify-between lg:flex': !isUncollapsed,
          'w-1/2 flex flex-col justify-around content-center order-2 h-screen py-0 my-0 px-0 mx-0': isUncollapsed}"
        class="flex-row text-white || _border _border-yellow"
      >
        <!-- ************************************************** -->
        <!-- MENU BAR WITH SCROLLACTIVE LINKS WHEN ON MAIN PAGE -->
        <!-- ************************************************** -->
        <div v-if="isMainPage" class="w-full flex flex-row items-center justify-between || _border _border-green">
          <!-- MAIN PAGE SECTION LINKS-->
          <scrollactive
            v-for="link in scrollNavigationLinks"
            :key="link.linkName"
            active-class="active"
            :offset="120"
            :duration="600"
            bezier-easing-value=".5,0,.35,1"
          >
            <a
              class="nav-link link-text leading-none scrollactive-item text-white tk-azo-sans-web transition-all-500 p-4 outline-none"
              :class="{
                // 'text-3xs': isUserScrolling && !isUserScrollingUp,
                // 'text-xs leading-normal': !isUserScrolling || hoverredNav || isUserScrollingUp && !isUncollapsed,
                'text-lg leading-loose': isUncollapsed,
                'text-sm leading-normal': !isUncollapsed
              }"
              :href="`#${link.navLink}`"
              @click="toggleHamburger"
            >
              {{ $t(`links.${link.linkName}` ) }}
            </a>
          </scrollactive>
          <!-- CUSTOM LINKS-->
          <NuxtLink
            v-for="link in $options.links"
            :key="link"
            :to="localePath(link)"
            :class="{
              // 'text-3xs': isUserScrolling && !isUserScrollingUp,
              // 'text-xs leading-normal': !isUserScrolling || hoverredNav || isUserScrollingUp && !isUncollapsed,
              'text-lg leading-loose': isUncollapsed,
              'text-sm leading-normal': !isUncollapsed
            }"
            class="nav-link link-text leading-none text-white tk-azo-sans-web transition-all-500"
            @click.native="isUncollapsed = false"
          >
            {{ $t(`nav.${link}`) }}
          </NuxtLink>
          <!-- LOCALE LINKS-->
          <!-- <a
            v-for="(locale, index) in otherLocales"
            :key="index"
            :exact="true"
            :href="switchLocalePath(locale.code)"
            :class="{
              // 'text-3xs': isUserScrolling && !isUserScrollingUp,
              // 'text-xs leading-normal': !isUserScrolling || hoverredNav || isUserScrollingUp && !isUncollapsed,
              'text-lg leading-loose': isUncollapsed,
              'text-sm leading-normal': !isUncollapsed
            }"
            class="nav-link link-text leading-none text-white tk-azo-sans-web transition-all-500"
            @click.native="isUncollapsed = false"
          >
            {{ locale.name }}
          </a> -->
        </div>
        <!-- **************************************************** -->
        <!-- MENU BAR WITH DIRECT LINKS WHEN NOT ON THE MAIN PAGE -->
        <!-- **************************************************** -->
        <div v-if="!isMainPage" class="w-1/2 flex flex-col items-start justify-between">
          <!-- MAIN PAGE SECTION LINKS-->
          <NuxtLink
            v-for="link in scrollNavigationLinks"
            :key="link.linkName"
            class="nav-link link-text leading-none scrollactive-item text-white tk-azo-sans-web transition-all-500"
            :class="{
              // 'text-3xs': isUserScrolling && !isUserScrollingUp,
              'text-xs': !isUserScrolling || hoverredNav || isUserScrollingUp && !isUncollapsed,
              'text-lg leading-loose': isUncollapsed}"
            :to="localePath(`index`)"
            @click.native="toggleHamburger"
          >
            {{ $t(`links.${link.linkName}` ) }}
          </NuxtLink>
          <!-- <a
            v-for="link in scrollNavigationLinks"
            :key="link.linkName"
            class="nav-link link-text leading-none scrollactive-item text-white tk-azo-sans-web transition-all-500"
            :class="{
              'text-3xs': isUserScrolling && !isUserScrollingUp,
              'text-xs': !isUserScrolling || hoverredNav || isUserScrollingUp}"
            :href="`/#${link.navLink}`"
            @click="toggleHamburger"
          >
            {{ $t(`links.${link.linkName}` ) }}
          </a> -->
          <!-- CUSTOM LINKS-->
          <NuxtLink
            v-for="link in $options.links"
            :key="link"
            :to="localePath(link)"
            :class="{
              // 'text-3xs': isUserScrolling && !isUserScrollingUp,
              'text-xs': !isUserScrolling || hoverredNav || isUserScrollingUp && !isUncollapsed,
              'text-sm leading-loose': isUncollapsed}"
            class="nav-link link-text leading-none text-white tk-azo-sans-web transition-all-500"
            @click.native="isUncollapsed = false"
          >
            {{ $t(`nav.${link}`) }}
          </NuxtLink>
          <!-- LOCALE LINKS-->
          <a
            v-for="(locale, index) in otherLocales"
            :key="index"
            :exact="true"
            :href="switchLocalePath(locale.code)"
            :class="{
              // 'text-3xs': isUserScrolling && !isUserScrollingUp,
              'text-xs': !isUserScrolling || hoverredNav || isUserScrollingUp && !isUncollapsed,
              'text-lg leading-loose': isUncollapsed}"
            class="nav-link link-text leading-none text-white tk-azo-sans-web transition-all-500"
            @click.native="isUncollapsed = false"
          >
            {{ locale.name }}
          </a>
        </div>
        <!-- **************************************************** -->
        <!-- ******************* KLART SMALL LOGO *************** -->
        <!-- **************************************************** -->
        <div
          :class="{
            'flex-row-reverse': !isUncollapsed,
            'flex-row': isUncollapsed}"
          class="co_logo w-1/2 items-center flex align-end pr-4 || _border _border-pink"
        >
          <a :href="'https://www.linkedin.com/company/silvestris-&-szilas-ltd'" class="">
            <!-- <LinkdinLogo /> -->
            <img
              class="w-full max-w-206px max-h-40px ml-auto mr-auto text-center"
              :src="`\/svgs\/logos/Linkedin.svg`"
            >
          </a>
        </div>
      </div>
      <!-- ************************************************** -->
      <!-- ************* SIDE NAVIGATION TOGGLE ************* -->
      <!-- ************************************************** -->
      <div
        :class="{
          'mt-12': isUncollapsed,
          // '(1) max-w-200px lg:max-w-260px xxl:max-w-400px': !isUncollapsed && isBigScreen && isMainPage && ((!isUserScrolling || hoverredNav || isUserScrollingUp  && isBigScreen))
          // '(2) max-w-60px sm:max-w-85px xxl:max-w-200px': !isUncollapsed && ((isUserScrolling && !hoverredNav && !isUserScrollingUp) || (hoverredNav && !isBigScreen && !isUserScrollingUp && isUserScrolling !== 0))
        }"
        class="block w-1/4 md:w-1/6 lg:hidden always-on-top transition-all-500 || flex flex-row flex-nowrap items-center content-center justify-center || max-w-200px lg:max-w-260px xxl:max-w-400px"
      >
        <TheSideNavTogglePassive
          ref="hamburger"
          class="ml-auto mr-auto mx-1/6 my-1/6 transition-all-500 || _border _border-yellow"
          :minified="isUncollapsed"
          @toggle="toggleVisibility"
        />
      </div>
    </nav>
    <!-- RULER VIEW -->
    <!-- <div class="ruler-container flex flex-row flex-nowrap w-full px-0 mx-0 align-center">
      <div v-for="i in 12" :key="`1${i}`" class="w-1/12 text-sm bg-footer border border-red">
        <h2 class="px-4">
          {{ `${i}` }}
        </h2>
      </div>
    </div> -->
    <!-- / RULER VIEW -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { lg } from '~/tailwind/screens'

export default {
  name: 'Navbar',
  components: {
    Consent: () => import('~/components/Consent'),
    TheSideNavTogglePassive: () => import('@/components/navigation/TheSideNavTogglePassive')
    // CsaLogo: () => import('@/assets/svgs/logos/csa_logo.svg'),
    // KlartLogo: () => import('@/assets/svgs/logos/klart_logo.svg'),
    // LinkdinLogo: () => import('@/assets/svgs/logos/Linkedin.svg')
  },
  data() {
    return {
      isUncollapsed: false,
      hoverredNav: false,
      isBigScreen: false,
      scrollOffset: 0,
      prevScrollOffset: 0,
      fixedScrollOffset: 0,
      language: ''
    }
  },
  computed: {
    isMainPage: function () {
      const links = ['pages.legal', 'pages.privacy', 'pages.disclaimer']
      return links.every((pageName) => {
        return this.$route.path.indexOf(`/${this._i18n.t(pageName)}`) === -1
      })
    },
    ...mapState({
      _anchorNavigationLinks: function (state) {
        const _aNavLinks = []
        // console.log('_anchorNavigationLinks+++++')
        state.app.anchorNavLinks.forEach((link) => {
          const obj = {}
          obj.linkName = link
          obj.navLink = `/${this.$store.getters['app/GET_LOCALE']}/${link}`
          // console.log(obj.linkName, obj.navLink)
          _aNavLinks.push(obj)
        })
        return _aNavLinks
      },
      scrollNavigationLinks: function (state) {
        const _sNavLinks = []
        state.app.scrollNavLinks.forEach((link) => {
          const obj = {}
          obj.linkName = link
          // obj.navLink = this.isMainPage() ? `${link}` : `/${this.$store.getters['app/GET_LOCALE']}/#${link}`
          // obj.navLink = `/${this.$store.getters['app/GET_LOCALE']}/#${link}`
          obj.navLink = `${link}`
          _sNavLinks.push(obj)
        })
        return _sNavLinks
      }
    }),
    isUserScrollingUp() {
      // // eslint-disable-next-line no-console
      // console.log('isUserScrolling: this.scrollOffset ', this.scrollOffset)
      if (this.scrollOffset < this.prevScrollOffset && this.scrollOffset > 300 && this.scrollHeight - this.scrollOffset > 100) return true
      else return false
    },
    isUserScrolling() {
      // eslint-disable-next-line no-console
      // console.log('isUserScrollingUp ', this.isUserScrollingUp)
      // console.log('isUserScrolling: this.scrollOffset ', this.scrollOffset)
      if (this.scrollOffset < 300) return 0
      else return this.scrollOffset
      // return this.scrollOffset
    },
    scrollHeight() {
      return Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
      ) - document.documentElement.clientHeight
    },
    navClasses() {
      return {
        // 'pt-6 lg:pt-12 bg-transparent': !this.isUserScrolling || this.isUncollapsed,
        '': this.isUncollapsed,
        '': !this.isUserScrolling && !this.isUncollapsed,
        '': this.isUserScrolling && !this.isUserScrollingUp
      }
    },
    subNavClasses() {
      return {
        'py-2 lg:py-2 hidden lg:hidden': this.isUserScrolling && !this.isUserScrollingUp
      }
    },
    otherLocales() {
      return this.$i18n.locales.filter(({ code }) => code !== this.$i18n.locale)
    }
  },
  mounted() {
    this.handleScroll()
    this.setScreenVariables()
    this.language = this.languageUpper()

    const resizeHandler = () => {
      this.setScreenVariables()
    }

    const keyHandler = (event) => {
      if (event.keyCode !== 27) {
        return
      }

      this.hideNavModal()
    }

    window.addEventListener('resize', resizeHandler)
    window.addEventListener('keyup', keyHandler)

    this.$once('hook:destroyed', () => {
      window.removeEventListener('resize', resizeHandler)
      document.removeEventListener('keydown', keyHandler)
    })
  },
  methods: {
    languageUpper() {
      // eslint-disable-next-line no-console
      console.log(`-- /svgs/logos/csa_logo_${this.$i18n.locale.toUpperCase()}.svg`)
      return this.$i18n.locale.toUpperCase()
    },
    setScreenVariables() {
      // eslint-disable-next-line no-console
      // console.log('this.isUncollapsed: ', this.isUncollapsed, ' window.innerWidth: ', window.innerWidth, ' window.innerWidth >= lg: ', (window.innerWidth >= Number(lg.slice(0, -2))))
      if (window.innerWidth >= Number(lg.slice(0, -2))) {
        if (this.isUncollapsed) {
          this.isUncollapsed = false
        }
        this.isBigScreen = true
        if (this.$refs.hamburger) { this.$refs.hamburger.setHamburger(false) }
      } else this.isBigScreen = false
    },
    toggleVisibility() {
      // closing the modal
      if (this.isUncollapsed) {
        // Prevent Page to jump to top When a Modal is closed
        document.body.style.position = ''
        window.scrollTo(0, parseInt(this.fixedScrollOffset || '0'))
        this.fixedScrollOffset = 0
      } else {
        // opening the modal
        // Prevent Page Scrolling When a Modal is Open
        this.fixedScrollOffset = this.scrollOffset
        document.body.style.position = 'fixed'
      }

      this.isUncollapsed = !this.isUncollapsed
    },
    hideNavModal() {
      if (!this.isUncollapsed) {
        return
      }
      this.$refs.hamburger.passiveToggle()
      this.toggleVisibility()
    },
    toggleHamburger(scrollToTop = false) {
      // console.log(`scrollToTop ?? ${scrollToTop}`) // eslint-disable-line no-console
      if (this.isUncollapsed) {
        document.body.style.position = '' // 'unfix position' of html body when navigation panel is in modal mode
        // console.log(`scrollToTop ?? ${scrollToTop} --> ${this.fixedScrollOffset}`) // eslint-disable-line no-console
        // console.log(scrollToTop) // eslint-disable-line no-console
        // if (scrollToTop.detail === 1) {
        //   console.log(`!scrollToTop ??`) // eslint-disable-line no-console
        // window.scrollTo({ top: this.fixedScrollOffset || '0', left: 0, behavior: 'auto' })
        window.scrollTo(0, this.fixedScrollOffset)
        console.log(scrollToTop.detail, ' - ! ! - ', parseInt(this.fixedScrollOffset || '0')) // eslint-disable-line no-console
        // }
        // window.scrollTo(0, parseInt(this.fixedScrollOffset || '0'))
        this.fixedScrollOffset = 0
        this.isUncollapsed = !this.isUncollapsed
        this.$refs.hamburger.passiveToggle()
      }

      if (scrollToTop) {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
      }
    },
    handleScroll() {
      this.prevScrollOffset = this.scrollOffset
      this.scrollOffset = window.scrollY
      // console.log(this.scrollHeight, ' --  ', this.scrollOffset, ' - clientWidth - ', document.documentElement.clientHeight) // eslint-disable-line no-console
    }
  },
  // links: ['about', 'work']
  links: []
}
</script>

<style scoped>
.mid-opaque {
  /* opacity: 0.5; */
  background-color: rgba(0,0,0,.2);
}
.full-opaque {
  /* opacity: 1; */
  background-color: rgba(0,0,0,0);
}
/* .grow-hover-container:hover .link-text {
  font-size: 1rem;
  line-height: 1.25rem;
}

.grow-hover-container:hover .logo-section {

} */

.logo_drawer_container {
  z-index: -10;
}
/* .navbar {
  height: 140.07px;
} */
.logo {
  /* align-self:center;
  align-self:flex-start;
  justify-self:flex-start; */
  /* height: 145.17px;
  width: 145.17px; */
  height: 130px;
  width: 140.07px;
}

.logo_small {

  -ms-transform: translate(12.5px, 19.5px);
  -webkit-transform: translate(12.5px, 19.5px);
  -moz-transform: translate(12.5px, 19.5px);
  -o-transform: translate(12.5px, 19.5px);
  transform: translate(12.5px, 19.5px);
}

.logo_normal {
  -ms-transform: translate(24px, 42px);
  -webkit-transform: translate(24px, 42px);
  -moz-transform: translate(24px, 42px);
  -o-transform: translate(24px, 42px);
  transform: translate(24px, 42px);
}
.logo_drawer {
  -ms-transform: translate(24px, 42px);
  -webkit-transform: translate(24px, 42px);
  -moz-transform: translate(24px, 42px);
  -o-transform: translate(24px, 42px);
  transform: translate(24px, 42px);
}
/* @media (max-width: 600px) {
    .drawer {
        width: 90vw !important;
    }
} */

@media (min-width: 960px) {
  /* .navbar {
    height: 227px;
  } */
  .logo {
    align-self:center;
    align-self:flex-start;
    justify-self:flex-start;
    height: 227.37px;
    width: 227.37px;
  }
}

.side-nav-toogle {
  min-height: 6em;
}
.hamburger-size {
  font-size: 4.2em;
}

.always-on-top{
  z-index: 4;
}
.link-text {
  /* font-size: calc(14/16 * 1em) !important; */
  /* line-height: 1.29; */
  letter-spacing: 0.02em !important;
  text-transform: uppercase !important;
  /* font-weight: lighter; */
  /* align-self: center;
  text-align: center; */
  font-family: "azo-sans-web",sans-serif !important;
  /* color: white; */

  text-decoration: none;
}

.drawer-links {
  font-size: calc(18/16 * 1em) !important;
  /* line-height: 1.29; */
  letter-spacing: 0.02em !important;
}

</style>
