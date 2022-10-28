import request from '@/utils/request'

// 获取品牌广告信息(左侧menu的最后一个li使用)
export const findBrands = () => {
  return request('/home/brand', 'get')
}

// 获取所有的广告banner信息(home-banner组价给轮播图使用)
export const findBanner = () => {
  return request('/home/banner', 'get')
}

// 获取新鲜好物
export const findNew = () => {
  return request('home/new', 'get')
}
// 人气推荐的API
export const findHot = () => {
  return request('home/hot', 'get')
}

// 热门品牌
export const findBrand = () => {
  return request('home/brand', 'get')
}

// 获取产品内容
export const findGoods = () => {
  return request('home/goods', 'get')
}

// 最新专题
export const findSpecial = () => {
  return request('home/special', 'get')
}
