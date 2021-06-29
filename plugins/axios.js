// import Vue from 'vue'
// import axios from 'axios'

// https://github.com/nuxt-community/axios-module/issues/28
import { setAxiosInstance } from '~/services/http'

/*
* SOLUTION - this is being called but no access to store or context
* https://github.com/nuxt-community/modules/issues/89#issuecomment-459152707
*/
function tokenHandler(config, store) {
  if (store.state.auth.token) {
    // if (store.state.account.user && store.state.account.user.jwt) {
    // we could just use $axios.setToken
    config.headers.common.Authorization = `Bearer ${store.state.auth.token}`
  } else {
    config.headers.common.Authorization = null
  }
  return config
}
export default ({ app, store }) => {
  const axiosInstance = app.$axios
  // install the INSTANCE based handler. So each request this will be called
  // console.log('AXIOSSS'); //eslint-disable-line
  axiosInstance.onRequest(config => tokenHandler(config, store))
  setAxiosInstance(axiosInstance)
}

// Vue.use(axios);

/*
* solution 1- this is being called but no access to store or context
*
axios.interceptors.request.use((config) => {
    // Do something before request is sent
    console.log('[ &&&&&&&&& AXIOS INTERCEPTOR {config}]', config)
    console.log('[ &&&&&&&&& AXIOS INTERCEPTOR {axios}]', context)
    return config;
  }, function (error) {
    // Do something with request error
    console.log('[ &&&&&&&&& AXIOS INTERCEPTOR ERROR ]', error)
    return Promise.reject(error);
});

Vue.use(axios);
*
****/

/*
* solution 2 - but no access to to store or context
*
function tokenHandler(config, store) {
    console.log('[ &&&&&&&&& AXIOS TOKENHANDLER {config}]', config)
    if (store.getters.authToken) {
        config.headers.common['Authorization'] = `Bearer ${store.getters.authToken}`
    }
    return config
}

//Token handling
axios.interceptors.request.use(config => tokenHandler(config, store), errorHandler.bind(ctx))
*
****/

/*
* solution 3 - this is a working solution // uncomment to use it
*
function setAuthorizationToken(token) {
  if (token) {
    axios.defaults.headers.common.authorization = `Bearer ${token}`
  } else {
    delete axios.defaults.headers.common.authorization
  }
}
*/

// export default ({store, app: { $axios }}) => {
//     // $axios.setToken(store.state.token)

//   }
