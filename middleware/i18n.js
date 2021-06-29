/**
 * Logging
 */
const debug = require('debug')
const log = debug('app:i18:middleware')

/*
 * 1. sets i18n.locale and state.locale if possible
 * 2. redirects if not with locale
 */
export default function ({
  isHMR, app, store, route, params, error, redirect
}) {
  log('[Middleware - I18N] lang: ', params)
  if (isHMR) { // ignore if called from hot module replacement
    return // if url does not have language, redirect to hungarian
  } else if (!params.lang) {
    log('[Middleware - I18N] no lang param => redirect to: ', '/hu' + route.fullPath.replace(/^\/(en|hu)/, '/'))
    return redirect('/hu' + route.fullPath.replace(/^\/(en|hu)/, '/'))
    // return redirect('/hu'+route.fullPath);
  }

  // based on directory structure _lang/xxxx, hu/about has params.lang as "hu"
  const locale = params.lang || 'hu'
  log('COMMITING to app/SET_LANG', locale) // set store
  store.commit('app/SET_LANG', locale) // set store
  app.i18n.locale = store.state.app.locale
}
