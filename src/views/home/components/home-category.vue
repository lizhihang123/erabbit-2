<template>
  <!--
    1.左侧列表渲染好 但是li的左侧空出了很大的内容
    2.注意需要10个li，但是vuex里面只有9个，所以需要push进去一个
      如何push进去一个数据list呢？计算属性+vuex获取(如果只是vuex 那么数据就不是响应式的 + vue3里面的computed数据就是响应式的数据)
    3.创建一个brand数据
      往list数据push一个brand进去，然后返回list
    4.组件渲染

    出现问题：
    1.页面渲染 子nav渲染不出来 -> lis.children丢掉了children
    2.页面白屏了一会 只有一级子类目 -> 后续会有骨架屏
    3.内容没有左对齐 -> text-align: left;就可以解决

    ------------------
    (鼠标经过 弹层渲染)
    1.鼠标经过 记得id
    2.通过id 得到分类商品数据
    3.根据这个商品数据 来进行渲染
 -->
  <div
    class='home-category'
    @mouseleave="categoryId = null"
  >
    <!-- 左侧menu -->
    <ul class="menu">
      <li
        v-for="lis in menuList"
        :key="lis.id"
        @mouseenter="categoryId = lis.id"
        :class="{active: lis.id === categoryId}"
      >
        <RouterLink :to="`/category/${lis.id}`">{{lis.name}}</RouterLink>
        <template v-if="lis.children">
          <RouterLink
            :to="`/category/sub/${sub.id}`"
            v-for="sub in lis.children"
            :key="sub.id"
          >
            {{sub.name}}
          </RouterLink>
        </template>
        <!-- 骨架屏组件 -->
        <template v-else>
          <xtx-skeleton
            :animated="true"
            width="54px"
            height="18px"
            style="margin-right: 5px;"
            bg="rgba(255,255,255, 0.2)"
          />
          <xtx-skeleton
            :animated="true"
            width="54px"
            height="18px"
            bg="rgba(255,255,255, 0.2)"
          />
        </template>
      </li>
    </ul>
    <!-- 弹层 -->
    <div
      class="layer"
      v-if="(curCategory && curCategory.goods ) ||
      (curCategory && curCategory.brandResult)"
    >
      <h4>{{ curCategory && curCategory.brandResult ? "品牌推荐" : "分类推荐"}}
        <small>根据您的购买或浏览记录推荐</small>
      </h4>
      <ul>
        <li
          v-for="good in curCategory.goods"
          :key="good.id"
        >
          <RouterLink to="/">
            <img
              :src="good.picture"
              alt=""
            >
            <div class="info">
              <p class="name ellipsis-2">{{good.name}}</p>
              <p class="desc ellipsis">{{good.desc}}</p>
              <p class="price"><i>¥</i>{{good.price}}</p>
            </div>
          </RouterLink>
        </li>
      </ul>

      <!-- 品牌专用的结构 -->
      <!-- 注意 curCategory里面存放的是brands而不是brand -->
      <ul v-if="curCategory && curCategory.brandResult && curCategory.brandResult.length">
        <li
          class="brand"
          v-for="item in curCategory.brandResult"
          :key="item.id"
        >
          <RouterLink to="/">
            <img
              :src="item.picture"
              alt=""
            >
            <div class="info">
              <p class="place"><i class="iconfont icon-dingwei"></i>{{item.place}}</p>
              <p class="name ellipsis">{{item.name}}</p>
              <p class="desc ellipsis-2">{{item.desc}}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { findBrand } from '@/api/home'
export default {
  name: 'HomeCategory',
  setup () {
    // 1.menu逻辑
    const store = useStore()
    const brand = reactive({
      id: 'brand',
      name: '品牌',
      children: [{
        id: 'brand-children',
        name: '品牌推荐'
      }],
      // 左侧弹层 layer使用
      brandResult: []
    })
    const menuList = computed(() => {
      const list = store.state.category.list.map((item, index) => {
        return {
          id: item.id || index,
          name: item.name,
          children: item.children && item.children.slice(0, 2),
          // item里面的goods 配合layer的使用
          goods: item.goods
        }
      })
      list.push(brand)
      return list
    })

    // 2.弹层逻辑
    const categoryId = ref(null)
    const curCategory = computed(() => {
      return menuList.value.find(item => item.id === categoryId.value
      )
    })
    // 3.获取品牌数据
    findBrand().then(data => {
      console.log(data)
      brand.brandResult = data.result.slice(0, 6)
      // console.log(brand.brands)
    })
    return {
      menuList,
      categoryId,
      curCategory,
      brand
    }
  }
}
</script>

<style scoped lang='less'>
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 99;
  .menu {
    text-align: left;
    li {
      padding-left: 40px;
      height: 50px;
      line-height: 50px;
      &:hover,
      &.active {
        background: @xtxColor;
      }
      a {
        margin-right: 4px;
        color: #fff;
        &:first-child {
          font-size: 16px;
        }
      }
    }
  }
  &:hover {
    .layer {
      display: block;
    }
  }
}
.layer {
  width: 990px;
  height: 450px;
  background: rgba(255, 255, 255, 0.8);
  position: absolute;
  left: 250px;
  top: 0;
  // opacity: 0;
  padding: 0 15px;
  h4 {
    font-size: 20px;
    font-weight: normal;
    line-height: 80px;
    text-align: left;
    small {
      font-size: 16px;
      color: #666;
    }
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      width: 310px;
      height: 120px;
      margin-right: 15px;
      margin-bottom: 15px;
      border: 1px solid #eee;
      border-radius: 4px;
      background: #fff;

      &:nth-child(3n) {
        margin-right: 0;
      }
      a {
        display: flex;
        width: 100%;
        height: 100%;
        align-items: center;
        padding: 10px;
        &:hover {
          background: #e3f9f4;
        }
        img {
          width: 95px;
          height: 95px;
        }
        .info {
          padding-left: 10px;
          line-height: 24px;
          width: 190px;
          .name {
            font-size: 16px;
            color: #666;
          }
          .desc {
            color: #999;
          }
          .price {
            font-size: 22px;
            color: @priceColor;
            i {
              font-size: 16px;
            }
          }
        }
      }
    }
    li.brand {
      height: 180px;
      a {
        align-items: flex-start;
        img {
          width: 120px;
          height: 160px;
        }
        .info {
          p {
            margin-top: 8px;
          }
          .place {
            color: #999;
          }
        }
      }
    }
  }
  // &:hover {
  //   opacity: 1;
  // }
}
</style>
