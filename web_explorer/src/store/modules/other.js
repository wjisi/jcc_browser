import Vue from "vue";

const state = {
  netState: true,
  contentTitle: ""
}

const mutations = {
  updateNetState(state, netState) {
    Vue.set(state, 'netState', netState);
  },
  updateContentTitle(state, contentTitle) {
    Vue.set(state, 'contentTitle', contentTitle);
  }
}

const actions = {
  updateNetState: ({
    commit
  }) => commit('updateNetState'),
  updateContentTitle: ({
    commit
  }, title) => commit('updateContentTitle', title)
}

const getters = {
  netState(state) {
    return state.netState;
  },
  contentTitle(state) {
    return state.contentTitle;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
