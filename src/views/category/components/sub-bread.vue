<template>
  <div class='SubBread'>
    <XtxBread>
      <XtxBreadItem path="/">首页</XtxBreadItem>
      <Transition
        name="fade-right"
        mode="out-in"
      >
        <template v-if="SubCategory && SubCategory.top && SubCategory.top.name">
          <XtxBreadItem>{{SubCategory.top && SubCategory.top.name}}</XtxBreadItem>
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
          <XtxBreadItem>{{SubCategory.sub && SubCategory.sub.name}}</XtxBreadItem>
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
