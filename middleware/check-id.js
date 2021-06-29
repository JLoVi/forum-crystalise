export default function (context) {
  function paramsId() {
    if (context.params.id) { return context.params.id } else if (context.params.postId) { return context.params.postId }
  }
  function hasEqualId(element) {
    // console.log('element.id === context.params.id', element.id + '===' + context.params.id + ' ', + element.id === context.params.id)
    return element.id === paramsId()
  }

  function isValidProjectId(paramsId) {
    // console.log('---- BEFORE isValidProjectId ------- ',paramsId, ' ', context.store.getters['projects/loadedPosts'].length );
    const currIndex = context.store.getters['projects/loadedPosts'].findIndex(hasEqualId)
    if (currIndex > -1) {
      // console.log('found project title ', context.store.getters['projects/loadedPosts'][currIndex].title );
      // console.log('---- isValidProjectId ------- id:',paramsId, ' currInx: ', currIndex, ' currInx found in db?: ', (currIndex > -1));
      return true
    } else { return false }
  }

  // console.log('[CHECK-ID Middleware ] VA:LIDATOR CHECK is runnning')
  // console.log('VALIDATION', paramsId());
  // console.log('params', context.params);
  // console.log('query', context.query);
  // console.log('query', context.route.query);
  // console.log('ID type is valid?: ',/^\d+$/.test(paramsId()))

  if (/^\d+$/.test(paramsId()) && isValidProjectId(paramsId())) {
    //   console.log('---- VALIDATED PARAM ID ------- ');
    //   return true // if the params are valid
  } else {
    //   console.log('---- INVALIDATED PARAM ID ------- ');
    //   return false // will stop Nuxt.js to render the route and display the error page
    context.error({
      statusCode: 404,
      message: 'Cannot find requested page. Incorrect ID: ' + paramsId()
    })
  }
}
