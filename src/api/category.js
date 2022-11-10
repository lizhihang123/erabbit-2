// 引入axios
import request from '@/utils/request'

// 接口函数
export const findAllCategory = () => {
  return request('/home/category/head', 'get')
}

// 获取单个顶级分类信息
export const findTopCategory = (id) => {
  return request('/category', 'get', { id })
}
