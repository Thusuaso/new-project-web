const state = {
  userId: null,
  username: null,
  authentication: false
}

const actions = {

}

const mutations = {
  _setUserId(state, data) {
    state.userId = data;
  },
  _setUsername(state, data) {
    state.username = data;
  },
}

const getters = {
  __getUserId(state) {
    return state.userId;
  },
  __getUsername(state) {
    return state.username;
  },
  __isAuthentication(state) {

    return state.userId != null;
  }

}

export default {
  state,
  actions,
  mutations,
  getters
}