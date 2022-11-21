<template>
  <div
    class="xtx-city"
    ref="target"
  >
    <div
      class="select"
      @click="toggleDialog"
      :class="{active}"
    >
      <span class="placeholder">请选择配送地址</span>
      <span class="value"></span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div
      class="option"
      v-if="active"
    >
      <span
        class="ellipsis"
        v-for="i in 24"
        :key="i"
      >北京市</span>
    </div>
  </div>
</template>

<script>
/*
    想到了什么：
    0. 数据从哪里来的？ 从某个地址来的
    1. 一个div里面存储所有的内容
    2. 点击省 出现市 点击市 出现乡村 -> 需要用到计算属性
    3. 不仅不需要name 还需要code
*/
import { ref } from 'vue'
export default {
  name: 'XtxCity',
  setup () {
    // 1. 声明ref数据 绑定指定dom
    const target = ref(null)
    const active = ref(false)
    // 2. 控制展开和收起的方法
    const openDialog = () => {
      active.value = true
    }
    const closeDialog = () => {
      active.value = false
    }
    const toggleDialog = () => {
      if (!active.value) {
        openDialog()
      } else {
        closeDialog()
      }
    }
    return {
      target,
      toggleDialog,
      active
    }
  }
}
</script>

<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>
