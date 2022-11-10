<template>
  <!-- 筛选区 -->
  <div
    class="sub-filter"
    v-if="filterData"
  >
    <div
      class="item"
      v-for="filter in filterData"
      :key="filter.id"
    >
      <div class="head"></div>
      <div class="body">
        <a href="javascript:;">全部</a>
        <a
          href="javascript:;"
          v-for="i in 4"
          :key="i"
        >小米</a>
      </div>
    </div>
  </div>
</template>
<script>
import { watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import { findSubCategoryFilter } from '@/api/category'
export default {
  name: 'SubFilter',
  setup () {
    // 1.拿数据
    // 2.
    const filterData = ref([])
    const route = useRoute()
    watch(() => route.params.id, (newVal, oldVal) => {
      if (newVal && route.path === `/category/sub/${newVal}`) {
        findSubCategoryFilter(route.params.id).then(data => {
          filterData.value = data.result
          console.log(filterData.value)
        })
      }
    }, {
      immediate: true
    })
    return {
      filterData
    }
  }
}
</script>
<style scoped lang='less'>
// 筛选区
.sub-filter {
  background: #fff;
  padding: 25px;
  .item {
    display: flex;
    line-height: 40px;
    .head {
      width: 80px;
      color: #999;
    }
    .body {
      flex: 1;
      a {
        margin-right: 36px;
        transition: all 0.3s;
        display: inline-block;
        &.active,
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>
