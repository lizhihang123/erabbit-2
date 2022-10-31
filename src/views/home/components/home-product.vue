<template>
  <div class="home-product">
    <HomePanel
      :title="item.name"
      v-for="item in goods"
      :key="item.id"
    >
      <template v-slot:right>
        <div class="sub">
          <RouterLink
            to="/"
            v-for="sub in item.children"
            :key="sub.id"
          >{{sub.name}}</RouterLink>
        </div>
        <XtxMore />
      </template>
      <div class="box">
        <RouterLink
          class="cover"
          to="/"
        >
          <img
            v-lazyload="item.picture"
            alt=""
            class="product_img"
          >
          <strong class="label">
            <span>{{item.name}}馆</span>
            <span>{{item.safeInfo}}</span>
          </strong>
        </RouterLink>
        <ul class="goods-list">
          <li
            v-for="good in item.goods"
            :key="good.id"
          >
            <HomeGoods :good="good" />
          </li>
        </ul>
      </div>
    </HomePanel>
  </div>
</template>

<script>
// 找到布局的问题在哪里？
// 1. 关键点，为何 商品区块的a标签的长度和宽度都是0 为什么.box设置了200px 200px
//    找到错误 通过对当前元素的宽高的检查，然后去检查父级的宽高，一层一层找到问题 就是在less混入里面写了一段.box的200px的代码，导致所有的.box里面都有.box宽度和高度的混入
//    事实上.box本身并没有设置高度 应该由a标签撑开，而里面的图片继承的也是a标签的宽度

// 2. 搞清楚数据结构非常重要，先知道这个地方需要什么数据，然后去返回的数据里面找
//    -> 说明对于 v-for里面再次嵌套一个v-for不是特别的熟悉

// 3. 下面出现绿色边框
//    找到是哪一条样式出现了问题 -> 怎么找到呢？通过注释
//    发现是下面的extra的bg影响到了上面的，修改就好了
import HomePanel from './home-panel'
import HomeGoods from './home-goods'
import { findGoods } from '@/api/home'
import { ref } from 'vue'
export default {
  name: 'HomeProduct',
  components: { HomePanel, HomeGoods },
  setup () {
    const goods = ref([])
    findGoods().then(data => {
      goods.value = data.result
    })
    return {
      goods
    }
  }
}
</script>

<style scoped lang='less'>
.home-product {
  background: #fff;
  height: 2900px;
  .sub {
    margin-bottom: 2px;
    a {
      padding: 2px 12px;
      font-size: 16px;
      border-radius: 4px;
      &:hover {
        background: @xtxColor;
        color: #fff;
      }
      &:last-child {
        margin-right: 80px;
      }
    }
  }
  .box {
    display: flex;
    .cover {
      width: 240px;
      height: 610px;
      margin-right: 10px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      .product_img {
        object-fit: cover;
      }
      .label {
        width: 188px;
        height: 66px;
        display: flex;
        font-size: 18px;
        color: #fff;
        line-height: 66px;
        font-weight: normal;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate3d(0, -50%, 0);
        span {
          text-align: center;
          &:first-child {
            width: 76px;
            background: rgba(0, 0, 0, 0.9);
          }
          &:last-child {
            flex: 1;
            background: rgba(0, 0, 0, 0.7);
          }
        }
      }
    }
    .goods-list {
      width: 990px;
      display: flex;
      flex-wrap: wrap;
      li {
        width: 240px;
        height: 300px;
        margin-right: 10px;
        margin-bottom: 10px;
        &:nth-last-child(-n + 4) {
          margin-bottom: 0;
        }
        &:nth-child(4n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
