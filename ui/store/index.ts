import { defineStore } from 'pinia'
type User = {
  id: number;
  name: string;
  email: string;
}
export const useAuthStore = defineStore('main', {
  state: () => ({
    user: {} as User
  }),
  getters: {
  },
  actions: {
    setUser (data: User) {
      this.user = data
    }
  }
})
