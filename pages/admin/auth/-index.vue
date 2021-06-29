<template>
  <div class="admin-auth-page">
    <div class="auth-container">
      <p v-if="isLogin">
        <!-- {{ $t('auth.action') }} -->
        Login
      </p>
      <p v-else>
        Sign-up
      </p>
      <form @submit.prevent="onSubmit">
        <div class="input-control">
          <!-- <label class="label"><slot /></label> -->
          <input v-model="email" type="password" :name="`${Math.random()}`" required>
        </div>
        <input type="submit" value="">
        <AppButton type="submit">
          <!-- {{ isLogin ? $t('auth.login-button') : $t('auth.signup-button') }} -->
          <!-- {{ $t('auth.button') }} -->
          Submit
        </AppButton>
        <!-- <AppButton
          type="button"
          btn-style="inverted"
          style="margin-left: 10px"
          @click="isLogin = !isLogin">{{$t('auth.switch-to')}} {{isLogin ? $t('auth.signup') : $t('auth.login') }}</AppButton>-->
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminAuthPage',
  // layout: 'admin',
  // middleware: ['i18n'],
  data() {
    return {
      isLogin: true,
      email: '',
      password: ''
    }
  },
  methods: {
    onSubmit() {
      console.log(`ONSUBMIT ==> process.env.baseUrl/auth_user/login`) // eslint-disable-line no-console
      this.$store.dispatch('auth/authenticateUser', {
        isLogin: this.isLogin,
        email: this.email,
        password: this.password
      })
        .then(() => {
          // console.log('this.$i18n.locale ==> /' + this.$i18n.locale) // eslint-disable-line no-console
          // this.$router.push(`/${this.$i18n.locale !== 'hu' ? this.$i18n.locale + '/' : ''}admin/`)
          this.$router.push(`/`)
        })
    }
  }
}
</script>

<style scoped>
.admin-auth-page {
  padding: 20px;
}

.auth-container {
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 2px #ccc;
  width: 280px;
  margin: auto;
  padding: 10px;
  box-sizing: border-box;
}
</style>
