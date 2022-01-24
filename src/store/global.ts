import { defineStore } from 'pinia'

const globalState = {
  env: import.meta.env,
  host: import.meta.env.VITE_HOST
}

export const useGlobal = defineStore({
  id: 'global',
  state() {
    return globalState
  },
  getters: {
    getHost(state: typeof globalState) {
      return state.host
    },
    getEnv(state: typeof globalState) {
      return state.env
    }
  }
})
