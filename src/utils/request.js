import axios from 'axios'
import store from '@/store'
import router from '@/router'

// 导出基地址
export const baseURL = 'http://apipc-xiaotuxian-front.itheima.net/'

// axios的基本配置
const instance = axios.create({
  baseURL,
  timeout: 5000
})

// 拦截请求的业务逻辑
instance.interceptors.request.use(config => {
  const { profile } = store.state.user
  // 有profile就携带
  if (profile.token) {
    config.headers.Authorization = `Bearer ${profile.token}`
  }
  return config
}, err => {
  return Promise.reject(err)
})

// 拦截响应的业务逻辑
instance.interceptors.response.use(res => res.data, err => {
  debugger
  if (err.response && err.response.status === 404) {
    // 清空无效的用户数据
    store.commit('user/setUser', {})
    // 获取当前页面的完整路径
    // 组件里面可以使用$router.path 但是 '/user?a=10' a=10会被忽略 要用 $router.fullPath
    // js文件里面 引入router文件夹里面的index.js文件即可
    // router.currentRoute相当于 $router.fullPath 但是这是响应式数据 所以还要.value.fullPath
    const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
    // 跳转到登录页面
    router.push('/login/redirect' + fullPath)
  }
  return Promise.reject(err)
})

// 请求工具函数
export default (url, method, submitData) => {
  return instance({
    url,
    method,
    // 设置动态的key get就用params传参
    // post就用data传参
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}
