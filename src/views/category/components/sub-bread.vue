<template>
  <div class='SubBread'>
    <!--
      问题1：面包屑的骨架屏一直在闪烁，没有显示出数字
      解决：是因为父传子传递过来出错了

      问题2：面包屑 点击二级类目时 面包屑没有transition动画
      解决：首先 明确 (确实)是没有动画
        1. 刷新的时候是有动画的 + 点击二级类目的时候是没有动画的
        2. ok需要给面包屑增加一个key属性，值是SubCategory的id (为什么) 有key值 就能够比较出节点的不同 然后销毁旧的dom创建新的dom
     -->
    <XtxBread>
      <XtxBreadItem path="/">首页</XtxBreadItem>
      <Transition
        name="fade-right"
        mode="out-in"
      >
        <template v-if="SubCategory && SubCategory.top && SubCategory.top.name">
          <XtxBreadItem :key="SubCategory.top.id">{{SubCategory.top && SubCategory.top.name}}</XtxBreadItem>
        </template>
        <xtx-skeleton
          v-else
          animated
          width="20px"
          height="20px"
          bg="#e4e4e4"
        >
        </xtx-skeleton>
      </Transition>
      <Transition
        name="fade-right"
        mode="out-in"
      >
        <template v-if="SubCategory && SubCategory.sub && SubCategory.sub.name">
          <XtxBreadItem :key="SubCategory.sub.id">{{SubCategory.sub && SubCategory.sub.name}}</XtxBreadItem>
        </template>
        <xtx-skeleton
          v-else
          animated
          width="20px"
          height="20px"
          bg="#e4e4e4"
        >
        </xtx-skeleton>
      </Transition>
    </XtxBread>
  </div>
</template>

<script>
export default {
  name: 'SubBread',
  props: {
    SubCategory: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style scoped lang='less'>
</style>
