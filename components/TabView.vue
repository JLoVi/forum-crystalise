<template>
  <!-- class="history-view-container w-14/18 self-center flex flex-col flex-nowrap px-0 mx-0 align-center" -->
  <main class="w-screen">
    <div
      class="history-view-container min-w-2/3 flex flex-col flex-nowrap px-0 mx-0 align-middle items-center"
    >
      <div
        class="px-4 md:px-32 mx-0 flex flex-col flex-wrap w-4/5"
      >
        <nav
          class="product-view-tab-box flex flex-col flex-wrap lg:flex-no-wrap items-center justify-between shadow-md max-w-1000px"
        >
          <!-- BUTTONS -->
          <div class="large-screen-items w-full max-w-sm block flex-grow lg:flex lg:items-center lg:justify-around">
            <button
              v-for="(category, index) in categories"
              :key="index"
              :class="{'mr-8': (index < categories.length - 1) }"
              class="tabs-buttons block lg:inline-block w-full lg:mt-0 no-underline border-b-2 border-transparent uppercase font-bold text-base py-3 mr-0 mb-3"
              :style="getTabColorStyle(category)"
              @click.prevent="setActive(`${category}`)"
            >
              {{ category }}
            </button>
          </div>

          <!-- BUTTONS / -->
          <div
            class="w-full h-half max-h-500px overflow-y-scroll block lg:flex flex-grow lg:items-start p-4 bg-semitransparent"
          >
            <div class="lg:flex-grow lg:max-w-lg max-w-xs sm:max-w-sm">
              <div
                v-for="(category, index) in categories"
                :key="index"
              >
                <transition-expand>
                  <div v-if="activeItem === category" class="w-full">
                    <div
                      v-for="(data, i) in dataarray"
                      :key="i"
                      class="text-base text-justify flex flex-row flex-grow w-full flex-no-wrap justify-start items-center"
                    >
                      <!-- <img :src="product.icon_url" class="max-w-135px"> -->
                      <div v-if="data.category === category" class="w-1/3 third flex justify-center items-center min-w-1/3">
                        <div
                          v-if="data.category === 'sent'"
                        >
                          <p>sent to:</p>
                          <p class="font-semibold">
                            {{ data.receiver_id }}
                          </p>
                        </div>
                        <div
                          v-if="data.category === 'received'"
                        >
                          <p>sent by:</p>
                          <p class="font-semibold">
                            {{ data.sender_id }}
                          </p>
                        </div>
                      </div>
                      <div v-if="data.category === category" class="w-1/3 lg:py-12 flex flex-col py-2 px-4 min-w-1/3">
                        <p>message:</p>
                        <p class="font-semibold">
                          {{ data.message }}
                        </p>
                      </div>
                      <div v-if="data.category === category" class="w-1/3 min-w-1/3">
                        <p>sent at:</p>
                        <!-- {{ getmoment(data.time_created) }} -->

                        <p class="font-semibold">
                          {{ getmoment(data.time_created) }}
                        </p>
                      </div>
                    </div>
                  </div>
                </transition-expand>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </main>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
import { hasValue } from '~/plugins/utils.js'
// import * as Filters from '~/utils/filters'

export default {
  components: {
    TransitionExpand: () => import('~/components/TransitionExpand')
  },
  props: {
    dataarray: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      extended: false,
      currentActiveTab: '',
      activeItem: '',
      // categories: ['sent', 'received', 'new']
      categories: ['sent', 'received']
    }
  },
  computed: {
    ...mapState({
      /* loadedPosts: function(state) {
                if (hasValue(state.projects.loadedPosts)) {
                    // console.log('state.projects.loadedPosts state.projects.loadedPosts state.projects.loadedPosts state.projects.loadedPosts', state.store.projects.getters.getShowcased)
                    if(this.extended){ return state.projects.loadedPosts.slice().reverse() }
                    else {return state.projects.loadedPosts.slice().reverse().slice(0, 9)}
                } else return state.projects.loadedPosts;
            }, */
      loadedProducts: function (state) {
        // console.log(state.services.loadedPosts.slice(0, 5));
        if (hasValue(state.products.loadedPosts)) {
          if (this.extended) {
            return state.products.loadedPosts.slice().reverse()
          } else {
            return state.products.loadedPosts
              .slice()
              .reverse()
              // .slice(0, state.products.loadedPosts.length)
          }
        } else return state.products.loadedPosts
      }
    }),
    moreLess() {
      if (this.extended) {
        return 'less'
      } else {
        return 'more'
      }
    }
  },
  mounted() {
    console.log(`MOUNTED TABVIEW`) // eslint-disable-line no-console
    console.log(`this.categories`, this.categories) // eslint-disable-line no-console
    console.log(`this.dataarray`, this.dataarray) // eslint-disable-line no-console
    this.activeItem = this.categories[0]
  },
  methods: {
    getmoment: function (time) {
      // moment(time)
      return moment(String(time)).format('MM/DD/YYYY hh:mm')
      // return moment(String(time)).format('llll')
    },
    getTabColorStyle: function (category) {
      // console.log(`${product.url} `, !this.isActive(`${product.url}`) ? product.control_color : 'text-white') // eslint-disable-line no-console
      return {
        // color: !this.isActive(`${category}`) ? '#FFFFFF' : '#3490dc',
        'background-color': this.isActive(`${category}`) ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.05)'
      }
      // return {
      //   color: !this.isActive(`${product.url}`) ? product.control_color : '#EFEFEF',
      //   'background-color': this.isActive(`${product.url}`) ? product.control_color : '#E0E0E0'
      // }
    },
    activateTab: function (ref) {
      this.currentActiveTab = ref
    },
    loadedSection(id) {
      if (hasValue(this.$store.getters['sections/loadedPosts'])) {
        const found = this.$store.getters['sections/loadedPosts'].find(
          section => section.url.indexOf(`${id}`) !== -1
        )
        // console.log(found.title) // eslint-disable-line no-console
        return found
      } else return null
    },
    isActive(menuItem) {
      return this.activeItem === menuItem
    },
    setActive(menuItem) {
      // console.log(menuItem, 'SETACTIVE') // eslint-disable-line no-console
      // console.log(this.$refs.household) // eslint-disable-line no-console
      this.activeItem = menuItem
    }
  }
}
</script>

<style scoped>

.expand-enter-active,
.expand-leave-active {
  transition-property: opacity, height;
}
.expand-enter,
.expand-leave-to {
  opacity: 0;
}

.tabs-buttons{
  outline: none;
}

.bg-semitransparent{
  background-color: rgba(255, 255, 255, 0.3);
}

.font-semibold{
  word-wrap: break-word;
}
</style>
