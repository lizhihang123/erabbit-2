<template>
  <div class="top-category">
    <div class="container">
      <!-- 1. 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <Transition
          name="fade-right"
          mode="out-in"
        >
          <!--
          记录问题：
          (刷新页面时)当前页面的面包屑并没有能够及时的响应出现空白，原因是,面包屑的数据来自topCategory，而topCategory的数据来自vuex里面的数据，是发请求去后端拿的所以有延迟。
          (希望通过Transition解决)但是仍旧没有能够解决,没能够解决的愿意是，topCategory给了一个{},那么无论如何都是有值的
         -->

          <!--
          记录问题：
          (点击二级类目时)有时会出现点击，发请求，报错; 说明点击二级类目时，不应该去发送一级类目的请求：
            1. 找到一级类目点击发请求的位置
            2. 修改逻辑 检查是否判断条件有错误

          -->
          <template v-if="topCategory.name">
            <XtxBreadItem :key="topCategory.id">{{topCategory && topCategory.name}}</XtxBreadItem>
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
      <!-- 2. 轮播图 -->
      <XtxCarousel
        :sliders="sliders"
        style="height:500px"
      />
      <!-- 所有二级分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li
            v-for="item in topCategory.children"
            :key="item.id"
          >
            <a href="javascript:;">
              <img :src="item.picture">
              <p>{{item.name}}</p>
            </a>
          </li>
        </ul>
      </div>
      <!-- 分类关联商品 -->
      <div
        class="ref-goods"
        v-for="item in result"
        :key="item.id"
      >
        <div class="head">
          <h3>- {{item.name}} -</h3>
          <p class="tag">{{item.desc}}</p>
          <XtxMore :path="`/category/sub/${item.id}`" />
        </div>
        <div class="body">
          <GoodsItem
            v-for="good in item.goods"
            :key="good.id"
            :good="good"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { findBanner } from '@/api/home'
import { findTopCategory } from '@/api/category'
import { ref, computed, watch } from 'vue'
import GoodsItem from './components/goods-item.vue'
export default {
  name: 'TopCategory',
  components: {
    GoodsItem
  },
  setup () {
    // 轮播图
    const sliders = ref([])
    findBanner().then(data => {
      sliders.value = data.result
    })
    //
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    // 1. 全部分类(一定知道我要做成什么样的 数据结构是什么)
    // 2. 各自的子分类
    // 3. 标题的表述
    const topCategory = computed(() => {
      // 声明一个空对象 防止store里面没有值是undefined
      let item = {}
      const cate = store.state.category.list.find(item => {
        return item.id === route.params.id
      })
      if (cate) item = cate
      return item
    })
    const result = ref([]) // 使用const而不是let
    // 点击二级分类  + watch 发送接口
    const getList = () => {
      findTopCategory(route.params.id).then(data => {
        result.value = data.result.children
        console.log('要测试的数据', result)
      })
    }
    console.log('我是route', route)
    console.log('我是router', router)
    watch(() => route.params.id, (newVal) => {
      if (newVal && (`/category/${newVal}` === route.path)) {
        newVal && getList(route.params.id)
      }
    }, {
      immediate: true
    })
    console.log(topCategory)
    return { sliders, topCategory, result }
  }
}
</script>
<style scoped lang="less">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
}
.ref-goods {
  background-color: #fff;
  margin-top: 20px;
  position: relative;
  .head {
    .xtx-more {
      position: absolute;
      top: 20px;
      right: 20px;
    }
    .tag {
      text-align: center;
      color: #999;
      font-size: 20px;
      position: relative;
      top: -20px;
    }
  }
  .body {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 65px 30px;
  }
}
</style>
