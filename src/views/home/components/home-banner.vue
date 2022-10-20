<template>
  <div class="home-banner">
    <XtxCarousel
      :sliders="sliders"
      autoPlay
      :duration="1000"
    />
  </div>
</template>
<script>
import { findBanner } from '@/api/home'
import { ref } from 'vue'
export default {
  name: 'HomeBanner',
  setup () {
    const sliders = ref(null)
    // 获取所有的轮播图
    findBanner().then(data => {
      sliders.value = data.result
    })
    return {
      sliders
    }
  }
}
</script>
<style scoped lang="less">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
}
</style>
