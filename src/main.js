import Vue from 'vue'
import App from './App.vue'
import router from './router'


import './styles/main.scss'

import 'document-register-element/build/document-register-element'
import vueCustomElement from 'vue-custom-element'
Vue.use(vueCustomElement)

// import S from './utils/FriendlyStorage.js'
// import S from './utils/FriendlyStorage.js'
import S from './utils/FriendlyStorage.js'

// Vue.config.productionTip = false

import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

import {faGear, faBars, faTrash} from '@fortawesome/free-solid-svg-icons'

library.add(faGear, faBars, faTrash)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false;

App.router = router
Vue.customElement('weather-widget', App)
