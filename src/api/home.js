import request from '@/utils/request'

// 获取品牌广告信息(左侧menu使用)
export const findBrand = () => {
  return request('/home/brand', 'get')
}

// 获取所有的广告banner信息(home-banner组价给轮播图使用)
export const findBanner = () => {
  return request('/home/banner', 'get')
}
