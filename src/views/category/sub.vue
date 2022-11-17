<template>
  <div class="container">
    <!-- 面包屑 -->
    <SubBread :SubCategory="SubCategory"></SubBread>
    <!-- 筛选区 -->
    <SubFilter @sort-filter="changeFilter"></SubFilter>
    <!-- 结果区域 -->
    <div class="goods-list">
      <!-- 排序 -->
      <SubSort @sort-change="changeSort"></SubSort>
      <!-- 列表 -->
      <ul>
        <li
          v-for="
        good
        in
        goodList"
          :key="good.id"
        >
          <GoodsItem :good="good" />
        </li>
      </ul>

      <!-- 加载 -->
      <XtxInfiniteLoading
        :loading="loading"
        :finished="finished"
        @infinite="getData"
      ></XtxInfiniteLoading>
    </div>
  </div>
</template>
<script>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { computed, ref, watch } from 'vue'
import SubBread from './components/sub-bread.vue'
import SubFilter from './components/sub-filter.vue'
import SubSort from './components/sub-sort.vue'
import GoodsItem from './components/goods-item.vue'
import { findSubCategoryGoods } from '@/api/category'
export default {
  name: 'SubCategory',
  components: {
    SubBread,
    SubFilter,
    SubSort,
    GoodsItem
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
    // filter加载数据
    const goodList = ref([])
    const loading = ref(false)
    const finished = ref(false)
    // 查询的参数
    let reqParams = {
      page: 1,
      pageSize: 10
    }
    // 获取数据函数
    // 1. loading值 改为false
    // 2. 修改 reqParams.categoryId
    // 3. 发请求 分为有数据和没有数据两种情况 根据result.items.length来判断
    const getData = () => {
      // 开始加载
      loading.value = true
      // 分类ID 接口需要
      reqParams.categoryId = route.params.id
      findSubCategoryGoods(reqParams).then(({ result }) => {
        // 有数据时
        if (result.items.length) {
          goodList.value.push(...result.items)
          // 页码加+1
          reqParams.page++
        } else {
          // 数据全部加载完毕了
          finished.value = true
        }
        // 加载结束
        loading.value = false
      })
    }

    // 切换二级分类时 重新加载数据
    watch(() => route.params.id, (newVal) => {
      if (newVal && route.path === `/category/sub/${newVal}`) {
        // 清空这个数组
        goodList.value = []
        // 请求参数变化
        reqParams = {
          page: 1,
          pageSize: 20
        }
        // 重新加载数据
        finished.value = false
      }
    })

    // 修改排序
    const changeSort = (params) => {
      reqParams = { ...reqParams, ...params }
      goodList.value = []
      // 重新获取页码
      reqParams.page = 1
      finished.value = false
    }
    // 修改筛选
    const changeFilter = (params) => {
      reqParams = { ...reqParams, ...params }
      goodList.value = []
      reqParams.page = 1
      finished.value = false
    }
    return {
      SubCategory,
      getData,
      goodList,
      loading,
      finished,
      changeSort,
      changeFilter
    }
  }
}
</script>
<style scoped lang="less">
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
