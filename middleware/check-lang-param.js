export default function (context) {
  function hasEqualId(element) {
    // console.log('element.id === context.params.id', element.id + '===' + context.params.id + ' ', + element.id === context.params.id)
    return element.toLowerCase() === context.params.lang.toLowerCase()
  }

  function isValidLang(paramsLang) {
    // console.log('---- BEFORE isValidLang ------- ',paramsLang, ' ', context.store.getters['app/GET_LOCALE_OPTIONS'].length );
    const currIndex = context.store.getters['app/GET_LOCALE_OPTIONS'].findIndex(hasEqualId)
    if (currIndex > -1) {
      // console.log('found project title ', context.store.getters['app/GET_LOCALE_OPTIONS'][currIndex] );
      // console.log('---- isValidProjectId ------- id:',paramsLang, ' currInx: ', currIndex, ' currInx found in db?: ', (currIndex > -1));
      return true
    } else { return false }
  }

  // console.log('[CHECK-LANG Middleware ] VA:LIDATOR CHECK is runnning')

  // console.log('VALIDATION');
  // console.log('ID lang is valid?: ',/^\d+$/.test(context.params.lang))
  // console.log('isValidProjectId?: ', isValidProjectId(context.params.id))
  // console.log(/^\d+$/.test(context.params.id) && isValidProjectId(context.params.id))

  if (/[a-zA-Z]+/.test(context.params.lang) && isValidLang(context.params.lang)) {
    //   console.log('---- VALIDATED PARAM ID ------- ');
    //   return true // if the params are valid
  } else {
    //   console.log('---- INVALIDATED PARAM ID ------- ');
    //   return false // will stop Nuxt.js to render the route and display the error page
    context.error({
      statusCode: 404,
      message: 'Cannot find requested page. Incorrect language: ' + context.params.lang
    })
  }
}
