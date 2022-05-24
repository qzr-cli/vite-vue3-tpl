import { defineStore } from 'pinia'

interface GlobalState {
  env: any
  host: string
}

export const useGlobal = defineStore({
  id: 'GLOBAL',
  state(): GlobalState {
    return {
      env: import.meta.env,
      host: import.meta.env.VITE_HOST
    }
  },
  getters: {
  },
  actions: {

  },
  persist: {
    enabled: true
  }
})
