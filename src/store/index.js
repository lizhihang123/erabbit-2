import { createStore } from 'vuex'
import cart from './modules/cart'
import user from './modules/user'
import category from './modules/category'
import createPersistedstate from 'vuex-persistedstate'
export default createStore({
  modules: {
    cart,
    user,
    category
  },
  plugins: [
    createPersistedstate({
      key: 'erabbit-client-pc-store2',
      paths: ['user', 'cart']
    })
  ]
})
