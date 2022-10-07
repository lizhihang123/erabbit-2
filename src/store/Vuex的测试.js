import { createStore } from 'vuex'

export default createStore({
  state: {
    username: 'xiaohang'
  },
  getters: {
    newName (state) {
      return state.username + '!!'
    }
  },
  mutations: {
    updateName (state, name) {
      state.username = name
    }
  },
  actions: {
    updateName (ctx, name) {
      setTimeout(() => {
        ctx.commit('updateName', name)
      }, 1000)
    }

  },
  modules: {
    good: {
      namespaced: true,
      state: {
        good1: {
          price: 100
        }
      },
      mutations: {
        changeGood (state, newPrice) {
          state.good1.price = newPrice
        }
      },
      actions: {
        updateGood (ctx, newPrice) {
          setTimeout(() => {
            ctx.commit('changeGood', newPrice)
          })
        }
      }
    }
  }
})
