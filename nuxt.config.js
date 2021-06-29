import path from 'path'
import fs from 'fs'
import { colors } from './tailwind.config.js'
require('dotenv').config()

const bodyParser = require('body-parser')
// const getAppRoutes = require('./utils/getRoutes.js')

const titleTemplate = c => c ? `${c} - Forum` : 'Forum'
const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd
export default {
  modern: isProd && 'client',
  generate: {
    // fallback: true,
    // fallback: '404.html'
    // routes: ['/404']
  },
  /*
     * Environment
     */
  env: {
    wssUrl: process.env.WSS_URL || 'wss://yq4xfakfl7.execute-api.us-east-1.amazonaws.com/dev',
    baseUrl: process.env.BASE_URL || 'https://9giaty50vh.execute-api.us-east-1.amazonaws.com/dev'
  },

  /*
     * Head of the page
     */
  head: {
    titleTemplate,
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=PT+Serif&display=swap' } // PT Serif font

      // { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Open+Sans&display=swap' }
    ],
    noscript: [{ innerHTML: 'This website requires JavaScript.' }],
    __dangerouslyDisableSanitizers: ['script']
  },

  hooks: {
    'generate:distCopied'() {
      fs.copyFileSync(path.resolve(__dirname, './_headers'), path.resolve(__dirname, './dist/_headers'))
    },
    'generate:before'() {
      // console.log('HELLO KEZDODIK') // eslint-disable-line no-console
    },
    'generate:done'() {
      // console.log('HELLO VEGE') // eslint-disable-line no-console
    }
  },
  /*
     * Markdownit options
     * [optional]
     * See https://github.com/markdown-it/markdown-it
     */
  markdownit: {
    preset: 'default',
    // linkify: true,
    breaks: true,
    injected: true,
    html: true
    // use: [ 'markdown-it-highlightjs' ]
    // use: [
    //   ['markdown-it-container', containerName],
    //   'markdown-it-attrs'
    // ]
  },

  /*
     * Meta information
     */
  meta: {
    name: 'Forum',
    description: '',
    author: 'Rites Network',
    ogHost: process.env.BASE_URL || '',
    ogSiteName: 'Forum',
    ogImage: {
      path: 'logo.png'
    },
    twitterCard: 'summary'
  },

  css: [
    '~/assets/css/main.css',
    '~assets/styles/app'
  ],

  /*
     * Nuxt plugins
     */
  plugins: [
    '~plugins/core-components.js',
    '~plugins/date-filter.js',
    { src: '~/plugins/utils.js', ssr: false },
    { src: '~/plugins/vuelidate.js', ssr: true },
    { src: '~/plugins/tone-extend', ssr: false }
    // { src: '~/plugins/vue-native-websocket.js', ssr: false }
  ],
  // moment: {
  //   defaultLocale: 'en',
  //   locales: ['en']
  // },
  /*
     * Modules
     */
  modules: [
    '@nuxtjs/pwa', ['@nuxtjs/axios', { baseURL: '/.netlify/functions/' }],
    'nuxt-svg-loader',
    'nuxt-webfontloader',
    '@nuxtjs/moment',
    'nuxt-purgecss'
  ].concat(isDev ? '@nuxtjs/proxy' : 'nuxt-purgecss'),

  proxy: {
    '/.netlify/functions/': {
      target: 'http://localhost:9000'
    }
  },

  webfontloader: {
    google: {
      families: ['Lato:400,700']
    }
  },

  workbox: {
    offlineAnalytics: true,
    runtimeCaching: [{
      urlPattern: 'https://fonts.(?:googleapis|gstatic).com/(.*)',
      handler: 'staleWhileRevalidate',
      strategyOptions: {
        cacheName: 'google-fonts',
        cacheExpiration: {
          maxEntries: 30,
          maxAgeSeconds: 300
        }
      }
    }]
  },
  /*
     * Customize the progress bar color
     */
  loading: { color: '#fff' },
  loadingIndicator: {
    name: 'rectangle-bounce',
    color: 'white',
    background: colors.developmint
  },

  /*
     * Manifest
     */
  manifest: {
    name: 'it takes a village',
    short_name: 'it takes a village',
    start_url: '/',
    display: 'standalone',
    background_color: colors.rains,
    theme_color: colors.developmint
  },

  purgeCSS: {
    mode: 'postcss',
    paths: [
      'i18n/**/*.js'
    ],
    whitelistPatterns: [/cookie-consent/, /^ani/]
  },

  /*
     * Build configuration
     */
  build: {
    vendor: ['three', 'vue-three', 'postprocessing'],
    extractCSS: true,
    transpile: [/vue-if-bot/, /^vue-cookieconsent-component(.*)?$/, 'shifty/src/tweenable'],
    filenames: {
      img: ({ isDev }) => isDev ? '[path][name].[ext]' : 'img/[name]-[hash:7].[ext]',
      font: ({ isDev }) => isDev ? '[path][name].[ext]' : 'fonts/[name]-[hash:7].[ext]'
    },
    postcss: {
      plugins: {
        tailwindcss: path.resolve(__dirname, './tailwind.config.js'),
        'autoprefixer': {},
        'postcss-nested': {
          browsers: ['> 5%']
        }
      },
      preset: {
        features: {
          customProperties: false
        }
        // // Change the postcss-preset-env settings
        // autoprefixer: {
        //   grid: true
        // }
      }
    },
    loaders: {
      /*
            stylus: {
              import: ['~assets/style/variables.styl']
            }
            */
    },
    /*
         * Run ESLint on save
         */
    extend(config, ctx) {
      if (ctx.isClient) {
        if (ctx.isDev) {
          config.module.rules.push({
            enforce: 'pre',
            test: /\.(js|vue)$/,
            loader: 'eslint-loader',
            exclude: /(node_modules)/,
            options: {
              fix: true
            }
          })
        }
      }
    }
  },

  transition: {
    name: 'fade',
    mode: 'out-in'
  },
  router: {
    // middleware: 'log',
    // middleware: 'i18n'
  },
  serverMiddleware: [
    // '~/api',
    bodyParser.json()
  ],
  axios: {
    baseURL: process.env.BASE_URL || 'http://api:8080/api',
    wssUrl: process.env.WSS_URL || 'http://api:8080/api',
    authURL: 'https://www.csaladialkotmany.hu/api',
    debug: false,
    credentials: false
  }
}
