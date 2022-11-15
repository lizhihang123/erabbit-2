<template>
  <div
    class="xtx-checkbox"
    @click="changeChecked"
  >
    <!-- 选中的 -->
    <i
      v-if="checked"
      class="iconfont icon-checked"
    ></i>
    <!-- 没选中的 -->
    <i
      v-else
      class="iconfont icon-unchecked"
    ></i>
    <!-- 默认的插槽 -->
    <span v-if="$slots.default">
      <slot />
    </span>
  </div>
</template>
<script>
/*
1. 组件内部，接受父亲传递的modelValue值过来。因为vue3里面v-model默认的值是modelValue
2. 如果点击了，要通过emit通过父亲修改值
3. 如果props的modelValue修改了，也要更新checked的值。需要watch侦听器
测试
1. 发现checked.value是true 已经传递给父亲，父亲的isShow已经发生了更改了。但是儿子没有接受到反应呢 -> (测试的方法不对) 直接在xtx-checkbox里面打印 checked.value就可以发现成功与否了

换成 使用useVModel
*/
// import { ref, watch } from 'vue'
import { useVModel } from '@vueuse/core'
export default {
  name: 'XtxCheckbox',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    // const checked = ref(false)
    // const changeChecked = () => {
    //   checked.value = !checked.value
    //   // 子传父
    //   emit('update:modelValue', checked.value)
    // }
    // // 使用侦听器
    // watch(() => props.modelValue, () => {
    //   // 父传子
    //   checked.value = props.modelValue
    // }, {
    //   immediate: true
    // })

    // 1. 让checked成为双向数据绑定的响应式数据 和 modelValue关联
    //    父传子，modelValue的值会给到checked
    const checked = useVModel(props, 'modelValue', emit)
    const changeChecked = () => {
      const newVal = !checked.value
      checked.value = newVal
      // 子传父
      emit('change', newVal)
      // 子传父去修改父亲的值 父亲改了 -> 儿子的值也会发生改变 -> 这是异步的操作 所以用到定时器才能获取到最新的修改
      // setTimeout(() => {
      //   console.log(props.modelValue, checked)
      // })
    }
    return { checked, changeChecked }
  }
}
</script>
<style scoped lang="less">
.xtx-checkbox {
  display: inline-block;
  margin-right: 2px;
  .icon-checked {
    color: @xtxColor;
    ~ span {
      color: @xtxColor;
    }
  }
  i {
    position: relative;
    top: 1px;
  }
  span {
    margin-left: 2px;
  }
}
</style>
