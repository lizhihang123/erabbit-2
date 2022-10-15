import { topCategory } from '@/api/constant'
import { findAllCategory } from '@/api/category'
export default {
  namespaced: true,
  state: {
    list: topCategory.map((item) => ({ name: item }))
  },
  getters: {},
  mutations: {
    // 修改列表
    setList (state, payload) {
      state.list = payload
    },
    // 显示二级类目
    show (state, target) {
      // 对应的category分类的open属性改为true
      const category = state.list.find(item => item.id === target.id)
      category.open = true
    },
    // 隐藏二级类目
    hide (state, target) {
      // 对应的category分类的open属性改为false
      const category = state.list.find(item => item.id === target.id)
      category.open = false
    }
  },
  actions: {
    // 获取所有的头部分类
    async getList ({ commit }) {
      try {
        const { result } = await findAllCategory()
        commit('setList', result)
        result.forEach(item => {
          item.open = false
        })
      } catch (error) {
        console.log(error)
      }
    }
  },
  modules: {}
}
