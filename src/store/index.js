import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export function createStore() {
  return new Vuex.Store({
    state: {
      cnt: 108,
    },
    mutations: {
      add(state) {
        state.cnt += 1
      },
    },
  })
}
