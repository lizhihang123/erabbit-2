<template>
  <div class="page-home">
    <div class="home-entry">
      <!-- container是版心 是默认居中你的内容 -->
      <div class="container">
        <!-- 左侧分类 -->
        <HomeCategory />
      </div>
    </div>
  </div>
</template>
<script>
import HomeCategory from './components/home-category'
export default {
  name: 'PageHome',
  components: { HomeCategory }
}
</script>
<style scoped lang="less"></style>
