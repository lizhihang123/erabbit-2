export default {
  namespaced: true,
  state: {
    profile: {
      id: '',
      avator: '',
      nickname: '',
      account: '',
      mobile: '',
      token: ''
    }
  },
  getters: {

  },
  mutations: {
    changeName (state, name) {
      state.name = name
    },
    changeName2 (state, name) {
      state.name = name
    }
  },
  actions: {

  },
  modules: {

  }
}
