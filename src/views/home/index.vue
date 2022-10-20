<template>
  <div class="page-home">
    <div class="home-entry">
      <!-- container是版心 是默认居中你的内容 -->
      <div class="container">
        <!-- 左侧分类 -->
        <HomeCategory />
        <!-- 分类右边的轮播图组件 -->
        <HomeBanner />
      </div>
    </div>
  </div>
</template>
<script>
import HomeCategory from './components/home-category'
import HomeBanner from './components/home-banner'
export default {
  name: 'PageHome',
  components: { HomeCategory, HomeBanner }
}
</script>
<style scoped lang="less"></style>
