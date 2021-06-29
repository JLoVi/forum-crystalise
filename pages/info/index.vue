<template>
  <main class="w-screen h-screen">
    <div
      class="flex justify-center w-screen h-screen"
    >
      <h2 class="title select-none text-4xl sm:text-7xl">
        FORUM
      </h2>
    </div>
    <div
      class="flex justify-center w-screen "
    >
      <div class="midlev flex flex-col items-center mt-32 items-center justify-between">
        <div class="info-text items-center h-full">
          Focusing on infrastructure for future networks of care, Forum is an installation and web application by artist Jelena Viskovic inspired by the ReUnion.network.* Playing on the public/private aspects of fountains and indoor bath culture, the installation is both a “discrete leisure” and public space that features a salt crystallization process, sculpturally marking a local space-time relation. Visitors are invited to interact with this process through a web application as they become part of a network of users connected through shared space and distributed time.

          *ReUnion is an initiative that proposes an ecosystem for collective well-being through P2P care agreements and relationship-driven cryptocurrency in response to society’s atomization. http://reunionnetwork.org

          Credits and collaborators
          Sculptor/Fabricator: Thomas Grogan
          Technical Assistant: Akinsola Lawanson
          Fabrication Assistant: Thomas Pearson
          Web Development: Rites Network (Tamas Pall, Tamas Marquetant), Akinsola Lawanson
          Special Thanks: Anna Mikkola, Laurence Symonds

          In cooperation with the Digital Solitude program of Akademie Schloss Solitude.
        </div>
      </div>

      <button
        class="absolute buttonbox footer standard-font py-2 px-4"
        type="submit"
        @click="startApp()"
      >
        START
      </button>
    </div>
    <div class="page">
      <!-- <client-only placeholder="Loading...">
        <drone-tone-low />
      </client-only> -->
    </div>
  </main>
</template>

<script>

export default {
  name: 'Info',
  data() {
    return {

    }
  },
  methods: {
    startApp() {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped lang="scss">
.outer-border {
  /* border: 2px solid black; */
  position: relative;
  overflow: hidden;
}

.info-text{
  font-size: calc(2vh-0.5rem);
  text-align: justify;
  text-justify: inter-word;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
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

.buttonbox {
  width: 200px;
  height: 50px;
  border-color: #00024e;
  border-width: 2px;
  border-radius: 25px;
  color: #00024e;
  font-size: 1.3rem;
  background-color:white;
  opacity: 0.7;
}

.buttonbox:hover{
  border-width: 3px;
  opacity: 1;
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
  font-size: 5rem;
  color: #5e6880;
  letter-spacing: 1px;
  color: transparent;
  -webkit-text-stroke-width: 0.1rem;
  -webkit-text-stroke-color: #526491;
  text-shadow: 0px 0px 14px rgba(146, 221, 255, 0.8);
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: black;
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
  bottom: 30px;
  margin: auto;
}

.midlev {
  position: absolute;
  // width: 60%;
  /* height: 50px; */
  text-align: center;
  top: 0;
  bottom: 0;
}

.form-group--error {
  animation-name: shakeError;
  animation-fill-mode: forwards;
  animation-duration: .6s;
  animation-timing-function: ease-in-out;
}
@keyframes shakeError {
  0% {
    transform: translateX(0); }
  15% {
    transform: translateX(0.375rem); }
  30% {
    transform: translateX(-0.375rem); }
  45% {
    transform: translateX(0.375rem); }
  60% {
    transform: translateX(-0.375rem); }
  75% {
    transform: translateX(0.375rem); }
  90% {
    transform: translateX(-0.375rem); }
  100% {
    transform: translateX(0); }
}

.form-group{
  margin-bottom: 2rem;
  width: 70vw;
  max-width: 300px;
}

.form-group--merged {
  font-size: 0;
  display: table;
  width: 100%;
  border-collapse: separate;
}
.form-group--merged .form__label, .form-group--merged .form__label--inline {
  display: table-caption; }
.error {
  font-size: 0.75rem;
  line-height: 1;
  display: block;
  margin-left: 14px;
  margin-top: -1.6875rem;
  margin-bottom: 0.9375rem;
  }
.form-group--error + .form-group__message, .form-group--error + .error {
    display: block;
    color:red;
}
.form-group--error input, .form-group--error textarea, .form-group--error input:focus, .form-group--error input:hover {
    border-color: red;
}
.form__input, .form__textarea {
  font-family: "Lato", sans-serif;
  font-size: 1.33rem;
  font-weight: 300;

  line-height: 2.375rem;
  min-height: 3.3rem;
  position: relative;
  background:#fff;
  padding: 0 0.8125rem;
  width: 100%;
  transition: border .1s ease;
  box-sizing: border-box;

  border-width: 2px;
  border-color: #00024e;
  border-radius: 25px;
  color:#00024e;
}
.form-group input:active{
  border-width: 3px;
}
.form-group input:focus{
  border-width: 3px;
}

.form-group--error .form__label, .form-group--error .form__label--inline {
    color: red;
}

.form__label, .form__label--inline {
    font-size: 1.3rem;
    color: #00024e;
    margin-bottom: 0.3125rem;
    margin-left: 0.875rem;
    display: block;
    font-family: "Lato", sans-serif;
}
</style>
