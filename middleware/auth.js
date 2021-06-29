// export default function ({ context,
//     isHMR, app, store, route, params, error, redirect}) {
export default function ({ store, route, redirect }) {
  // console.log("[Middleware - AUTH/I18N] lang: ", context.params);
  // console.log("[Middleware - AUTH/I18N] context: ", context);

  // based on directory structure _lang/xxxx, hu/about has params.lang as "hu"
  // const locale = context.params.lang || 'hu'
  // context.store.commit('app/SET_LANG', locale) // set store

  // context.app.i18n.locale = context.store.state.app.locale
  if (!store.getters['auth/isAuthenticated']) {
    console.log('[AUTH Middleware] user NOT autheticated! redirecting to =>.../login. ROUTER', route) // eslint-disable-line no-console
    // context.redirect('/' + context.store.getters['app/GET_LOCALE'] + '/admin/auth')
    store.commit('app/SET_REDIRECTED_FROM_URL', route.path) // set store
    console.log('[AUTH Middleware] app/SET_REDIRECTED_FROM_URL', route.path) // eslint-disable-line no-console
    const referrer = store.getters['app/REDIRECTED_FROM_URL'] // set store
    console.log('[AUTH Middleware] referrer', referrer) // eslint-disable-line no-console
    redirect('/login')
  } else {
    // console.log('[AUTH Middleware] user autheticated! NO redirect') // eslint-disable-line no-console
  }
}
