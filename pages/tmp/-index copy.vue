<template>
  <main class="static flex justify-center">
    <h2 class="front-html title select-none">
      it takes a village
    </h2>
    <div class="bg-gray-light block">
      Block child
    </div>
    <div class="absolute bottom-0 left-0 bg-gray-800">
      Absolute child
    </div>
    <!-- <ul class="z-10 front-html bg-transparent nav-bar">
      <li class="">
        <a class="" href="/info">info</a>
      </li>
      <li class="">
        <a class="" href="/network">network</a>
      </li>
    </ul> -->
    <div class="page">
      <client-only placeholder="Loading...">
        <!-- <three-godray /> -->
        <crystal class="" />
        <!-- <drone-tone-low /> -->
      </client-only>
    </div>
  </main>
</template>

<script>
import Crystal from '@/components/Three/Crystal'
// import DroneToneLow from '@/components/Tone/FMDroneToneLow'

export default {
  name: 'ThreeTest',
  components: {
    Crystal
    // DroneToneLow
  },
  mounted() {
    // console.log(' *****************   MOUNTED  PAGE ********************') // eslint-disable-line no-console
  }
}
</script>

<style scoped>
/* .front-html {
  position: absolute;
} */

.nav-bar {
  list-style-type: none;
}

#container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
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
</style>
