<template>
  <ul class="app-header-nav">
    <li class="home">
      <RouterLink to="/">首页</RouterLink>
    </li>
    <li
      v-for="item in list"
      :key="item.id"
      @mousemove="show(item)"
      @mouseleave="hide(item)"
    >
      <!-- <a href="#">{{item.name}}</a> -->
      <router-link
        :to="`/category/${item.id}`"
        @click="hide(item)"
      >
        {{item.name}}
      </router-link>
      <div
        class="layer"
        :class="{open: item.open}"
      >
        <ul>
          <li
            v-for="child in item.children"
            :key="child.id"
          >
            <router-link
              :to="`/category/sub/${child.id}`"
              @click="hide(item)"
            >
              <img
                :src="child.picture"
                alt=""
              >
              <p>{{child.name}}</p>
            </router-link>
          </li>
        </ul>
      </div>
    </li>
    <!-- <li><a href="#">餐厨</a></li>
    <li><a href="#">艺术</a></li>
    <li><a href="#">电器</a></li>
    <li><a href="#">居家</a></li>
    <li><a href="#">洗护</a></li>
    <li><a href="#">孕婴</a></li>
    <li><a href="#">服装</a></li>
    <li><a href="#">杂货</a></li> -->
  </ul>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'AppHeaderNav',
  setup () {
    const store = useStore()
    // 大分类的数据
    const list = computed(() => {
      return store.state.category.list
    })
    // 点击一级分类和二级分类，都要 要求弹框能够隐藏
    const CategoryShow = ref(false)
    // 展示二级分类
    const show = (item) => {
      store.commit('category/show', item)
    }
    // 隐藏二级分类
    const hide = (item) => {
      store.commit('category/hide', item)
    }
    return {
      list,
      CategoryShow,
      show,
      hide
    }
  }
}
</script>

<style scoped lang='less'>
.app-header-nav {
  width: 820px;
  display: flex;
  padding-left: 40px;
  position: relative;
  z-index: 998;
  > li {
    margin-right: 40px;
    width: 38px;
    text-align: center;
    > a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;
    }
    &:hover {
      > a {
        color: @xtxColor;
        border-bottom: 1px solid @xtxColor;
      }
      // > .layer {
      //   height: 132px;
      //   opacity: 1;
      // }
    }
  }
}
.layer {
  &.open {
    // display: block;
    height: 132px;
    opacity: 1;
    z-index: 9999;
  }
  width: 1240px;
  background-color: #fff;
  position: absolute;
  left: -200px;
  top: 56px;
  height: 0;
  overflow: hidden;
  opacity: 0;
  box-shadow: 0 0 5px #ccc;
  transition: all 0.2s 0.1s;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 70px;
    align-items: center;
    height: 132px;
    li {
      width: 110px;
      text-align: center;
      img {
        width: 60px;
        height: 60px;
      }
      p {
        padding-top: 10px;
      }
      &:hover {
        p {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>
