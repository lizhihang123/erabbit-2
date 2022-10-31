// Vue扩展功能：1.全局组件 2.自定义指令
// Vue2和Vue3都是导出一个对象，里面有install方法
// Vue2 -》install(Vue)实例
// Vue3 -》install(app)实例

import XtxSkeleton from './xtx-skeleton.vue'
import XtxCarousel from './xtx-carousel.vue'
import XtxMore from './xtx-more.vue'
import defaultImage from '@/assets/images/200.png'
import XtxBread from './xtx-bread.vue'
const directives = (app) => {
  app.directive('lazyload', {
    mounted (el, binding) {
      // 创建observer对象
      const observer = new IntersectionObserver(([{ isIntersecting }]) => {
        // 解构出 isIntersecting参数 如果是true -》表示在可视范围
        if (isIntersecting) {
          // 停止监听dom
          observer.unobserve(el)
          // 给el 也就是绑定这个属性的dom 添加 onerror这个事件 然后给他的src属性添加图片
          el.onerror = function () {
            el.src = defaultImage
          }
          // 给el的src赋值 binding.value就是 v-lazyload=""绑定的值
          el.src = binding.value
        }
      })
      observer.observe(el)
    }
  })
}
export default {
  install (app) {
    app.component(XtxSkeleton.name, XtxSkeleton)
    app.component(XtxCarousel.name, XtxCarousel)
    app.component(XtxMore.name, XtxMore)
    app.component(XtxBread.name, XtxBread)
    directives(app)
  }
}
