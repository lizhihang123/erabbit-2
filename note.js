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
    (问题)
      3.1 点击右边按钮，变成白屏，
      if的判断条件必须是>= slider.length - 1而不仅仅是大于slider.length
      另外一边 <= 0而不仅仅是< 0
      记得return 不然还是错的
      3.2 (未解决)如果刷新了页面，鼠标正好在轮播图里面，它就没有停止自动播放
          判断鼠标是否在选中的区域，如果在的话，就不自动播放
          (未解决)想在组件dom挂载的时候，就去监听enter事件，但是这个也必须要鼠标稍微移动一下，才行，鼠标在dom里面，通过Carousel.value.contains(e.target) 来判断，true就stop，false就start；| 但是这样效果很差，后续的鼠标经过和离开都失效了
      3.3 (未解决)轮播图的点击按钮 滑动的速度太快了
          点击按钮 -> 调用 toggle函数 -> 切换轮播图
          点击按钮 -> 调用 节流函数(里面传入toggle函数) -> 希望toggle函数的执行能够慢一些 (失败)
          throttle(fn, 1000)这样失败 throttle(fn(), 1000)这样能够成功，但是延时并没有成功

          (解决1) 每次返回的都是一个新的函数，所以应该把函数单独抽离，每次返回的是一个相同的函数
          (问题)  传参问题，参数要传递给toggle函数，不能直接在 throttle(fn(10), 1000)而是应该 throttle(fn, 1000, 1) 这样去传递
          (问题2) 轮播图的仍然是切换很快 到底是timer变量的问题，还是函数的问题
              function throttle (func, delay, num) {
              // timer变量在外面声明
              let timer
              return throttleSon(func, delay, timer, num) // 直接这样写 函数直接调用了 应该用bind修改
          (this指向谁呢？)不用考虑this的问题
          (发现 bind返回的是一个函数，根本没有去调用 throttleSon这个函数)
    }
04.面板封装
目标：提取首页的公共面板，以后能够复用
      1.封装了“more”更多组件
      2.封装了面板组件
      3.创建home-new组件 使用HomePanel组件
        传入title和subTitle两个内容
        传入右侧插槽是 XtxMore
        下面的内容是整个的插槽
        RouterLink的to属性 必须有值不然就会报错，如果报这个错 检查所有的RouterLink是否有问题
      4.panel的head部分布局不对劲
        (解决)检查布局不对劲的元素 然后 text-align: left;
      5.补充知识点
        (插槽-具名插槽)
        vue3插槽用法
        插槽的入口 <template v-slot:age></template>简写 <template #age></template>
        插槽的出口 <slog name="age"></slog>
        在vue2.6之后屏蔽了slot-scope={子组件传来的变量名}的写法，引入了v-slot的写法，需要作用域插槽 直接 v-slot={}
05. 人气推荐
      1.和新鲜好物几乎是一样的推荐
      2.goods和goods.length的使用是有区别的，没有数据 goods.length就是0，用来给v-if判断更好一些

06. 面板添加骨架屏
07. 组件数据的懒加载
      概念不清晰：第一个想到的是路由懒加载 正确的是，页面滚动到指定位置时，才去加载数据。路由懒加载是，切换到对应的路由页面，才去加载数据。
      1. 使用useInterSectionObserve，监听是否滚动到指定页面，
      2. 滚动到指定页面时，才去调用接口 + 拿到数据
      3. src/hooks/index.js 传入“接口函数”
      4. 人气推荐使用骨架屏+组件数据懒加载
08. 品牌模块
      右侧有一个切换按钮，如何去处理这个切换按钮?总共有10个图片，如何进行显示和处理呢
      1. 品牌模块 数据渲染 + 数据懒加载 + 骨架屏和前面都是类似的，只有细微的调整
      2. 如何实现点击按钮，无缝切换呢？
         点击按钮，调用toggle函数，传入的参数是1或者-1
         然后需要newValue变量来进行判断，如果>1如果<1，进行不同的操作，(这个是一个很熟悉的操作，为什么要这样干呢？为什么不直接去修改原始的数据呢？直接修改原始的数据不好)
         同时如何切换是重点，:style="{transform: `translateX(${-index * 1240}px)`}"
         反引号写在哪里，然后${}是给-index * 1240同时进行添加
09. 商品区块
     1. (问题) HomeProduct里面有HomeGoods这样的结构 为何会出现布局重叠的情况
     2. (头部渲染) OK
     3. 左侧的a标签和右侧的list的渲染出现问题，list挡住了a
     (解决问题的思路不对劲)
     3.1 应该先去检查样式 结构
     3.2 再去看答案 视频
     结果 检查了样式 发现是答案是差不多的结构和样式

10. (问题)最新模块
      1. 骨架屏一直不消失，
         思路：数据请求不到？
               结构出现问题？

*/
