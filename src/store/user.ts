import { defineStore } from 'pinia'
import utils from '@constq/qzr-utils'
import api from '@/api'
import router from '@/router'
import { User } from '@/types/system/user'

interface UserState {
  info: User | undefined
  token: string | undefined
}

export const useUser = defineStore({
  id: 'USER',
  state():UserState {
    return {
      info: undefined,
      token: ''
    }
  },
  getters: {
    isLogin(state: UserState) {
      return Boolean(state.info)
    },
    isAdmin(state: UserState) {
      return state.info?.isAdministrators ?? false
    }
  },
  actions: {
    async login(param) {
      const res = await api.login(param)
      this.info = res
      this.getToken()
    },
    async logout() {
      try {
        await api.logout({
          uid: this.info!.uid
        })
      } catch (error) {
        this.info = undefined
        router.push('/login')
      }

      this.info = undefined
      console.log(router)
      router.push('/login')
    },
    getToken() {
      this.token = utils.bom.cookie.get('satoken')
    }
  },
  persist: {
    enabled: true
  }
})
