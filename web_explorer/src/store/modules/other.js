import Vue from "vue";

const state = {
  netState: true, // the current net status
  currentNav: "", // the name of current navigation page
  contentTitle: "" // the content of current title bar
}

const mutations = {
  updateNetState(state, netState) {
    Vue.set(state, 'netState', netState);
  },
  updateCurrentNav(state, currentNav) {
    Vue.set(state, 'currentNav', currentNav)
  },
  updateContentTitle(state, contentTitle) {
    Vue.set(state, 'contentTitle', contentTitle);
  }
}

const actions = {
  updateNetState: ({
    commit
  }) => commit('updateNetState'),
  updateCurrentNav: ({
    commit
  }, Nav) => commit('updateCurrentNav', Nav),
  updateContentTitle: ({
    commit
  }, title) => commit('updateContentTitle', title)
}

const getters = {
  netState(state) {
    return state.netState;
  },
  currentNav(state) {
    return state.currentNav;
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
