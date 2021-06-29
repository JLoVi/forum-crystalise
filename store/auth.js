// import Cookie from 'js-cookie'
// import auth from '../middleware/auth'

export const state = () => ({
  token: null
})

export const getters = {
  isAuthenticated: (state) => {
    // console.log('////////////isAuthenticated: state => ', state.token);
    return state.token != null
  },
  getToken: (state) => {
    return state.token
  }
}

export const mutations = {
  setToken(state, token) {
    state.token = token
    // console.log('[AUTH STATE.TOKEN SET TO] => ', state.token)
  },
  clearToken(state) {
    state.token = null
  }
}

export const actions = {
  authenticateUser({ commit, dispatch }, authData) {
    try {
      // console.log(`authenticateUser ==> BEFORE SETTING LOCALSTROAGE. AUTHDATA: `, authData) // eslint-disable-line no-console
      commit('setToken', authData.data)
      if (localStorage) {
        localStorage.setItem('token', JSON.stringify(authData.data))
        // console.log(`authenticateUser ==> localstorage not defined`) // eslint-disable-line no-console
        return false
      }
      // console.log(`authenticateUser ==> AFTER SETTING LOCALSTROAGE`) // eslint-disable-line no-console
      return true
    } catch (error) {
      console.warn('Auth Error MSG: ', error) // eslint-disable-line no-console
      return false
    }
  },
  initAuth(vuexContext, req) {
    // let expirationDate
    let token = null
    console.log('********** [initAuth runs] ********** ') // eslint-disable-line no-console
    /* if initAuth runs on server (re- or init loading a page that needs auth) */
    if (req) {
      console.log('[initAuth runs on server] req.headers: ') // eslint-disable-line no-console
      // console.log(req.headers) // eslint-disable-line no-console
      if (!req.headers.cookie) {
        return
      }

      /* get cookie from request headers */
      const jwtCookie = req.headers.cookie
        .split(';')
        .find(c => c.trim().startsWith('jwt='))
      if (!jwtCookie) {
        console.log('[initAuth does not find JWT cokiee ') // eslint-disable-line no-console
        return
      }

      /* if request has cookie in its headers get token and expiration date */
      token = jwtCookie.split('=')[1]
      // expirationDate = req.headers.cookie
      //   .split(';')
      //   .find(c => c.trim().startsWith('expirationDate='))
      //   .split('=')[1]

      /* if initAuth runs on client */
    // } else if (process.client) {
    //   console.log('[initAuth runs on CLIENT] localStorage.getItem(token)', JSON.parse(localStorage.getItem('token'))) // eslint-disable-line no-console
    //   token = JSON.parse(localStorage.getItem('token'))
    //   // expirationDate = localStorage.getItem('tokenExpiration')
    // }
    } else if (process.client && localStorage) {
      if (localStorage.getItem('token')) {
        console.log('[initAuth runs on CLIENT] localStorage.getItem(token)', JSON.parse(localStorage.getItem('token'))) // eslint-disable-line no-console
        // Replace the state object with the stored item https://www.mikestreety.co.uk/blog/vue-js-using-localstorage-with-the-vuex-store
        console.log('localStorage.getItem(token) defined. State token b4: ', vuexContext.state.token) // eslint-disable-line no-console
        // this.replaceState(
        //   Object.assign(state, JSON.parse(localStorage.getItem('token')))
        // )
        token = JSON.parse(localStorage.getItem('token'))
        // console.log('localStorage.getItem(token) defined. State token AFTER: ', vuexContext.state.token) // eslint-disable-line no-console
        // vuexContext.commit('meta/setUser', vuexContext.state.token.data)
        // console.log('vuexContext.state.token set to: ', vuexContext.state.token) // eslint-disable-line no-console
      } else {
        console.log('localStorage.getItem(token) not defined : ', vuexContext.state.token) // eslint-disable-line no-console
      }
      // token = JSON.parse(localStorage.getItem('token'))
      // expirationDate = localStorage.getItem('tokenExpiration')
    }
    /* clear token if we are passed over expiration date */
    if (!token) {
      console.log('no or expired token') // eslint-disable-line no-console
      // console.log('now=>' , new Date().getTime());
      // console.log('expires=>' , +expirationDate);
      vuexContext.dispatch('logout')
      return
    } else {
      /* set token */
      vuexContext.commit('setToken', token)
    }

    // /* clear token if we are passed over expiration date */
    // if (new Date().getTime() > +expirationDate || !token) {
    //   // console.log('no or expired token');
    //   // console.log('now=>' , new Date().getTime());
    //   // console.log('expires=>' , +expirationDate);
    //   vuexContext.dispatch('logout')
    //   return
    // }
    // console.log('!!! [initAuth] localStorage.getItem(token) defined. State token b4: ', vuexContext.state.token) // eslint-disable-line no-console
    return token
  },
  logout(vuexContext) {
    vuexContext.commit('clearToken')
    // Cookie.remove('jwt')
    // Cookie.remove('exprirationDate')
    if (process.client && localStorage) {
      localStorage.removeItem('token')
      // localStorage.removeItem('tokenExpiration')
    }
  }
}
