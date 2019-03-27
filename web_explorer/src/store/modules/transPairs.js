import Vue from "vue";
import Lockr from 'lockr';
const jcPairs = {
  state: {
    transactionPairs: null,
    currentPair: {
      base: 'SWT',
      baseTitle: 'SWTC',
      counter: 'CNY',
      counterTitle: 'CNT'
    }
  },
  mutations: {
    SAVE_TRANSACTION_PAIRS(state, pairs) {
      Vue.set(state, 'transactionPairs', pairs)
    },
    SAVE_CURRENT_PAIR(state, pair) {
      state.currentPair = pair;
      Lockr.set('select_coin_item', pair)
    }
  },
  actions: {
    updateTransactionPairs: ({
      commit
    }, pairs) => commit('SAVE_TRANSACTION_PAIRS', pairs),
    updateCurrentPair: ({
      commit
    }, pair) => commit('SAVE_CURRENT_PAIR', pair)
  },
  getters: {
    transactionPairs: state => state.transactionPairs,
    selectCoinItem: state => state.currentPair
  }
}

export default jcPairs;