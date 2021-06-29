<template>
  <!-- <main class="relative bg-grey-light w-screen h-screen">
    <div class="static mt-24 bg-grey-lightest bg-grey-light">
      <h2 class="title select-none">
        it takes a village
      </h2>
      <div class="bg-orange">
        Block child
      </div>
      <div class="absolute bg-red h-24 bottom-0 right">
        Absolute child
      </div>
    </div> -->
  <!-- <div class="page">
      <client-only placeholder="Loading...">
        <crystal class="" />
        <drone-tone-low />
      </client-only>
    </div> -->
  <!-- </main> -->
  <!-- <div class="relative bg-grey-lightest "> -->
  <div class="bg-grey-light flex justify-center w-screen h-screen">
    <h2 class="front-html title select-none">
      it takes a village
    </h2>
    <div class="absolute midlev flex flex-col items-center justify-between h-32">
      <div class="">
        set your username
      </div>
      <!-- <div class="bg-yellow">
        Name
      </div> -->
      <div>
        <div class="relative">
          <input type="search" class="bg-purple-white shadow rounded border-0 p-3" placeholder="...">
          <!-- <div class="absolute pin-r pin-t mt-3 mr-4 text-purple-lighter">
            <svg
              version="1.1"
              class="h-4 text-dark"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 52.966 52.966"
              style="enable-background:new 0 0 52.966 52.966;"
              xml:space="preserve"
            >
              <path
                d="M51.704,51.273L36.845,35.82c3.79-3.801,6.138-9.041,6.138-14.82c0-11.58-9.42-21-21-21s-21,9.42-21,21s9.42,21,21,21
                  c5.083,0,9.748-1.817,13.384-4.832l14.895,15.491c0.196,0.205,0.458,0.307,0.721,0.307c0.25,0,0.499-0.093,0.693-0.279
                  C52.074,52.304,52.086,51.671,51.704,51.273z M21.983,40c-10.477,0-19-8.523-19-19s8.523-19,19-19s19,8.523,19,19
                  S32.459,40,21.983,40z"
              />
            </svg>
          </div> -->
        </div>
      </div>
    </div>
    <button class="absolute footer bg-transparent hover:bg-blue text-blue-dark font-semibold hover:text-white py-2 px-4 border border-blue hover:border-transparent rounded">
      start
    </button>
  </div>
  <!-- </div> -->
</template>

<script>
// import Crystal from '@/components/Three/Crystal'
// import DroneToneLow from '@/components/Tone/FMDroneToneLow'

export default {
  name: 'ThreeTest',
  components: {
    // Crystal,
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
  display: flex ;
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

.footer {
  position: absolute;
  width: 150px;
  height: 50px;
  text-align: center;
  /* top: 0; */
  bottom: 0;
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
</style>
