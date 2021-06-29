export const state = () => ({
  // locales: ['hu', 'en'],
  locales: ['en'], // if only one language, delete seo alternate locales tag in pages
  locale: 'en',
  canonical_locale: 'en',
  anchorNavLinks: [],
  // scrollNavLinks: ['constitution', 'consultancy', 'team', 'contact'],
  scrollNavLinks: ['circularity', 'about', 'products', 'contact'],
  selectedPartner: {},
  loggedIn: false,
  username: '',
  // adminNavLinks: ["projects", "team", "services", "news", "meta"],
  adminNavLinks: [],
  subPages: ['circularity', 'about', 'products', 'contact'],
  // adminSubPages: ["admin/projects", "admin/team", "admin/services", "admin/news", "admin/meta"],
  adminSubPages: [],
  footerLinks: [
    { title: 'Impressum', url: 'https://' }
  ],
  copyRight: `Copyright — KLART Legal — ${(new Date()).getFullYear()}`,
  _loading_count: 0,
  wannaSendCrystal: false,
  miningended: false,
  message: '',
  redirecturl: ''
})

export const getters = {
  REDIRECTED_FROM_URL: (state) => {
    return state.redirecturl
  },
  IS_MINING_ENDED: (state) => {
    return state.miningended
  },
  DO_WANNA_SEND_CRYSTAL: (state) => {
    return state.wannaSendCrystal
  },
  GET_SELECTED_PARTNER: (state) => {
    return state.selectedPartner
  },
  GET_LOGIN_STATE: (state) => {
    return state.loggedIn
  },
  GET_USER_NAME: (state) => {
    return state.username
  },
  GET_LOCALE: (state) => {
    return state.locale
  },
  GET_CANONICAL_LOCALE: (state) => {
    return state.canonical_locale
  },
  GET_OTHER_LOCALES: (state) => {
    // console.log(state.locales)
    // console.log(state.locale)
    return state.locales.filter(curr => curr !== state.locale)
  },
  GET_LOCALE_OPTIONS: (state) => {
    return state.locales
  },
  GET_ADMINNAVLINKS: (state) => {
    return state.adminNavLinks
  },
  GET_SCROLLNAVLINKS: (state) => {
    return state.scrollNavLinks
  },
  GET_ANCHORNAVLINKS: (state) => {
    return state.anchorNavLinks
  },
  GET_FOOTERLINKS: (state) => {
    return state.footerLinks
  },
  GET_COPYRIGHT: (state) => {
    return state.copyRight
  },
  is_loading: (state) => {
    return state._loading_count !== 0
  },
  GET_SUB_PAGES: (state) => {
    return state.subPages
  }
}

export const mutations = {
  SET_REDIRECTED_FROM_URL(state, url) {
    state.redirecturl = url
  },
  SET_LANG(state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale
    }
  },
  SET_SELECTED_PARTNER(state, userObject) {
    state.selectedPartner = userObject
  },
  SET_MESSAGE(state, message) {
    state.message = message
  },
  SET_USER_NAME(state, username) {
    state.username = username
  },
  SET_LOGGED_IN(state, logstate) {
    state.loggedIn = logstate
  },
  START_LOADING(state) {
    // console.log('inside START_LOADING(state) {');
    state._loading_count++
  },
  STOP_LOADING(state) {
    // console.log('inside START_LOADING(state) {');
    state._loading_count--
  },
  WANNA_SEND_CRYSTAL(state, bool) {
    // console.log('inside START_LOADING(state) {');
    state.wannaSendCrystal = bool
  },
  MINING_ENDED(state, bool) {
    // console.log('inside START_LOADING(state) {')
    state.miningended = bool
  }
}

export const actions = {
  sendCrystal({ rootGetters, state, commit, vuexContext }, queryObject) {
    // Send the msg object as a JSON-formatted string.
    const crystalmsg = JSON.stringify({
      sender_id: rootGetters['auth/getToken'].id,
      receiver_id: queryObject.user.id,
      message: queryObject.message
    })

    return this.app.$axios
      .$post(`${process.env.baseUrl}/crystal/send`, crystalmsg) // custom api access path
      .then((data) => {
        console.log('[Store]::{ACTION-sendCrystal}: Received FROM SERVER') // eslint-disable-line no-console
        console.log(data) // eslint-disable-line no-console
        // vuexContext.commit('setPosts', postsArray)
      })
      .catch((e) => {
        return this.app.context.error(e)
      })
  },
  createUser({ state, commit, vuexContext }, queryObject) {
    // Send the msg object as a JSON-formatted string.
    return this.app.$axios
      .$post(`${process.env.baseUrl}/user/create`, JSON.stringify(queryObject)) // custom api access path
      .then((data) => {
        console.log('[Store]::{ACTION-createUser}: Received FROM SERVER', data) // eslint-disable-line no-console
        return data
      })
      .catch((e) => {
        return this.app.context.error(e)
      })
  },
  getUserCrystals({ rootGetters, state, commit, vuexContext }) {
    return this.app.$axios
      .$get(`${process.env.baseUrl}/crystal/user/${rootGetters['auth/getToken'].id}`) // custom api access path
      .then((dataArr) => {
        console.log('[Store]::{ACTION-getUserCrystals}: Received FROM SERVER', dataArr) // eslint-disable-line no-console
        if (!dataArr) {
          console.log('No crystal for user found') // eslint-disable-line no-console
          return
        }
        // console.log('************************ SET CRZSTAL vuexContext', vuexContext) // eslint-disable-line no-console
        // vuexContext.commit('meta/setCrystals', dataArr.data)
        // console.log('************************ SET CRZSTAL commit', commit) // eslint-disable-line no-console
        // commit('meta/setCrystals', dataArr.data)
        console.log('user crystals found ', rootGetters['meta/getCrystals']) // eslint-disable-line no-console
        return dataArr
      })
      .catch((e) => {
        return this.app.context.error(e)
      })
  },
  async getUsers({ rootGetters, state, commit, vuexContext }) {
    try {
      const users = await this.app.$axios.$get(`${process.env.baseUrl}/users`)
      // console.log(users)// eslint-disable-line no-console
      const usersArray = []
      // console.log('fetched usersARRAY') // eslint-disable-line no-console
      // console.log(users) // eslint-disable-line no-console
      users.data.forEach((post) => {
        // if (post.username !== username) {
        usersArray.push({ id: post.id, username: post.username })
        // }
      })
      // console.log('created usersARRAY') // eslint-disable-line no-console
      // console.log(usersArray)// eslint-disable-line no-console
      // commit('meta/setPosts', usersArray)
      // console.log('users ', rootGetters['meta/loadedPosts']) // eslint-disable-line no-console

      if (!users) {
        console.log('No user found') // eslint-disable-line no-console
        return []
      }
      return usersArray
    } catch (e) {
      return console.log('Unexpected error occurred', e) // eslint-disable-line no-console
    }
  }
}
