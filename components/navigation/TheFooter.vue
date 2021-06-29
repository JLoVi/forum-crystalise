<template>
  <footer class="the-footer" :class="`${placing}`">
    <!-- <div class="spacer"></div> -->
    <ul class="nav-list">
      <!-- <a v-for="link in navLinks" v-bind:key="link.title" :href="`${link.url}`" class="nav-item">{{ link.title }}</a> -->

      <!-- <a @click.self.stop.prevent="onFollowLink()" href="#" class="nav-item"> 100WP Youtube |</a> -->
      <!-- <a v-for="(link, channel) in socialMediaLinks" v-bind:key="channel" :href="`${link}`" class="nav-item social-media-links"> {{ channel }} </a> -->
    </ul>
    <div class="light nav-item">
      &copy; {{ copyRight }}
    </div>
  </footer>
</template>

<script>
import { mapState } from 'vuex'
import { hasValue } from '~/plugins/utils.js'

export default {
  name: 'TheFooter',
  props: {
    placing: {
      type: String,
      default: ''
    }
  },
  computed: {
    navLinks() {
      return this.$store.getters['app/GET_FOOTERLINKS']
    },
    copyRight() {
      return this.$store.getters['app/GET_COPYRIGHT']
    },
    ...mapState({
      getChannelLink: function (state) {
        return state.news.loadedPosts.slice().reverse()[0].links_url[0]
      },
      loadedMeta: function (state) {
        return state.meta.loadedPosts[0]
      },
      socialMediaLinks: function (state) {
        // let facebook, instagram, youtube, impressum;
        // ({facebook, instagram} = state.meta.loadedPosts[0]);
        // // return {facebook, instagram, 'Impressum': 'impressum link'}
        // return {facebook, instagram}
        if (hasValue(this.$store.getters['meta/loadedPosts'])) {
          return {
            facebook: state.meta.loadedPosts[0].facebook,
            instagram: state.meta.loadedPosts[0].instagram
          }
        } else {
          return {
            facebook: '',
            instagram: ''
          }
        }
      }
    })
  },
  methods: {
    onFollowLink: function () {
      window.open(this.getChannelLink)
    }
  }
}
</script>

<style scoped>

.the-footer {
  width: 100%;
  /* position: fixed; */
  /* height: 60px; */
  height: 20vh;
  /* height: 10%; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background-color: black; */
  /* background-color: #b4894b; */
  background-color: #e8e8e8;
  z-index: 100;
  box-sizing: border-box;

  flex-shrink: 0; /* bottom sticky footer with flexbox */

  font-size: 12px;
}

@media screen and (max-width: 640px){
  .the-footer {
    padding: 5em 0 5em 0;
  }
}

.spacer {
  flex: 1;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: baseline;
  align-items: center;
}

.nav-item {
  text-transform: capitalize;
  padding: 0 10px 0 10px;
}

.nav-item a {
  text-decoration: none;
  /* color: white; */
  color: black;
}

a {
    color: inherit;
}

a:hover,
a:active,
.nav-item a:hover,
.nav-item a:active,
.nav-item a.nuxt-link-active{
  /* color: #bada55; */
  text-decoration: underline;
  color: black;
}

.social-media-links {
  border-right: 1px solid black;
}
.social-media-links:last-of-type {
  border-right: none;
}
.light {
  padding: 2em 0 0 0;
  /* font-family: "din-2014 narrow",sans-serif; */
  font-weight: 400;
}
</style>
