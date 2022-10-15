// 引入axios
import request from '@/utils/request'

// 接口函数
export const findAllCategory = () => {
  return request('/home/category/head', 'get')
}
