<template>
  <div class="page-home">
    <div class="home-entry">
      <!-- container是版心 是默认居中你的内容 -->
      <div class="container">
        <!-- 左侧分类 -->
        <HomeCategory />
        <!-- 分类右边的轮播图组件 -->
        <HomeBanner />
        <!-- 新鲜好物 -->
        <HomeNew />
        <!-- 人气推荐 -->
        <HomeHot />
        <!-- 品牌推荐 -->
        <HomeBrand />
        <!-- 产品区块 -->
        <!-- <HomeProduct /> -->
        <!-- 最新模块 -->
        <HomeSpecial />
        <!-- 面包屑 -->
        <XtxBread
          parentPath="www.baidu.com"
          parentName="百度"
        >
          我是谁？
        </XtxBread>
      </div>
    </div>
  </div>
</template>
<script>
import HomeCategory from './components/home-category'
import HomeBanner from './components/home-banner'
import HomeNew from './components/home-new'
import HomeHot from './components/home-hot'
import HomeBrand from './components/home-brand'
// import HomeProduct from './components/home-product'
import HomeSpecial from './components/home-special'
import { ref } from 'vue'
export default {
  name: 'PageHome',
  components: {
    HomeCategory,
    HomeBanner,
    HomeNew,
    HomeHot,
    HomeBrand,
    HomeSpecial
    // HomeProduct
  },
  setup () {
    const show = ref(true)
    return {
      show
    }
  }
}
</script>
<style scoped lang="less">
.v-enter-active {
  // transition: all 0.3s ease-out;
  animation: bounce-in 0.5s;
}
.v-leave-active {
  // transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
// .v-enter-from,
// .v-leave-to {
//   transform: translateX(20px);
//   opacity: 0;
// }
</style>
