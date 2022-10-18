<template>
  <!-- 最顶部nav栏 -->
  <AppTopnav></AppTopnav>
  <!-- 头部导航栏(logo + nav + 购物车search + 购物车按钮) -->
  <AppHeader>
  </AppHeader>
  <!-- 吸顶头部 -->
  <AppHeaderSticky></AppHeaderSticky>
  <!-- 二级路由 -->
  <main>
    <router-view>
    </router-view>
  </main>
  <!-- 底部内容 -->
  <AppFooter></AppFooter>
</template>

<script>
import AppTopnav from '../components/app-topnav'
import AppHeader from '../components/app-header'
import AppFooter from '../components/app-footer'
import AppHeaderSticky from '../components/app-header-sticky'
import { useStore } from 'vuex'
export default {
  name: 'xtx-layout',
  components: {
    AppTopnav,
    AppHeader,
    AppFooter,
    AppHeaderSticky
  },
  setup () {
    const store = useStore()
    store.dispatch('category/getList')
  }
}
</script>

<style scoped lang='less'>
</style>
