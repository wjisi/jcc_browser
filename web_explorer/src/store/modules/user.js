import Vue from 'vue';
import Lockr from "lockr";
import {
  isEmptyObject
} from 'js/utils';
Lockr.prefix = 'jc_browser';
/**
  当前用户状态:
  0:未登录，
  1:已登录
  */
const NEED_LOGIN = 0;
const HAD_LOGINED = 1;
const user = {
  state: {
    userStatus: Lockr.get('user_status') || NEED_LOGIN,
    userInfo: Lockr.get('user_info') || {},
    balance: {},
  },
  mutations: {
    SET_USER_STATUS(state, status) {
      state.userStatus = status
      Lockr.set('user_status', status)
    },
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo
      Lockr.set('user_info', userInfo)
    },
    SET_USER_BALANCE(state, balance) {
      Vue.set(state, 'balance', balance)
    }
  },
  actions: {
    updateUserStatus: ({
      commit
    }, status) => commit('SET_USER_STATUS', status),
    updateUserInfo: ({
      commit
    }, userInfo) => commit('SET_USER_INFO', userInfo),
    updateUserBalance: ({
      commit
    }, balance) => commit('SET_USER_BALANCE', balance),
    logout: ({
      commit
    }) => {
      commit('SET_USER_STATUS', NEED_LOGIN);
      commit('SET_USER_INFO', {});
    }
  },
  getters: {
    userStatus: state => state.userStatus,
    userInfo: state => state.userInfo,
    userName: state => state.userInfo.userName || state.userInfo.phone || '',
    balance: state => state.balance,
    isLogin(state) {
      let {
        userInfo,
        userStatus
      } = state;
      if (isEmptyObject(userInfo) || userStatus !== HAD_LOGINED) {
        return false
      }
      return true
    }
  }
};

export default user;
