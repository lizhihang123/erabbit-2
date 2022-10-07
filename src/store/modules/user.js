export default {
  namespaced: true,
  state: {
    name: '123'
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
