import Vue from "vue";

const state = {
  netState: true
}

const mutations = {
  updateNetState(state, net) {
    // state.netState = net
    Vue.set(state, 'net', net);
  }
}

const actions = {
  updateNetState: ({
    commit
  }) => commit('updateNetState')
}

const getters = {
  netState(state) {
    return state.netState
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
