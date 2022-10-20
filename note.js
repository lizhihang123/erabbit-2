/*
10-20日：
01.品牌推荐
    目标：品牌小li弹框，要显示“新的内容和布局”，这个内容要从后台发送接口
    1. 设计接口 home-category接口调用拿到数据
    2. brand里面的brandResult存储品牌的数据
    3. 数据渲染
    4. layer左上角的内容靠近左侧
       区分品牌和分类推荐
       品牌的内容太多了 直接把返回的数据 slice一下即可

    (难点)
    4.鼠标经过左侧弹层，显示layer没问题；但是鼠标离开，控制台打印，computed is readonly；原因是？我在mouseleave里面 curCategory = null 设置了这个导致，不能直接去修改计算属性
    (解决)那么如何在鼠标离开左侧menu时，layer也能够消失呢？ -> 直接把 categoryId 变为空即可
    5.curCategory?.curCategory.brandResult?.curCategory.brandResult.length这里使用了 ?.发现会报错 ?. 不能够替换&&

    (难点)
    6.鼠标从menu -> 移动到layer上面，还没移动过去，layer就没了，
      原因：鼠标从menu -> 离开到layer，就触发了 categoryId = null -> 这个赋值不应该在鼠标离开小li的时候触发， 应该写到最大的div上面
    (问题)
    7.鼠标没有经过menu的小li，进入了大的div，就显示了文字，不太靠谱
    此时layer是否已经能够显示了呢？
    (解决)
    给layer弹层添加v-if即可，注意区分到底是分类还是品牌

02.骨架效果
    目标：数据没有来得及加载时，menu部分使用骨架效果
    1. 设置公共组件 暴露宽、高、背景颜色、是否显示“shan”动画
    (疑惑点)
      1.1 class动态和style动态经常搞混 :class={active: categoryId === item.id} :style={width, height}
      1.2 宽度高度，暴露属性，到底数据类型是数字还是字符串？-> 应该是字符串 并且是比如
      width: {
        type: String,
        default: '480px'
      }

    2.注册为全局的公共组件
      export default {
        install(app) {
          app.component(xtxSkeleton.name, xtxSkeleton)
        }
      }
    3.在menu的地方使用这个组件
      注意template模板包裹，v-else 里面的骨架个数 根据情况而定
    (注意点)
    4.结构的设计思考
    先给一个父盒子(宽度 + 高度)
    子盒子(背景颜色 可以自定义)
    伪元素 给父盒子添加，定位依据父元素，(背景颜色 固定的)
03.轮播图
    (轮播图的结构搭建)
    1. 组件搭建 xtx-carousel.vue
    2. 注册全局 library/index.js文件里面使用
    3. home-banner组件使用轮播图组件 -> home/index.vue里面使用banner广告组件
    (问题)
    4. 左侧按钮 让他跑中间一些
    5. 下面的小圆点让它能够居中
    样式穿透使用 :deep(.carousel-indicator)

    (轮播图的逻辑封装)
    1. 轮播图默认显示哪一张图片，需要一个index来控制，然后在遍历的时候，使用动态class
    此外，下面的小按钮，也要控制
    :class={active: i === index}
    上面的默认显示的图片
    :class={fade: i === index}
    2. 自动播放
      2.1 autoPlay传入变量 如果传入了，就能够自动播放
      2.2 设置定时器，清除定时器timer -> 开启定时器 -> value++ 和 判断越界
          slider有数据，就要开始自定播放
          (易错)
          props.duration -》props数据的使用时，记得不要加.value 不然就是错的
      2.3 如果有自动播放，鼠标经过，就停止自动播放，鼠标离开，就开始自动播放
          开始自动播放的逻辑 -> 如果有sliders数据+autoPlay是true 调用autoPlay
          停止自动播放的逻辑 -> 如果有slider就清除定时器
      2.4 (注意) 记得变量名 -> 一定要统一sliders就是sliders 不要一会复数一会正数
      (问题)
      2.5 下面的小圆点在动，但是上面的轮播图没有在动了
      (解决)通过检查结构，类名，可以发现，每个小li都有一个fade类名，说明这个类名就有问题
    3. 点击小圆点能够切换 点击左右按钮能够切换
*/
