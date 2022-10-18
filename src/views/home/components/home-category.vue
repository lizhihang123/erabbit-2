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

    问题：
    1.鼠标离开时，还是显示右侧的商品
 -->
  <div class='home-category'>
    <!-- 左侧menu -->
    <ul class="menu">
      <li
        v-for="lis in menuList"
        :key="lis.id"
        @mouseenter="categoryId = lis.id"
        @mouseleave="curCategory = null"
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
      </li>
    </ul>
    <!-- 弹层 -->
    <div class="layer">
      <h4>分类推荐 <small>根据您的购买或浏览记录推荐</small></h4>
      <ul v-if="curCategory && curCategory.goods">
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
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref } from 'vue'
import { useStore } from 'vuex'
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
      }]
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
    return {
      menuList,
      categoryId,
      curCategory
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
      &:hover {
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
}
.layer {
  width: 990px;
  height: 500px;
  background: rgba(255, 255, 255, 0.8);
  position: absolute;
  left: 250px;
  top: 0;
  display: none;
  padding: 0 15px;
  h4 {
    font-size: 20px;
    font-weight: normal;
    line-height: 80px;
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
  }
}
&:hover {
  .layer {
    display: block;
  }
}
</style>
