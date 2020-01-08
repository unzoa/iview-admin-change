import Vue from 'vue'
import Vuex from 'vuex'
import * as state from './state'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

import app from './module/app'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules: {
    app
  }
})
