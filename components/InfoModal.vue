<template>
  <transition name="animodal">
    <!-- <main class="w-screen h-screen"> -->
    <main class="form-frame fixed pin-t w-screen h-screen bg-white z-20 overflow-y-scroll transition-all">
      <div
        class="flex justify-center"
      >
        <h2 class="title select-none ">
          FORUM
        </h2>
      </div>
      <div
        class="flex justify-center w-screen standard-font p-8"
      >
        <div class="midlev flex flex-col items-center  items-center justify-between">
          <div class="info-text items-center h-full">
            <h4>
              Focusing on infrastructure for future networks of care, Forum is an installation and web application by artist Jelena Viskovic inspired by the ReUnion.network*.
            </h4>
            <p>
              Playing on the public/private aspects of fountains and indoor bath culture, the installation is both a “discrete leisure” and public space that features a salt crystallization process, sculpturally marking a local space-time relation. Visitors are invited to interact with this process through a web application as they become part of a network of users connected through shared space and distributed time.
            </p>
            <p>
              Credits and collaborators
            </p>
            <ul class="credit-list">
              <li>Sculptor/Fabricator: Thomas Grogan</li>
              <li>Technical Assistant: Akinsola Lawanson</li>
              <li>Fabrication Assistant: Thomas Pearson</li>

              <!-- <li>Special Thanks: Anna Mikkola, Laurence Symonds</li> -->
            </ul>
            <p>
              In cooperation with the Digital Solitude program of Akademie Schloss Solitude.
            </p>
            <h6>
              *ReUnion is an initiative that proposes an ecosystem for collective well-being through P2P care agreements and relationship-driven cryptocurrency in response to society’s atomization. <a href="http://reunionnetwork.org">http://reunionnetwork.org</a>
            </h6>
            <div />
            <div class="flex justify-center my-8">
              <h5>Web Development: Rites Network (Tamas Pall, Tamas Marquetant), Akinsola Lawanson</h5>
            </div>
          </div>
        </div>

        <!-- <button
          class="absolute buttonbox footer standard-font py-2 px-4"
          type="submit"
          @click="startApp()"
        >
          START
        </button> -->
      </div>
    </main>
    <!-- SHARE MODAL -->
    <!-- <div class="share-modal z-50 flex justify-center w-screen h-screen">
      <button class="mid-btn z-10 absolute buttonbox midlev standard-font py-2 px-4 no-outline" @click="sendCrystalAction()">
        SEND
      </button>
      <button class="close-modal-btn buttonbox standard-font absolute no-outline" @click="showSharePrompt(false)">
        CANCEL
      </button>
    </div> -->
    <!-- SHARE MODAL -->
  </transition>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      msg: '',
      focusedElement: '',
      submitting: false,
      isSubmitted: false,
      error: false,
      fixedScrollOffset: 0
    }
  },
  mounted() {
    this.fixBodyScrolling()

    const keyHandler = (event) => {
      if (event.keyCode !== 27) {
        return
      }

      this.$emit('close')
    }

    window.addEventListener('keyup', keyHandler)
    this.$once('hook:destroyed', () => {
      this.releaseBodyScrolling()
      document.removeEventListener('keydown', keyHandler)
    })
  },
  methods: {
    startApp() {
      // this.$router.push('/')
      this.$emit('close')
    },
    fixBodyScrolling() {
      // opening the modal
      // Prevent Page Scrolling When a Modal is Open
      this.fixedScrollOffset = window.scrollY
      document.body.style.position = 'fixed'
    },
    releaseBodyScrolling() {
      // closing the modal
      // Prevent Page to jump to top When a Modal is closed
      document.body.style.position = ''
      window.scrollTo(0, parseInt(this.fixedScrollOffset || '0'))
      this.fixedScrollOffset = 0
    }
  }
}
</script>

<style scoped lang="pcss">
p{
  margin-bottom: 1rem;
}
li{
  /* font-size: 1.5rem; */
}
.credit-list{
  list-style: none;
}
.form-frame{
  overflow-x: hidden;
  font-size: 3vh;
  text-align: justify;
  text-justify: inter-word;
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
  textarea:focus, input:focus {
    outline: none;
  }

  :invalid {
    box-shadow: none;
  }

  :-moz-submit-invalid {
    box-shadow: none;
  }

  :-moz-ui-invalid {
    box-shadow: none;
  }

  .shadow-white {
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.8);
  }

  .shadow-red {
    box-shadow: 0 0 0 2px config("colors.red");
  }

  /* .close-button {
    @apply .hidden .font-mono .ml-auto .text-grey-light .text-xl .w-8 .h-8 .rounded-full .border .mt-2;

    &::before {
      content: '×'
    }

    @screen lg {
      @apply .block;
    }
  } */
</style>
