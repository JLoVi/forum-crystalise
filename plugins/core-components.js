import Vue from 'vue'
import AppControlInput from '@/components/UI/AppControlInput'

Vue.component('AppButton', () => import('~/components/UI/AppButton'))
Vue.component('AppControlInput', AppControlInput)
