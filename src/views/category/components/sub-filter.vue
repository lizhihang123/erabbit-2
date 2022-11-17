<template>
  <!-- 筛选区 -->
  <div
    class="sub-filter"
    v-if="filterData && !filterLoading"
  >
    <!-- 品牌结构 -->
    <div class="item">
      <div class="head">品牌</div>
      <div class="body">
        <a
          v-for="brand in filterData.brands"
          :key="brand.id"
          href="javascript:;"
          :class="{active: filterData.selectBrand === brand.id}"
          @click="changeBrand(brand.id)"
        >
          {{brand.name}}
        </a>
      </div>
    </div>
    <!-- 真正的商品结构 -->
    <div
      class="item"
      v-for="item in filterData.saleProperties"
      :key="item.id"
    >
      <div class="head">{{item.name}}</div>
      <div class="body">
        <a
          v-for="property in item.properties"
          :key="property.id"
          href="javascript:;"
          :class="{active: item.selectProp === property.id}"
          @click="changeSale(item, property.id)"
        >
          {{property.name}}
        </a>
      </div>
    </div>
  </div>

  <div
    class="sub-filter"
    v-else
  >
    <XtxSkeleton
      class="item"
      width="800px"
      height="30px"
      animated
    ></XtxSkeleton>
    <XtxSkeleton
      class="item"
      width="800px"
      height="30px"
      animated
    ></XtxSkeleton>
    <XtxSkeleton
      class="item"
      width="600px"
      height="20px"
      animated
    ></XtxSkeleton>
    <XtxSkeleton
      class="item"
      width="600px"
      height="20px"
      animated
    ></XtxSkeleton>
  </div>
</template>
<script>
/*
1. 引入接口调用 （什么时候调用呢？二级分类id触发的时候调用）获取到result数据
2. 数据渲染到页面
3. (全部)给每个品牌 selectBrand 和 每个sku添加{id: null, name: '全部'}
4. (给小a)添加动态class 让全部先能够显示 需要一个selectBrand和每个saleProperties里面都需要一个selectProp
(易错点):class="{active: item.selectProp === property.id}" selectProp是在上一层级，而property.id是每个细分的小规格
5. 骨架屏的结构添加
   5.1 骨架屏的数据渲染
   5.2 骨架屏添加类名 最好和原先的一致
   5.3 (难点)需要一个filterLoading 如果数据加载中，这个值是true 那么就显示骨架屏 -> 不然一直有数据 从有 -> 有 就不好触发骨架屏才是
*/

import { findSubCategoryFilter } from '@/api/category'
import { watch, ref } from 'vue'
import { useRoute } from 'vue-router'
export default {
  name: 'SubFilter',
  setup (props, { emit }) {
    const route = useRoute()
    const filterData = ref([])
    const filterLoading = ref(false)
    const isShow = ref(false)
    watch(() => route.params.id, (newVal, oldVal) => {
      // 二级类目触发 才调用接口
      if (newVal && route.path === `/category/sub/${newVal}`) {
        filterLoading.value = true
        findSubCategoryFilter(route.params.id).then(({ result }) => {
          // 每个品牌前面的 “全部”
          result.brands.unshift({ id: null, name: '全部' })
          // 每个sku的最前面的 “全部”
          result.saleProperties.forEach(pro => {
            pro.properties.unshift({ id: null, name: '全部' })
            // 每个sku的初始值是“全部”要选中 -> 结合动态class
            pro.selectProp = null
          })
          // 品牌的初始值是全部要选中 -> 结合动态class
          result.selectBrand = null
          filterData.value = result
          filterLoading.value = false
          console.log(filterData.value)
        })
      }
    }, {
      // 一进入页面就要调用接口
      immediate: true
    })
    // 一个方法适用 品牌和sku属性的参数拼接
    const getFilterParams = () => {
      const filterParams = {}
      const attrs = []
      // 品牌的参数拼接 直接给到filterParams的属性
      filterParams.selectBrand = filterData.value.selectBrand
      // sku的属性拼接
      filterData.value.saleProperties.forEach(item => {
        // 找到点击的id的那一个property属性
        const property = item.properties.find(property => property.id === item.selectProp)
        // 如果有id就放到attrs数组里面去后续挂载到fiterParams对象上
        if (property && property.id !== undefined) {
          attrs.push({ groupName: item.name, propertyName: property.name })
        }
      })
      if (attrs.length) {
        filterParams.attrs = attrs
      }
      return filterParams
    }
    // 选中的是品牌
    const changeBrand = (brandId) => {
      // 如果点击的就是当前选中的，就不需要再次发送请求了
      if (filterData.value.selectBrand === brandId) return
      filterData.value.selectBrand = brandId
      emit('sort-filter', getFilterParams())
    }
    // 选中的是参数sku
    const changeSale = (item, propertyId) => {
      // 如果点击的就是当前选中的，就不需要再次发送请求了
      if (item.selectProp === propertyId) return
      item.selectProp = propertyId
      emit('sort-filter', getFilterParams())
    }
    const changFn = (val) => {
      console.log(val)
    }

    return {
      filterData,
      filterLoading,
      isShow,
      changFn,
      changeBrand,
      changeSale
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
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
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
.xtx-skeleton {
  margin-top: 10px;
}
</style>
