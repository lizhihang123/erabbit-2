<template>
  <div class="goods-image">
    <!-- 大图 -->
    <div
      class="large"
      :style="[{backgroundImage: `url(${images[currIndex]})`}, bgPosition]"
      v-show="show"
    >

    </div>
    <!-- 中间的图片 -->
    <div
      class="middle"
      ref="target"
    >
      <img
        :src="images[currIndex]"
        alt=""
      >
      <div
        class="layer"
        v-show="show"
        :style="position"
      ></div>
    </div>

    <!-- 小图 -->
    <ul class="small">
      <li
        v-for="(img,i) in images"
        :key="img"
        :class="{active: currIndex === i}"
      >
        <img
          @mouseenter="currIndex = i"
          :src="img"
          alt=""
        >
      </li>
    </ul>
  </div>
</template>
<script>
import { ref, reactive, watch } from 'vue'
import { useMouseInElement } from '@vueuse/core'
export default {
  name: 'GoodsImage',
  props: {
    images: {
      type: Array,
      default: () => []
    }
  },
  setup (props) {
    const currIndex = ref(0)
    const usePreviewImage = () => {
      const target = ref(null)
      const show = ref(false)
      // elementX - 鼠标的横坐标位置
      // elementY - 鼠标的纵坐标位置
      // isOutside - 是否在指定target的盒子外围
      const { elementX, elementY, isOutside } = useMouseInElement(target)
      // 遮罩的定位
      const position = reactive({
        left: 0,
        right: 0
      })
      // 大图的定位
      const bgPosition = reactive({
        backgroundPositionX: 0,
        backgroundPositionY: 0
      })
      // 使用监听器时刻监听
      // 监听鼠标的移动 横纵位置和是否在盒子的外面
      watch(([elementX, elementY, isOutside]), () => {
        // 控制X轴的方向在 0 - 200之间
        // 如果说鼠标的横坐标小于100，那么就让遮罩的左侧定位等于0，思考鼠标的elementXh和position你就可以理解啦
        // 如果鼠标的纵坐标超过300，就让遮罩的top值为200
        // 如果在100-200之间的就让减去100 意思是鼠标的横纵坐标都要位于遮罩层的中间部分
        if (elementX.value < 100) position.left = 0
        else if (elementX.value > 300) position.left = 200
        else position.left = elementX.value - 100
        // 控制Y轴的方向在 0 - 200之间
        if (elementY.value < 100) position.top = 0
        else if (elementY.value > 300) position.top = 200
        else position.top = elementY.value - 100
        // 设置大背景的定位 -> 首先是负的，反着来；其次是大背景的移动一定是遮罩的移动的两倍(放大两倍)
        bgPosition.backgroundPositionX = -position.left * 2 + 'px'
        bgPosition.backgroundPositionY = -position.top * 2 + 'px'
        // 设置遮罩容器的定位(每一次遮罩都要先依据鼠标变成数字 + 然后大背景要依据遮罩进行变化)
        position.left = position.left + 'px'
        position.top = position.top + 'px'
        // 设置是否显示预览大图 -> isOutside是true 鼠标在外面 -> 然后非判断 show就不显示
        show.value = !isOutside.value
      })

      return {
        position,
        bgPosition,
        show,
        target
      }
    }
    const { position, bgPosition, target, show } = usePreviewImage()
    return { currIndex, position, bgPosition, target, show }
  }
}
</script>
<style scoped lang="less">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  z-index: 500;
  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }
  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
    position: relative;
    cursor: move;
    .layer {
      width: 200px;
      height: 200px;
      background: rgba(0, 0, 0, 0.2);
      left: 0;
      top: 0;
      position: absolute;
    }
  }
  .small {
    width: 80px;
    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;
      &:hover,
      &.active {
        border: 2px solid @xtxColor;
      }
    }
  }
}
</style>
