// import Cookie from 'js-cookie'

export const state = () => ({
  loadedPosts: [],
  user: {},
  crystalArray: []
})

export const getters = {
  loadedPosts: (state) => {
    return state.loadedPosts
  },
  getUser: (state) => {
    return state.user
  },
  getCrystals: (state) => {
    return state.crystalArray
  }
}

export const mutations = {
  setPosts(state, posts) {
    state.loadedPosts = posts
  },
  setUser(state, post) {
    // console.log(posts);
    state.user = post
    // console.log('[STORE::META] fetchedPosts ASSIGNED to store::loadedPosts');
  },
  setCrystals(state, post) {
    state.crystalArray = post
    console.log('[STORE::META] fetchedPosts ASSIGNED to store::loadedPosts') // eslint-disable-line no-console
  },
  addCrystals(state, post) {
    // console.log(posts);
    state.crystalArray.push(post)
    // console.log('[STORE::META] fetchedPosts ASSIGNED to store::loadedPosts');
  },
  addPost(state, post) {
    state.loadedPosts.push(post)
    // console.log('[STORE] newPost ADDED to store::loadedPosts');
  },
  editPost(state, editedPost) {
    const postIndex = state.loadedPosts.findIndex(
      post => post.id === editedPost.id)
    // console.log('[STORE]::editPost >> state.loadedPosts[postIndex]: ', state.loadedPosts[postIndex]);
    // console.log('[STORE]::editPost >> editedPost: ', editedPost);
    state.loadedPosts[postIndex] = editedPost
  },
  deletePost(state, postID) {
    state.loadedPosts = state.loadedPosts.filter((post, index, arr) => { return post.id !== postID })
    // console.log('{MUTATION-deletePost} post #',postID, ' DELETED FROM SERVER AND STORE UPDATED');
  }
}

export const actions = {
  getPosts(vuexContext, isAdminQuery) {
    if (!vuexContext.getters.is_loading) {
      vuexContext.commit('app/START_LOADING')
      return this.app.$axios
        .$get(`/meta${isAdminQuery ? '/all/' : '/'}${vuexContext.state.locale || 'hu'}`) // custom api access path
        .then((data) => {
          const postsArray = []
          data.forEach((post) => {
            postsArray.push(post)
          })
          // console.log('[Store]::{ACTION-addPost}: AFTER populating store::postArray with fetched Posts FROM SERVER');
          vuexContext.commit('setPosts', postsArray)
          vuexContext.commit('app/STOP_LOADING')
        })
        .catch((e) => {
          vuexContext.commit('app/STOP_LOADING')
          return this.app.context.error(e)
        })
    }
  },
  setPosts(vuexContext, posts) {
    vuexContext.commit('setPosts', posts)
  },
  addPost(vuexContext, payload) {
    const postData = {
      ...payload.postData
    }
    postData.id = undefined

    const formData = new FormData()

    /*
          Iteate over any new file sent over appending the files
          to the form data.
        */
    payload.newImageUploads.forEach((image) => {
      formData.append('images_url[]', image.fileinfo, image.filename)
    })
    payload.newThumbnailUpload.forEach((image) => {
      formData.append('thumbnail_url[]', image.fileinfo, image.filename)
    })

    // get postdata object's property names into an array
    const aProps = Object.getOwnPropertyNames(postData)
    // iterate over the property name array
    for (let i = 0; i < aProps.length; i++) {
      const propName = aProps[i]

      // append all property values to the formData object
      if (typeof postData[propName] !== 'undefined') {
        if (Array.isArray(postData[propName])) {
          postData[propName].forEach((el) => {
            // console.log(`${i}/${aProps.length} prop ${propName.toString()}[] from an array: append>> ${el}` );
            formData.append(`${propName.toString()}[]`, el)
          })
          // formData.append('userpic[]', myFileInput.files[0], 'chris1.jpg');
          // formData.append(propName.toString(), JSON.stringify( postData[propName] ) );
        } else {
          // console.log(`${i}/${aProps.length} prop ${propName}: append >> ${postData[propName]}` );
          formData.append(propName.toString(), postData[propName])
        }
      }
    }

    /** ************* FORMDATA DEBUG  *****************
        console.log(' ************** FORMDATA  *****************');
        for(var pair of formData.entries()) {
            if (Array.isArray(pair[1])){
                pair[1].forEach(el => {
                    console.log('arr prop', pair[0]+ '==> '+ el);
                })
            } else {
                console.log('ind prop', pair[0]+ '==> '+ pair[1]);
            }
        }
        console.log(' ******************************************');
        *************** FORMDATA DEBUG  *****************/

    return this.$axios.$post('/meta/',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((data) => {
        // console.log('[Store]::{ACTION-addPost}: AFTER creating NEWPost on SERVER');
        vuexContext.dispatch('getPosts')
      })
      .catch(e => console.log(e)) // eslint-disable-line no-console
  },
  editPost(vuexContext, payload) {
    const postData = {
      ...payload.postData,
      updated_at: new Date()
    }

    const formData = new FormData()

    /*
          Iteate over any new file sent over appending the files
          to the form data.
        */
    payload.newImageUploads.forEach((image) => {
      formData.append('images_url[]', image.fileinfo, image.filename)
    })
    payload.newThumbnailUpload.forEach((image) => {
      formData.append('thumbnail_url[]', image.fileinfo, image.filename)
    })

    // get postdata object's property names into an array
    const aProps = Object.getOwnPropertyNames(postData)
    // iterate over the property name array
    for (let i = 0; i < aProps.length; i++) {
      const propName = aProps[i]

      // append all property values to the formData object
      if (typeof postData[propName] !== 'undefined') {
        if (Array.isArray(postData[propName])) {
          postData[propName].forEach((el) => {
            // console.log(`${i}/${aProps.length} prop ${propName.toString()}[] from an array: append>> ${el}` );
            formData.append(`${propName.toString()}[]`, el)
          })
          // formData.append('userpic[]', myFileInput.files[0], 'chris1.jpg');
          // formData.append(propName.toString(), JSON.stringify( postData[propName] ) );
        } else {
          // console.log(`${i}/${aProps.length} prop ${propName}: append >> ${postData[propName]}` );
          formData.append(propName.toString(), postData[propName])
        }
      }
    }
    /** ************* FORMDATA DEBUG  *****************
        console.log(' ************** FORMDATA  *****************');
        for(var pair of formData.entries()) {
            if (Array.isArray(pair[1])){
                pair[1].forEach(el => {
                    console.log('arr prop', pair[0]+ '==> '+ el);
                })
            } else {
                console.log('ind prop', pair[0]+ '==> '+ pair[1]);
            }
        }
        console.log(' ******************************************');
        *************** FORMDATA DEBUG  *****************/

    return this.$axios.$put('/meta/' + postData.id,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    // return this.$axios.$put('/' + editedPost.id, editedPost)
      .then((data) => {
        // console.log('[Store]::{ACTION-editPost}: AFTER UPDATING Post on SERVER');
        vuexContext.dispatch('getPosts')
      })
      .catch(e => console.log(e)) // eslint-disable-line no-console
  },
  deletePost(vuexContext, postID) {
    return this.$axios.$delete('/meta/' + postID)
      .then((data) => {
        vuexContext.commit('deletePost', postID)
        // console.log('[Store]::{ACTION-deletePost}: AFTER deleting Post on SERVER');
      })
      .catch(e => console.log(e)) // eslint-disable-line no-console
  },
  togglePostStatus(vuexContext, { id, status }) {
    // console.log('/setstatus/' + id +'?newstatus='+status, status);
    return this.$axios.$put('/meta/setstatus/' + id + '?newstatus=' + status, status)
      .then((data) => {
        // console.log('[Store]::{ACTION-editPost}: AFTER UPDATING Post on SERVER');
        // vuexContext.dispatch('getPosts');
      })
      .catch(e => console.log(e)) // eslint-disable-line no-console
  }
}
