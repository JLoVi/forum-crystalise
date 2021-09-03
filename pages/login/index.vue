<template>
  <main class="w-screen h-screen">
    <!-- <div v-if="submitting && !isSubmitted" class="error">
      submitting
    </div>
    <h2
      v-if="$store.getters['auth/isAuthenticated']"
      class="flex justify-center w-screen h-screen"
    >
      Hi {{ $store.getters['meta/getUser'].username }}
    </h2> -->
    <!-- v-if="!$store.getters['auth/isAuthenticated']" -->
    <!-- <label class="form__label">set your username</label> -->
    <div
      v-if="(!formpresent)"
      class="flex justify-center w-screen h-screen"
    >
      <h2 class="title select-none text-4xl sm:text-7xl">
        Hi {{ storeUserName }}
      </h2>
    </div>
    <form
      v-else
      class="flex justify-center w-screen h-screen"
      @submit.prevent="validate"
    >
      <h1 class="title select-none">
        FORUM
      </h1>

      <div class="centered_form">
        <div>
          <div
            class="form-group relative"
            :class="{'shadow-white': focusedElement === 'name', 'shadow-red form-group--error': $v.username.$error }"
          >
            <label class="form__label">Username</label>
            <input
              v-model.trim="$v.username.$model"
              class="form__input"
              placeholder="..."
              type="text"
              @focus="focusedElement = 'name'"
              @blur="focusedElement = ''"
            >
          </div>
          <div v-if="!$v.username.required" class="error">
            Field is required
          </div>
          <div v-if="!$v.username.minLength" class="error">
            Name must have at least {{ $v.username.$params.minLength.min }} letters.
          </div>
          <div v-if="!$v.username.maxLength" class="error">
            Name must have at most {{ $v.username.$params.maxLength.max }} letters.
          </div>
        </div>

        <div>
          <div
            class="form-group relative"
            :class="{'shadow-white': focusedElement === 'password', 'shadow-red form-group--error': $v.password.$error }"
          >
            <label class="form__label">Password</label>
            <input
              v-model.trim="$v.password.$model"
              class="form__input"
              placeholder="..."
              type="password"
              @focus="focusedElement = 'password'"
              @blur="focusedElement = ''"
            >
          </div>
          <div v-if="!$v.password.required" class="error">
            Field is required
          </div>
          <div v-if="!$v.password.minLength" class="error">
            Name must have at least {{ $v.username.$params.minLength.min }} letters.
          </div>
          <div v-if="!$v.password.maxLength" class="error">
            Name must have at most {{ $v.username.$params.maxLength.max }} letters.
          </div>
          <div v-if="getErrorMessage && !focusedElement" class="absolute full-width">
            <p class="red_color center_text">
              {{ getErrorMessage }}
            </p>
          </div>
        </div>
      </div>

      <!-- @click="loginAction" -->
      <button
        :class="submitButtonClasses"
        class="absolute buttonbox footer standard-font py-2 px-4"
        type="submit"
        :disabled="submissionDisabled"
      >
        START
      </button>
    </form>
    <div class="page">
      <!-- <client-only placeholder="Loading...">
        <drone-tone-low />
      </client-only> -->
    </div>
  </main>
</template>

<script>
import { mapState } from 'vuex'
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
// import DroneToneLow from '@/components/Tone/FMDroneToneLow'
import { hasValue } from '~/plugins/utils.js'

export default {
  name: 'Forum',
  components: {
    // DroneToneLow
  },
  data() {
    return {
      username: '',
      password: '',
      name: '',
      focusedElement: '',
      submitting: false,
      isSubmitted: false,
      error: false,
      formpresent: true,
      submitted_error: null
    }
  },
  validations: {
    username: {
      required,
      minLength: minLength(2),
      maxLength: maxLength(20)
      //   isUnique(value) {
      //     // standalone validator ideally should not assume a field is required
      //     // console.log('? isUniquevalue', value, ' this.username ', this.username) // eslint-disable-line no-console
      //     if (value === '') return true
      //     // return !this.contains(this.username, this.otherUsers)
      //     return (typeof value === 'string' && !this.contains(value, this.otherUsers))

    //     // // simulate async call, fail for all logins with even length
    //     // return new Promise((resolve, reject) => {
    //     //   setTimeout(() => {
    //     //     console.log('? isUniquevalue', value, ' this.username ', this.username, ' contains? ', !this.contains(value, this.otherUsers)) // eslint-disable-line no-console
    //     //     resolve(typeof value === 'string' && !this.contains(value, this.otherUsers))
    //     //   }, 150 + Math.random() * 300)
    //     // })
    //   }
    },
    password: {
      required,
      minLength: minLength(2),
      maxLength: maxLength(20)
    }
  },
  computed: {
    ...mapState({
      signedIn: function (state) {
        if (hasValue(state['auth/token'])) {
          return this.$store.getters['auth/isAuthenticated']
        } else {
          return false
        }
      },
      empty() {
        const dataKeys = ['username']

        return dataKeys.some(k => !this[k])
      },
      submissionDisabled() {
        return this.empty || this.$v.$error || this.submitting
      },
      submitButtonClasses() {
        const baseClasses = 'ml-4 mt-4 px-6 py-3 rounded transition-all border text-white'
        const additionalClasses = this.submissionDisabled
          ? 'opacity-50 cursor-not-allowed border-grey-light'
          : 'hover:bg-green border-developmint-light hover:border-developmint'

        return `${baseClasses} ${additionalClasses}`
      },
      otherUsers: function (state) {
        if (hasValue(this.$store.getters['meta/loadedPosts'])) {
          const filteredArray = []
          this.$store.getters['meta/loadedPosts'].forEach((post) => {
            filteredArray.push({ id: post.id, username: post.username })
          })
          return filteredArray
          // return this.$store.getters['meta/loadedPosts'].map(usr => ({
          //   id: usr.id,
          //   username: usr.username,
          //   img: 'crystal/crystals/crystal_01/Blue-1_baseTexBaked.jpg'
          // }))
        } else {
          return []
        }
      },
      storeUserName: function (state) {
        return this.$store.getters['auth/getToken'].username
      },
      getErrorMessage: function (state) {
        return this.submitted_error
      }
    }),
    filteredList() {
      // console.log(this.otherUsers) // eslint-disable-line no-console
      if (hasValue(this.otherUsers)) {
        return this.otherUsers.filter((user) => {
          return user.username.toLowerCase().includes(this.search.toLowerCase())
        })
      } else return []
    }
  },
  async fetch({ store, params }) {
    console.log('<login-params>', params) // eslint-disable-line no-console
    try {
      const users = await store.dispatch('app/getUsers')
      // console.log('users', users) // eslint-disable-line no-console
      store.commit('meta/setPosts', users)
    } catch (e) {
      console.log(e) // eslint-disable-line no-console
    }
  },
  async beforeMount() {
    console.log('***************** LOGIN :: MOUNTED *****************') // eslint-disable-line no-console
    console.log('Login/Index ....... RUNNING auth/initAuth') // eslint-disable-line no-console
    await this.$store.dispatch('auth/initAuth')
    if (this.$store.getters['auth/isAuthenticated']) {
      this.formpresent = false
      try {
        this.$store.dispatch('websocket/connect')
      } catch (e) {
        console.log(e) // eslint-disable-line no-console
      }
      console.log('....... ROUTER HISTORY ', this.$router.history) // eslint-disable-line no-console
      const referrer = this.$store.getters['app/REDIRECTED_FROM_URL'] // set store
      console.log('referrer', referrer) // eslint-disable-line no-console
      this.$router.push(referrer || '/')
    }
  },
  methods: {
    validate() {
      if (this.submissionDisabled) {
        return
      }
      // console.log('username: ') // eslint-disable-line no-console
      // console.log(this.username) // eslint-disable-line no-console
      // if (this.isUsernameUnique()) {
      this.submitForm()
      // } else {
      //   console.log('username already taken') // eslint-disable-line no-console
      // }
    },
    async submitForm() {
      console.log('submitForm vvvvvv') // eslint-disable-line no-console
      this.submitting = true
      this.error = false
      // const d = {
      //   password: this.password,
      //   username: this.username
      // }
      // // eslint-disable-next-line no-console
      // console.log(d) // eslint-disable-next-line no-console

      try {
        const data = await this.$store.dispatch('app/createUser', {
          username: this.username,
          password: this.password
        })
        this.submitting = false
        this.isSubmitted = true
        this.submitted_error = null
        console.log('user created in db - usr obj received: ', data) // eslint-disable-line no-console
        if (data.error !== null && data.success === false) {
          this.submitted_error = data.error
          console.error('user could not be created ', data.error) // eslint-disable-line no-console
          return
        }

        this.formpresent = false

        console.log('RETURNED') // eslint-disable-line no-console

        this.$store.dispatch('auth/authenticateUser', data)
        if (this.$store.getters['auth/isAuthenticated']) {
          try {
            this.$store.dispatch('websocket/connect')
          } catch (e) {
            console.log(e) // eslint-disable-line no-console
          }
        }

        await new Promise(resolve => setTimeout(resolve, 3000))
        const referrer = this.$store.getters['app/REDIRECTED_FROM_URL'] // set store
        console.log('referrer', referrer) // eslint-disable-line no-console
        this.$router.push(referrer || '/')
      } catch (e) {
        this.submitting = false
        this.error = true
        console.error(e) // eslint-disable-line no-console
      }
    },
    isUsernameUnique() {
      return !this.contains(this.username, this.otherUsers)
    },
    contains(target, pattern) {
      let value = 0
      pattern.forEach(function (word) {
        // console.log('target ', target.toLowerCase(), ' pattern: ', (word.username.toLowerCase()), ' ', target.toLowerCase().includes(word.username.toLowerCase())) // eslint-disable-line no-console
        value = value + target.toLowerCase().includes(word.username.toLowerCase())
      })
      return (value === 1)
    }
  }
}
</script>

<style scoped lang="scss">
.centered_form {
  position: absolute;
  top: 20%;
}

.red_color{
  color:red;
}

.center_text {
  text-align: center;
}
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
  width: 150px;
  /* height: 50px; */
  text-align: center;
  top: 0;
  bottom: 0;
  margin: auto;
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

  border-width: 1px;
  border-color: #00024e;
  border-radius: 25px;
  color:#00024e;
}
.form-group input:active{
  border-width: 2px;
  border-color: rgba(144,255,231,1);
}
.form-group input:focus{
  border-width: 2px;
  border-color: rgba(144,255,231,1);
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

.full-width {
  width: 100%;
}

</style>
