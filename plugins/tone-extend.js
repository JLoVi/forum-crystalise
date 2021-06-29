/* SOURCE::::::::
  https://qiita.com/uriuriuriu/items/bc30cd5eabffaa590e7a
*/
import Vue from 'vue'
import * as Tone from 'tone'
Vue.use({
  install(Vue, options) {
    Vue.prototype.$Tone = Tone
  }
})
