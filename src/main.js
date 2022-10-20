import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 重置样式
import 'normalize.css'
// 公用样式
import './assets/styles/common.less'
// 使用插件
import ui from '@/components/library/index'

createApp(App).use(store).use(router).use(ui).mount('#app')
