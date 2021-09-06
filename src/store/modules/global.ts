const constState = {
  host: import.meta.env.VITE_HOST
}

export default {
  namespaced: true,
  state() {
    return constState
  },
  mutations: {
  },
  actions: {
  },
  getters: {
    getHost(state: typeof constState) {
      return state.host
    }
  }
}
