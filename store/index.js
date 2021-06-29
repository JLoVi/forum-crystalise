// import { mapState } from 'vuex'

/**
 * Logging
 */
// const debug = require('debug')
// const log = debug('app:store:main')

export const actions = {
  // async nuxtServerInit(vuexContext, context) {
  async nuxtServerInit({ dispatch, commit }, context) {
    console.log('********** ********** [nuxtServerInit running] ********** ********** ') // eslint-disable-line no-console
    // const users = await vuexContext.dispatch('app/getUsers')
    // console.log('users', users) // eslint-disable-line no-console
    // vuexContext.commit('meta/setPosts', users)

    // return Promise.all([
    //   dispatch('user/nuxtServerInit', context),
    //   dispatch('news/nuxtServerInit', context)
    // ])
    try {
      const users = await dispatch('app/getUsers')
      // console.log('fetched users', users) // eslint-disable-line no-console
      commit('meta/setPosts', users)
    } catch (e) {
      console.log(e) // eslint-disable-line no-console
    }
    // const username = 'string'
    // try {
    //   // console.log(`faszom ${username}`)// eslint-disable-line no-console
    //   const user = await context.app.$axios.$get(`${context.env.baseUrl}/user/${username}`)
    //   console.log('user->userobject') // eslint-disable-line no-console
    //   console.log(user) // eslint-disable-line no-console
    //   vuexContext.commit('meta/setUser', user.data)

    //   if (!user) {
    //     console.log('No user found') // eslint-disable-line no-console
    //     return log('No user found')
    //   }
    // } catch (e) {
    //   console.log('Unexpected error occurred') // eslint-disable-line no-console
    //   console.log(e) // eslint-disable-line no-console
    //   return log('Unexpected error occurred')
    // }

    // const username = ''
    // try {
    //   // console.log(`faszom ${username}`)// eslint-disable-line no-console
    //   // const user = await context.app.$axios.$get(`${context.env.baseUrl}/user/${username}`)
    //   const token = await vuexContext.dispatch('auth/initAuth')
    //   // console.log('user->userobject') // eslint-disable-line no-console
    //   // console.log(user) // eslint-disable-line no-console
    //   if (!token) {
    //     console.log('No user found') // eslint-disable-line no-console
    //     return log('No user found')
    //   }
    //   vuexContext.commit('meta/setUser', token.data)
    // } catch (e) {
    //   console.log('Unexpected error occurred') // eslint-disable-line no-console
    //   console.log(e) // eslint-disable-line no-console
    //   return log('Unexpected error occurred')
    // }

    // try {
    //   const users = await context.app.$axios.$get(`${context.env.baseUrl}/users`)
    //   // console.log(users)// eslint-disable-line no-console
    //   const usersArray = []
    //   console.log('fetched usersARRAY') // eslint-disable-line no-console
    //   // console.log(users) // eslint-disable-line no-console
    //   users.data.forEach((post) => {
    //     if (post.username !== username) {
    //       usersArray.push({ id: post.id, username: post.username })
    //     }
    //   })
    //   console.log('created usersARRAY') // eslint-disable-line no-console
    //   // console.log(usersArray)// eslint-disable-line no-console
    //   vuexContext.commit('meta/setPosts', usersArray)
    //   // console.log(vuexContext.getters('meta/getUser')) // eslint-disable-line no-console

    //   if (!users) {
    //     console.log('No user found') // eslint-disable-line no-console
    //     return log('No user found')
    //   }
    // } catch (e) {
    //   console.log('Unexpected error occurred') // eslint-disable-line no-console
    //   console.log(e) // eslint-disable-line no-console
    //   return log('Unexpected error occurred')
    // }

    // try {
    //   // console.log(vuexContext) // eslint-disable-line no-console
    //   await vuexContext.dispatch('websocket/connect')
    //   // console.log(`after vuexContext.dispatch('websocket/connect') connection MADE`) // eslint-disable-line no-console
    // } catch (e) {
    //   console.log(e) // eslint-disable-line no-console
    //   return log('Unexpected error occurred')
    // }

    // try {
    //   console.log(vuexContext) // eslint-disable-line no-console
    //   console.log(`lofasz ${context.env.baseUrl}/crystal/user/{user_id}`)// eslint-disable-line no-console
    //   const crystals = await context.app.$axios.$get(`${context.env.baseUrl}/crystal/user/{user_id}`)
    //   console.log(crystals)// eslint-disable-line no-console

    //   vuexContext.commit('meta/setPosts', crystals)

    //   if (!users) return log('No users found')
    // } catch (e) {
    //   return log('Unexpected error occurred')
    // }
  }
}
