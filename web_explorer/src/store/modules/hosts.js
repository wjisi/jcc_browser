const hosts = {
  state: {
    hosts: {
      infoHosts: []
    }
  },
  mutations: {
    SET_HOSTS(state, hosts) {
      state.hosts = hosts
    }
  },
  actions: {
    updateHosts({
      commit
    }, hosts) {
      commit('SET_HOSTS', hosts);
    }
  },
  getters: {
    hosts: state => state.hosts
  }
};

export default hosts;