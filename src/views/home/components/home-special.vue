<template>
  <HomePanel title="最新专题">
    <template v-slot:right>
      <XtxMore />
    </template>
    <Transition name="fade">
      <div
        class="special-list"
        ref="homeSpecial"
        v-if="goods && good.length"
      >
        <div
          class="special-item"
          v-for="good in goods"
          :key="good.id"
        >
          <RouterLink to="/">
            <img
              :src="good.cover"
              alt
            />
            <div class="meta">
              <p class="title">
                <span class="top ellipsis">{{good.title}}</span>
                <span class="sub ellipsis">{{good.summary}}</span>
              </p>
              <span class="price">&yen;{{good.lowestPrice}}起</span>
            </div>
          </RouterLink>
          <div class="foot">
            <span class="like"><i class="iconfont icon-hart1"></i>{{good.collectNum}}</span>
            <span class="view"><i class="iconfont icon-see"></i>{{good.viewNum}}</span>
            <span class="reply"><i class="iconfont icon-message"></i>{{good.replyNum}}</span>
          </div>
        </div>
      </div>
      <div
        v-else
        class="specialElse"
      >
        <XtxSkeleton
          width="400px"
          height="360px"
        />
        <XtxSkeleton
          width="400px"
          height="360px"
        />
        <XtxSkeleton
          width="400px"
          height="360px"
        />
      </div>
    </Transition>

  </HomePanel>
</template>

<script>
import HomePanel from './home-panel'
import { findSpecial } from '@/api/home'
// import { ref } from 'vue'
import { useLazyData } from '@/hooks'
export default {
  name: 'HomeSpecial',
  components: { HomePanel },
  setup () {
    // const goods = ref([])
    // findSpecial().then(data => {
    //   goods.value = data.result
    //   console.log(goods)
    // })
    const { result: goods, target: homeSpecial } = useLazyData(findSpecial)
    return {
      goods,
      homeSpecial
    }
  }
}
</script>

<style scoped lang='less'>
.home-panel {
  background: #f5f5f5;
}
.special-list {
  height: 380px;
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
  .special-item {
    width: 404px;
    background: #fff;
    .hoverShadow();
    a {
      display: block;
      width: 100%;
      height: 288px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      .meta {
        background-image: linear-gradient(
          to top,
          rgba(0, 0, 0, 0.8),
          transparent 50%
        );
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 288px;
        .title {
          position: absolute;
          bottom: 0px;
          left: 0;
          padding-left: 16px;
          width: 70%;
          height: 70px;
          .top {
            color: #fff;
            font-size: 22px;
            display: block;
          }
          .sub {
            display: block;
            font-size: 19px;
            color: #999;
          }
        }
        .price {
          position: absolute;
          bottom: 25px;
          right: 16px;
          line-height: 1;
          padding: 4px 8px 4px 7px;
          color: @priceColor;
          font-size: 17px;
          background-color: #fff;
          border-radius: 2px;
        }
      }
    }
    .foot {
      height: 72px;
      line-height: 72px;
      padding: 0 20px;
      font-size: 16px;

      i {
        display: inline-block;
        width: 15px;
        height: 14px;
        margin-right: 5px;
        color: #999;
      }
      .like,
      .view {
        float: left;
        margin-right: 25px;
        vertical-align: middle;
      }
      .reply {
        float: right;
        vertical-align: middle;
      }
    }
  }
}
.specialElse {
  .xtx-skeleton ~ .xtx-skeleton {
    margin: 16px auto 0;
  }
}
</style>
