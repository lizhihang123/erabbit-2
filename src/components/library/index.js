// Vue扩展功能：1.全局组件 2.自定义指令
// Vue2和Vue3都是导出一个对象，里面有install方法
// Vue2 -》install(Vue)实例
// Vue3 -》install(app)实例

import XtxSkeleton from '@/components/library/xtx-skeleton.vue'
import XtxCarousel from '@/components/library/xtx-carousel.vue'
export default {
  install (app) {
    app.component(XtxSkeleton.name, XtxSkeleton)
    app.component(XtxCarousel.name, XtxCarousel)
  }
}
