<template>
  <div class='sub-sort'>
    <div class="sort">
      <a
        href="javascript:;"
        :class="{active: sortParams.sortField === null}"
        @click="changeSort(null)"
      >默认排序</a>
      <a
        href="javascript:;"
        :class="{active: sortParams.sortField === 'publishTime'}"
        @click="changeSort('publishTime')"
      >最新商品</a>
      <a
        href="javascript:;"
        :class="{active: sortParams.sortField === 'orderNum'}"
        @click="changeSort('orderNum')"
      >最高人气</a>
      <a
        href="javascript:;"
        :class="{active: sortParams.sortField === 'evaluateNum'}"
        @click="changeSort('evaluateNum')"
      >评论最多</a>
      <a
        href="javascript:;"
        @click="changeSort('price')"
      >
        价格排序
        <i
          class="arrow up"
          :class="{active: sortParams.sortMethod === 'asc'}"
        />
        <i
          class="arrow down"
          :class="{active: sortParams.sortMethod === 'desc'}"
        />
      </a>
    </div>
    <div class="check">
      <XtxCheckbox v-model="sortParams.inventory">仅显示有货商品</XtxCheckbox>
      <XtxCheckbox v-model="sortParams.onlyDiscount">仅显示特惠商品</XtxCheckbox>
    </div>
  </div>
</template>
<script>
/*
3. 页面渲染
3.1 绑定v-model
*/
import { reactive } from 'vue'
export default {
  name: 'SubSort',
  setup () {
    // 1. 根据后台需要的数据 定义数据对象
    const sortParams = reactive({
      inventory: false, // 库存
      onlyDiscount: false, // 是否有优惠
      sortField: null, // 排序的字段 [publishTime,orderNum,price,evaluateNum]
      sortMethod: null // 排序的方式 正序还是倒序
    })
    // 2. 排序条件的改变
    const changeSort = (sortField) => {
      // 根据价格
      if (sortField === 'price') {
        // price和非price里面都需要各自修改sortField 如果不修改 就会出现 点击价格 -> 其它的部分仍旧没有显示的情况
        sortParams.sortField = sortField
        if (sortParams.sortMethod === null) {
        // 初始默认是降序
          sortParams.sortMethod = 'desc'
        } else {
        // 不是初始的时候，我们取反 注意取反的方式
          sortParams.sortMethod = sortParams.sortMethod === 'desc' ? 'asc' : 'desc'
        }
      } else {
        // 按钮已经是选中状态 仍旧反复的去点击它
        if (sortParams.sortField === sortField) return
        // 传入什么，就显示修改为什么
        sortParams.sortField = sortField
        // 点击其它的时候，价格的上下箭头不需要显示
        sortParams.sortMethod = null
      }
    }
    return {
      sortParams,
      changeSort
    }
  }
}
</script>
<style scoped lang='less'>
.sub-sort {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .sort {
    display: flex;
    a {
      height: 30px;
      line-height: 28px;
      border: 1px solid #e4e4e4;
      padding: 0 20px;
      margin-right: 20px;
      color: #999;
      border-radius: 2px;
      position: relative;
      transition: all 0.3s;
      &.active {
        background: @xtxColor;
        border-color: @xtxColor;
        color: #fff;
      }
      .arrow {
        position: absolute;
        border: 5px solid transparent;
        right: 8px;
        &.up {
          top: 3px;
          border-bottom-color: #bbb;
          &.active {
            border-bottom-color: @xtxColor;
          }
        }
        &.down {
          top: 15px;
          border-top-color: #bbb;
          &.active {
            border-top-color: @xtxColor;
          }
        }
      }
    }
  }
  .check {
    .xtx-checkbox {
      margin-left: 20px;
      color: #999;
    }
  }
}
</style>
