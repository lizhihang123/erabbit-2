<template>
  <div class="container">
    <!-- 面包屑 -->
    <SubBread :sub-category="SubCategory"></SubBread>
    <!-- 筛选区 -->
    <SubFilter></SubFilter>
  </div>
</template>
<script>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import SubBread from './components/sub-bread.vue'
import SubFilter from './components/sub-filter.vue'
export default {
  name: 'SubCategory',
  components: {
    SubBread,
    SubFilter
  },
  setup () {
    const store = useStore()
    const route = useRoute()
    // 怎么查找这个数据 有点卡住了
    const SubCategory = computed(() => {
      const obj = {}
      // 先去遍历父亲的值
      store.state.category.list.forEach(top => {
        top.children && top.children.forEach(sub => {
          // 再去遍历top的children的值 只有在内部的id一致的时候才行
          if (sub.id === route.params.id) {
            obj.top = { id: top.id, name: top.name }
            obj.sub = { id: sub.id, name: sub.name }
          }
        })
      })
      return obj
    })
    // console.log(SubCategory)
    return {
      SubCategory
    }
  }
}
</script>
<style scoped lang="less">
</style>
