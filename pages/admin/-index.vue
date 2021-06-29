<template>
  <div class="admin-page admin-content">
    <section class="new-post">
      <h1>{{ $t('admin.info') }}</h1>
      <!-- <AppButton @click="$router.push('/' + $store.getters['app/GET_LOCALE'] + '/admin/projects')">{{ $t('admin.button') }}</AppButton> -->
      <AppButton @click="$router.push('/')">
        {{ $t('admin.button') }}
      </AppButton>

      <!-- <p>{{ $t('admin.introduction') }}</p> -->
    </section>
  </div>
</template>

<script>
// import LanguageSelector from "@/components/Navigation/LanguageSelector";
export default {
  layout: 'admin',
  // middleware: ['check-auth', 'auth'],
  middleware: ['auth'],
  // components: {
  //     LanguageSelector
  // },
  // middleware: ['check-auth','auth'],
  // computed: {
  //     loadedPosts() {
  //         return this.$store.getters.loadedPosts
  //     }
  // },
  async asyncData(context) {
    // return context.app.$axios
    //     // .$get('/posts/'+ context.params.postId + '.json' )
    //     .$get('/projects/all/' + context.app.store.getters['app/GET_LOCALE'])
    //     .then(data => {
    //         return {
    //             loadedPosts: data
    //         }
    //     })
    //     .catch(e => context.error(e))
  },
  methods: {
    // onLogout(){
    //     this.$store.dispatch('auth/logout');
    //     this.$router.push('/' + this.$store.getters['app/GET_LOCALE'] + '/admin/auth')
    // },
    // onGoBack() {
    // // Navigate back
    // this.$router.push('/' + this.$store.getters['app/GET_LOCALE'] +'/');
    // },
  }
}
</script>

<style scoped>
.admin-page {
  /* padding: 20px; */
  /* flex: 1 0 auto; */
}
/*
.new-post {
  text-align: center;
  border-bottom: 2px solid #ccc;
  padding-bottom: 10px;
  background-color:red;
}

.existing-posts h1 {
  text-align: center;
} */
</style>
