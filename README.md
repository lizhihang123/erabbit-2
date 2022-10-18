线上项目的笔记：http://erabbit.itheima.net/#/
yarn install
yarn serve 就可以启动
10-15 日，完成了头部导航栏的渲染

# 1. 项目介绍：

小兔鲜 是一个电商项目

有哪些板块

```
目标功能：

首页模块：顶部通栏，吸顶导航，网站头部，左侧分类，轮播图，新鲜好物，人气推荐，热门品牌，分类商品推荐，专题推荐，网站底部。
一级分类：面包屑，轮播图，全部二级分类，二级分类推荐商品。
二级分类：筛选区域，排序功能，商品列表，无限加载。
商品详情：商品图片展示，基本信息展示，配送城市选择，SKU选择，库存选择，商品详情展示，商品评价展示，24小时热销，相关专题，加入购物车。
购物车
头部购物车：展示商品数量和列表，删除商品，跳转购物车页面。
购物车页面：购物车商品展示，选择商品，修改数量，修改商品规格，价格计算，跳转下单
登录模块：表单校验，账户密码登录，手机号登录，第三方登录，绑定手机，完善信息
填写订单：订单商品展示，收货地址选择，收货地址修改，支付方式选择，生成订单。
进行支付：订单信息展示，跳转支付网关，提示正在支付，等待支付结果，跳转支付成功页面。
个人中心
中心首页：展示个人信息，近期收藏商品，近期足迹，猜你喜欢
订单管理：全部订单，待付款，待发货，待收货，待评价，已完成，已取消。立即付款，取消订单，确认收货，删除订单，查看物流。
订单详情：订单状态，订单进度，详细信息。
总结：完成电商支付闭环。


```

# 2. 配套资源

有设计图 在摹客上面的 有尺寸 可以下载切图

有原型稿 在摹客

有接口文档 YAPI

且 vue2 和 vue3 的版本都有

# 3. 使用了哪些技术

```
vue3.0 (使用组合api的方式来开发)
vue-cli (项目脚手架)
axios (请求接口)
vue-router (单页路由)
vuex (状态管理)
vuex-persistedstate (vuex数据持久化)
normalize.css (初始化样式)
@vueuse/core (组合api常用工具库)
算法 Power Set(opens new window)
dayjs (日期处理)
vee-validate （表单校验）
```

封装了哪些组件

```
轮播图组件
面包屑组件 render+createVnode
查看更多组件
骨架屏组件
复选框组件
单选框组件
对话框组件
消息提示组件 函数调用
消息确认组件 函数调用
分页组件
步骤条组件
时间线组件
标签页组件 render + jsx
城市选择组件
```

# 4. 注意点：

1.后台接口基本没问题，有时自己 mock 数据

2.vuex 使用很多很多

3.vue3.0 会有 bug，但是会慢慢过渡

4.重难点: 第三方登录，商品详情，购物车，支付结算，订单管理

5.大量封装自己的组件

# 5. 初始化项目

下载全局包

```js
npm install --global @vue/cli
vue create erabbit-pc-vue-project
```

# 6. 目录调整

删除无用的组件 logo 路由

**==读懂代码:==**

1.vue3 的 router 怎么写

```
// vue2 new VueRouter({})
// vue3 createRouter({})
```

2.vue3 的 store 怎么写

```
// vue2.0 new Vuex.Store({})
// vue3.0 createStore({})
```

3.根组件

```
vue3.0 可以有多个根组件
```

**==读懂一些配置文件==**

.browserslistrc

```
> 1%
last 2 versions
not dead
```

市场份额大于 1%

最后两个版本

不是死的浏览器

.editorconfig

```
[*.{js,jsx,ts,tsx,vue}]
indent_style = space
indent_size = 2
trim_trailing_whitespace = true
insert_final_newline = true
```

给编辑器读的，比如 vscode webstorm

.eslintrc.js

eslintrc 的校验语法

.gitignore

忽略文件，哪些文件不被放进 git 仓库

增加目录文件

jsconfig.json =》 为了输入@符号 自动出现新的路径

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "exclude": ["node_modules", "dist"]
}
```

.eslintignore

eslint 忽略校验文件

```js
/dist
/src/vender
```

# 7. vuex 的补充使用

```diff
总结:

1. new 一个 store方法
从 vuex里 引入useStore: import { useStore } from 'vuex'
+ 创建一个store实例对象 导出即可: const store = useStore()
要挂载到App 实例上: createApp(App).use(store).use(router).mount('#app')

2. 不考虑命名空间的情况下
template模板里面使用:
$store.state.userName
$store.getters.getUserName
@click="$store.commit('updateUserName', 'xiaohang')"
@click="$store.dispatch('updateUserName')"
也可以在setup函数里面使用
const updateUserName = () => {
  store.commit('updateUserName', '123')
  store.dispatch('updateUserName', 'wangwu')
}

3. 考虑命令空间时 模块化
3.1 不开启
+ state需要加模块名访问: {{$store.state.a.username}}
+ 其它 getters mutations actions 都不需要加模块名就能够访问

开启   namespaced: true, => 写在每个模块里面
3.2 要加模块名
+ getters $store.getters['b/changeNameB']
$store.commit('b/changeB', '123')
$store.dispatch('b/updateB')
在setup函数里面 store.dispatch('b/updateB', 'lisi')

+ 注意 这里调用模块时 只能用dispatch('b/updateB') 这样, 如果通过 b.dispatch.updateB这样就会报错。getters必须是$store.getters['b/changeNameB'] 这样的形式

3.3 模块化是什么 是一个个文件
为什么要模块化 为了不同类型的数据 分类处理 好管理。能够减少命名冲突，能够更加清晰
```

其它补充:

```diff
1. store/index.js里面配置好了，挂载到main.js里面后，可以直接在组件里面 $store.state.userName 这样使用
2. vue3的setup函数 替换了vue2的beforeCreate和created
3. getters是vuex的计算属性 也会有缓存 里面写函数 return值
4. 计算属性和watch有什么本质的区别?
5. 如果无ajax请求，可以无需经过dispatch，直接通过commit调用函数，那幅图不完整
6. actions里面的函数形参 context包含了state,commit,getters等成员
```

# 8. vuex 具体是怎么使用的

目标

- user 用户信息 存储本地
- cart 购物车信息 存储本地
- catagory 分类信息 无需存储到本地

使用

```js
创建

store / modules / cart.js

store / modules / user.js

store / modules / catagory.js
```

分别导出对象，注意开启命名空间时，建议 state 使用函数的形式返回值

**使用插件 vuex-persistedstate**

配置方法

```
export default createStore({
  modules: {
    user,
    cart,
    category
  },
+  plugins: [
+    createPersistedstate({
+      key: 'erabbit-client-pc-store', // 本地存储键名
+      paths: ['user', 'cart'] // 模块下具体的数据 如果改具体的值存储到本地 => user.name 单独存储到本地 单独持久化
+    })
+  ]
})
```

测试：在 App.vue 里面测试，一个按钮，点击，改变 store 里面的值，再查看本地存储

**-D 和-S 的区别是什么：**

1.-D 的文件放在 devDependencies 里面 （--save-dev）

-S 的文件放在 dependencies 里面 （--save 的简写）

2. dependencied -S 里面适合的开发和生产环境都需要的包。Vue Vue-Router Vant

   devDependencies -D 只适合开发环境，而生产环境不需要的包。babel loader webpack 的插件等

`**注意点**`

1.模块内部的文件不需要使用 createStore 啦，index.js 里面写了就好

2.如果有模块，namespaced 要写在模块的里面。之前犯错，nameSpaced:true, 拼的是错的

# 9. axios 的封装

下包，创建实例

配置**baseURL**, 为什么要配置**baseURL**

```js
import axios from 'axios'
import store from '@/store'
import router from '@/router'

// 导出基地址
export const baseURL = 'http://apipc-xiaotuxian-front-devtest.itheima.net/'

// axios的基本配置
const instance = axios.create({
  baseURL,
  timeout: 5000
})
```

为什么要配置 token 到请求拦截器?

​ 因为这样每次请求 附带 token 比较省力。附带 token 时，先判断有无 token

token 从哪里来？

​ 从用户的数据中来 profile.token

**拦截请求的业务逻辑**

```js
instance.interceptors.request.use(
  (config) => {
    const { profile } = store.state.user
    // 有profile就携带
    if (profile.token) {
      config.headers.Authorization = `Bearer ${profile.token}`
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)
```

---

**拦截响应的业务逻辑**

```vue
路由跳转 1. fullPath？ 是什么 一段完整的url 2. 组件内如何获取 当前的路由
$router.path 3. 但是$router.path会忽略 参数 /user?a=10 只能拿到 /user
$router.fullPath 能够拿到完整的 4. 但是不在组件里面怎么办 在js文件里面
router.currentRoute.fullPath 注意 router.currentRoute 相当于 $router 5. 还不够
因为vue3获取到的router.currentRoute是响应式数据
router.currentRoute.value.fullPath 6. 还不够 因为可能携带参数 /user?a=10&b=10
/user?a=10&b=10里面有等号 被地址栏解析会出错 忽略b=10 要使用 encodeURIComponent
```

```js
// 拦截响应的业务逻辑
instance.interceptors.response.use(
  (res) => res.data,
  (err) => {
    if (err.response && err.response.status === 401) {
      // 清空无效的用户数据
      store.commit('user/setUser', {})
      // 获取当前页面的完整路径
      // 组件里面可以使用$router.path 但是 '/user?a=10' a=10会被忽略 要用 $router.fullPath
      // js文件里面 引入router文件夹里面的index.js文件即可
      // router.currentRoute相当于 $router.fullPath 但是这是响应式数据 所以还要.value.fullPath
      // encodeURIComponent能够防止解析 = 号解析错误
      const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
      // 跳转到登录页面
      router.push('/login/redirect' + fullPath)
    }
    return Promise.reject(err)
  }
)
```

！JS 的对象的属性，[]里面可以写表达式，这样写的是动态的键

![image-20221007125440705](https://typora-1309613071.cos.ap-shanghai.myqcloud.com/typora/image-20221007125440705.png)

```js
// 请求工具函数
export default (url, method, submitData) => {
  return instance({
    url,
    method,
    // 设置动态的key get就用params传参
    // post就用data传参
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}
```

# 10. 请求工具的封装

**核心思路：**

1.利用 axois 创建的实例 传入配置项 method get 数据

2.难点 如果说传入的是 get 就用 params 传参，其他的都是 data 传参

**如何区分 get 和 post 传参?**

利用动态的 key 进行

> [method.tolowercase() === 'get' ? 'params' : 'data']: submitData
>
> 这句代码是难点
>
> const obj = {name: 123, age: 19}
>
> ​ obj.name 和 obj.age obj[name] 都可以访问
>
> 里面还可以传递变量和表达式
>
> ​ const key = name
>
> ​ obj[key]可以访问到
>
> ​ obj[10 > 9 ? ‘name’: ‘age’] 都可以访问到

```js
export default (url, method, submitData) => {
  return instance({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}
```

测试的方法

写一个按钮和方法，报错没关系

```vue
App
<button @click="fn">点击发送请求</button>
```

```js
  setup() {
    const fn = () => {
      request('/haha', 'get', { a: 10 })
    }
    return { fn }
  }
```

测什么?

测请求拦截器

​ 是否有 token

​ 响应拦截器如果返回的是 err，能否重定向，默认的是 get 方法

# ==难点汇集==

1. 响应拦截器 获取路由

   这里涉及了获取当前路由的方法

   如何进行解码 =》涉及到了浏览器地址栏 解码参数的问题

   涉及到了 vue3 响应式数据 必须.value 的问题

2. 如果调用方法 请求工具的封装

   因为传入的方法既可能是 get 也可能是 post 因此必须进行区分，可是对象里面无法写 if 和 else 所以要用对象的动态 key

   可是涉及到了另外一个问题，就是对象不同于 map 对象，前者对象只能是字符，后者可以是任何的数据类型，那么[]里面写表达式的写法到底是什么呢

# 11. 路由设计

1.存在一级 二级 三级路由

页面整个发生改变 就是设置一级路由

```js
// 1. 引入内容
import { createRouter, createWebHashHistory } from 'vue-router'

// 2. 路由具体配置
const layout = () => import('@/views/layout.vue')
const home = () => import('@/views/home/index.vue')
const routes = [
  {
    path: '/',
    component: layout,
    children: [
      {
        path: '/',
        component: home
      }
    ]
  }
]

// vue2 new Router({})
// vue3 createRouter({})
// 3. 创建路由实例 路由配置内容放入
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 4. 导出 在main.js里面进行具体挂载
export default router
```

<img src="https://typora-1309613071.cos.ap-shanghai.myqcloud.com/typora/image-20221007131851888.png" alt="image-20221007131851888" style="zoom:50%;" />

# 12. less 使用

## **混入基本语法**

```js
// less 有哪些语法?
// 1. 变量
// 2. 嵌套
// 3. 函数 混入 - 复用
//    3.1 既可以是直接类的混入
//    3.2 也可以是函数方式的混入 类后面要加括号 同时可以传递变量
```

**解析两次的 less 复用**

```less
// .box1 {
//     width: 100px;
//     height: 100px;
// }

// .box2 {
//     .box1();
// }

//   下面这样写 对比上面的写法 是更好的
//   因为函数不会被css解析 下面的代码 .box1()里面的属性只被解析了一次
//   而上面的写法 .box1本身也会被解析一次
```

**解析一次的 less 复用**

```less
.box1() {
  // 函数写法 不会被lese解析
  width: 100px;
  height: 100px;
}

.box2 {
  .box1();
}
```

**传递变量**

```js
// 也可以和下面这样传递变量
.box1(@width) {
    width: @width;
    height: @width;
}

.box2() {
    .box1(200px);
}
```

**鼠标经过上移阴影动画**

```js
// 鼠标经过上移阴影动画
.hoverShadow () {
  transition: all .5s;
  &:hover {
    transform: translate3d(0,-3px,0);
    box-shadow: 0 3px 8px rgba(0,0,0,0.2);
  }
}
```

上面是鼠标经过添加的阴影动画

> less 语法出错的可能性:
>
> 1.  import 导入 前面没有加@负号 也就是 @import ‘’
> 2.  注意,@import ''引号里面**不能使用@**，不会被识别
> 3.  less 语法必须结尾有分号
> 4.  import 导入的路径 出错了也会报错

关于模块化的小结:

```diff
+ ES6导入导出如果要设置，就去package.json文件里面添加子节点 “type”: “modules” 就可以使用import 和 export default的导入导出方法了

如果没有添加 就是使用的ES5的，CommonJS的导入导出 require 和 module.exports = {}

// 1. 用的是node的path模块
// 2. 为何这里用require导入呢?
+ //    老的方法导入 const path = require('path')
+ //    导出就是 modules.export = {}
+ //    新的方法导入是 import path from 'path'
+ //    导出就是 export default {}
// 3. path.join方法是什么
//    进行拼接
//    不是join方法时会把./也拼上去 不是我们想要的: fs.readFile(__dirname + './files/2.txt', 'utf8', function (err, dataStr) {
//    join方法拼接值 会忽略一个点的 ./

+ // 4. __dirname是什么呢?
//    当前文件的根目录
// import path from 'path'
// export default {

const path = require('path')
module.exports = {
  pluginOptions: {
```

## 关于全局的 css 的混入

```diff
// 1. 为何要全局混入less文件
//    因为每个组件里面要使用混入的css 都要导入 太麻烦了
// 2. 如何全局混入
//    1. 安装插件 注意是安装vue/cli的插件 因此用vue命令
+ //       vue add style-resources-loader
+ //    2. 安装后呢? 自动生成 vue.config.js文件 配置Patterns数组配置项
//    3. 如何配置?
//       用到node的 path模块
//       __dirname能够获取 当前的根路径
```

```diff
const path = require('path')
module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
+        path.join(__dirname, './src/assets/styles/variables.less'),
+       path.join(__dirname, './src/assets/styles/mixin.less')
      ]
    }
  }
}
```

patterns 里面可以配置很多个路径，表示可以混入多个 less 文件里面的代码

这里用 path.join 结合 \_\_dirname 拼接 ，第二个参数用绝对路径 => **带盘符** 而 dirname 是带盘符的。使用了 dirname，就是要拼成**绝对路径**

相对路径是直接./ ../ .../

**相对路径和绝对路径的区别**

1.绝对路径是，文件在硬盘上真正存储的路径

2.相对路径是，相对于自己的目标文件的路径

```js
C:\ABC\file1\A.TXT
C:\ABC\file2\B.TXT
如何找到B.TXT文件的位置呢？
1.一个是直接通过绝对路径
2.一个是从A出发 ../file2/B.TXT 这个是相对路径

一个.是绝对路径还是相对路径?
相对路径
```

相对路径的平级：

index.html 要使用平级的图片

```js
<img src="image.png" />
```

下一级

```js
<img src="images/image.png" />
```

上一级

```js
<img src="../images/1.png" />
```

path.join 里面是什么路径？可以拼成绝对路径，要配合 dirname

path.resolve 能够直接找到绝对路径

# 13. 导入公共样式和格式化的样式

安装包

```diff
yarn add normalize.css
```

```diff
import 'normalize.css'
import './assets/styles/common.less'
```

**common.less 文件**

```css
// 重置样式
* {
  box-sizing: border-box;
}

html {
  height: 100%;
  font-size: 14px;
}
body {
  height: 100%;
  color: #333;
  min-width: 1240px;
  font: 1em/1.4 'Microsoft Yahei', 'PingFang SC', 'Avenir', 'Segoe UI', 'Hiragino Sans GB',
    'STHeiti', 'Microsoft Sans Serif', 'WenQuanYi Micro Hei', sans-serif;
}

ul,
h1,
h3,
h4,
p,
dl,
dd {
  padding: 0;
  margin: 0;
}

a {
  text-decoration: none;
  color: #333;
  outline: none;
}

i {
  font-style: normal;
}

input[type='text'],
input[type='search'],
input[type='password'],
input[type='checkbox'] {
  padding: 0;
  outline: none;
  border: none;
  -webkit-appearance: none;
  &::placeholder {
    color: #ccc;
  }
}

img {
  max-width: 100%;
  max-height: 100%;
  vertical-align: middle;
}

ul {
  list-style: none;
}

#app {
  background: #f5f5f5;
  user-select: none;
}

.container {
  width: 1240px;
  margin: 0 auto;
  position: relative;
}

.ellipsis {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.ellipsis-2 {
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.fl {
  float: left;
}

.fr {
  float: right;
}

.clearfix:after {
  content: '.';
  display: block;
  visibility: hidden;
  height: 0;
  line-height: 0;
  clear: both;
}
```

# 14. 首页

## **14.1 组件 1: app-topnav**

1.先引入字体图片文件。这个文件存储到了`index.html`文件里面

> <link rel="stylesheet" href="//at.alicdn.com/t/font_2143783_iq6z4ey5vu.css">

2.在创建 app-topnav 组件 复制组件代码 使用

```diff
+     ~ li {
        a {
          border-left: 2px solid #666;
        }
      }
```

~ li 的意思是，除了第一个小 li 后续的其它小 li 都添加这个属性，是所有后面的兄弟节点

**出现问题：**

1.高度特别的高 咋整

<img src="https://typora-1309613071.cos.ap-shanghai.myqcloud.com/typora/image-20221014190121480.png" alt="image-20221014190121480" style="zoom:50%;" />

直接写一个 padding: 0;进行覆盖就好了

但是这里的样式一定是有问题的，因为 nav 的字体特别的粗 发现了没

3.区分登录和未登录的两种状态，下面利用 vuex 里面 user 模块的 profile.token 进行区分

```diff
+        <template v-if="$store.state.user.profile.token">
            <li><a href="javascript:;"><i class="iconfont icon-user"></i>周杰伦</a> </li>
            <li><a href="javascript:;">退出登录</a>
            </li>
        </template>
        <template v-else>
            <li><a href="javascript:;">请先登录</a></li>
            <li><a href="javascript:;">免费注册</a></li>
        </template>
```

测试按钮

```js
      <button @click="$store.commit('user/setUser', {})">退出登录</button>
      <button @click="$store.commit('user/setUser', {a: 10, token: '123'})">点击登录登录</button>
```

用计算属性的写法

```diff
  setup() {
    const store = useStore()
    const profile = computed(() => {
+      return store.state.user.profile
    })
    return { profile }
  }
```

```diff
+        <template v-if="profile.token">
            <li><a href="javascript:;"><i class="iconfont icon-user"></i>周杰伦</a> </li>
            <li><a href="javascript:;">退出登录</a>
            </li>
        </template>
```

## **14.2 组件 2: app-header**

布局是 logo 导航栏 搜索框 购物车图标这样

Vetur 和 Volar 都是干嘛用的？

**logo 的布局注意**

h1 里面放 a 标签，a 标签设置背景图片

```html
<h1 class="logo">
  <RouterLink to="/">
    <!-- 这个小兔鲜文字设置了 text-indent: -9999; -->小兔鲜
  </RouterLink>
</h1>
```

```css
.logo {
  width: 200px;

  a {
    display: block;
    height: 132px;
    width: 100%;
    text-indent: -9999px;
    background: url(../assets/images/logo.png) no-repeat center 18px / contain;
  }
}
```

**购物车的布局注意**

```html
<div class="search">
  <i class="iconfont icon-search"></i>
  <input type="text" placeholder="搜一搜" />
</div>
```

**搜索 search 框的布局注意**

em 是那个小图标

i 是购物车图标

```html
<div class="cart">
  <a class="curr" href="#"> <i class="iconfont icon-cart"></i><em>2</em> </a>
</div>
```

## **14.3 组件 3： app-footer**

布局是底部，这个地方的布局很难，有空建议写一下

## **14.4 组件 4: app-header-nav**

1.单独封装 header 的导航栏为一个组件

2.点击美食时，要显示如下内容，因此要添加一个 layer 层

![image-20221015102739562](https://typora-1309613071.cos.ap-shanghai.myqcloud.com/typora/image-20221015102739562.png)

3.使用了 **>这个选择器**

```css
>选择器 子代 最近一级的子儿子
```

### **14.4.1 头部分类导航渲染**

`需求：头部分类导航的数据，用写死的数据。为什么? `

因为如果从后台获取，获取速度慢了，出现白屏，因此，和后台约定，这个 9 个大分类的数据不变化，先写死。这样写的好处是，减少白屏的可能性

![image-20221015154057218](https://typora-1309613071.cos.ap-shanghai.myqcloud.com/typora/image-20221015154057218.png)

**接口问题**,如果报错，axios Error，要么是 utils/request.js 里面的文件内容写错，要么就是下面

**就是请求的接口有问题**

```js
export const baseURL = 'http://apipc-xiaotuxian-front.itheima.net/'
export const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'
```

### **14.4.2 头部分类跳转问题**

`问题: 点击头部分类 一级和二级发生路由跳转时，二级分类的弹框是否会消失。我们希望他消失`不会消失

1. 易错点: 鼠标经过和离开 给 li 加 和给 router-link 添加是完全不一样的效果。给 li 加是正确的，给 router-link 添加是，鼠标没发移动到二级类目，就出错了。

2. to 属性加冒号 这里写法很容易出错

3. 先是双引号
4. 然后是``。
5. 注意，里面可以加{{item.name}}
6. router-link 里面是可以进行模板编译的

```vue
<!-- <a href="#">{{item.name}}</a> -->
<router-link :to="`/category/${item.id}`" @click="hide(item)">
    {{item.name}}
  </router-link>
```

3. 鼠标离开一级类目，想要去点二级类目时，弹层立马就消失了，根本点击不到二级类目。

把 v-if 改成了动态 class 的形式就能够解决。

4. 鼠标点击，一级类目或者二级类目时，弹框没有立马消除。

解决方式：

- 不能让 hover 来控制，`鼠标经过` 鼠标离开 鼠标点击 三种情况。必须要用 click+mouseenter+mouseleave 来解决
- less 语法 `&.open`{} 是交集选择器，两个选择器是同级的，不是后代也不是子代选择器。

```less
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
```

用 block 属性值来控制是有问题的。应该用 opacity 属性值来控制

```less
.layer {
  &.open {
    // display: block;
    height: 132px;
    opacity: 1;
    z-index: 9999;
  }
```

5.首次进入会有一个白屏的情况

使用 loading 来解决

**小结：头部分类导航有很多难点。**

功能点：

- 鼠标经过一级导航，显示二级类目；离开一级导航，二级类目关闭(通过 mouseenter+mouseleave)

- 鼠标点击一级导航，二级类目关闭(通过 click 事件来实现)
- 鼠标点击二级导航，二级类目要关闭(click 事件)

使用了 RouterLink 组件的跳转功能。

使用了交集选择器和动态 class 来实现

### **14.4.3 头部分类吸顶设置**

`需求: 页面往下滚动，超过78，此时头部的nav已经不见了。出现了一个吸顶的nav`

```js
目标: 页面滚动到下面位置时 超过78 会有一个吸顶【固定定位为78】的组件

实现：
1. 创建组件 复制代码
注意组件逻辑
`app-header-sticky组件`创建 里面引入 app-header-nav
app-header组件里面引入 app-header-sticky

2. 添加样式给app-header-sticky
  transform: translateY(-100%);
  opacity: 0;
不显示 透明度为0

3. 添加两行代码
```

```diff
+    <div class="app-header-sticky" :class="{show: y >= 78}">
+    <div class="container" v-show="y >= 78">
```

第一个动态样式 表示 y >=78 时，才增加 show 类

第二个表示为了，不显示.container 组件 这个 sticky 组件，当 y <78 时，上面的 sticky 不显示，鼠标移开下面的 nav，它能够消失。不会因为移到上面，因为公用 header-nav 组件，都有 mouseenter 事件，而不会消失

### **14.4.4 vueuse/core 包的使用**

`需求: 使用vueuse/core包，进行滚动距离的监测，不是原生方法`

```bash
npm i @vueuse/core@4.9.0
```

```vue
import { useWindowScroll } from '@vueuse/core' setup () { const { y } =
useWindowScroll() return { y } }
```

@vueuse/core@4.9.0 这个里面有很多工具和方法

这个笔记里面不粘贴大段的代码，讲逻辑为主。配合小兔鲜的线上笔记。

## 14.5 左侧菜单布局

`需求：左侧菜单的数据是动态的显示，而不是静态的。同时左侧有10个菜单，每个菜单有子菜单`

1.注意 Router-link 标签，设置样式时，写的是 a 标签，而不是 Router-link{}

2.这里布局的思路是:

- 上面的 nav 有九个数据 但是下面的左侧菜单要求 10 个，所以要拼接一个

  因此有声明一个品牌，然后 push 进入数组的操作

  而数组 list 的数据 从 vuex 里面取出来，list 的每个数据都要改写一下，children 很多但是之遥啊前两个，`slice(0, 2)`

- 最终的 list 用的是计算属性，为什么要用计算属性？

  > 如果这里没有用计算属性，那么数据不是响应式的。数据来源是 vuex 里面的，而里面不是响应式数据。

```js
const menuList = computed(() => {
  const list = store.state.category.list.map((item) => {
    return {
      id: item.id,
      name: item.name,
      children: item.children && item.children.slice(0, 2)
    }
  })
  list.push(brand)
  return list
})
```

和单纯的下面的数据比较

```js
const list = store.state.category.list.map((item) => {
  return {
    id: item.id,
    name: item.name,
    children: item.children && item.children.slice(0, 2)
  }
})
list.push(brand)
```

- 注意点 3，用了 template 模板结合 v-if

```vue
<template v-if="item.children">
  <RouterLink
    :to="`/category/sub/${sub.id}`"
    v-for="sub in item.children"
    :key="sub.id"
  >
    {{ sub.name }}
  </RouterLink>
</template>
```

- 还有一个策略进行，怎么样避免，假如没有数据 children，不会报错呢?

```diff
    const menuList = computed(() => {
      const list = store.state.category.list.map(item => {
        return {
          id: item.id,
          name: item.name,
          // 先行一步 防止 没有children数据
++          children: item.children && item.children.slice(0, 2)
        }
      })
      list.push(brand)
      return list
    })

```

3.但是页面的效果不好。子分类的数据 延迟加载，我们也不能写死子分类的数据? 因为这个数据会发生变化

### 14.5.1 左侧菜单的弹层展示

`需求: 鼠标经过不同左侧列表，右侧展示不同的商品`

template 标签

https://blog.csdn.net/u013594477/article/details/80774483

1.声明了一个响应式数据 categoryId 这个数据返回

2.给每个小 li 菜单绑定鼠标经过事件 mouseenter, 经过 就改变 categoryId 的值 为当前的菜单的 id 值

3.curCategory 为计算属性， 每次 categoryId 值一改变，curCategory 就改变，这个改变，那么鼠标经过 弹层显示的数据就会发生改变

使用了 find 方法

4.这里的弹层只用 hover 是 css 的样式进行控制

```js
const categoryId = ref(null)
const curCategory = computed(() => {
  return menuList.value.find((item) => item.id === categoryId.value)
})
```

我觉得这里出现的问题是 curCategory 这个变量是 undefiend 导致.layer 这个弹层里面的商品没数据

疑问: 下面那句代码 写在函数里面 和 写在这里有区别不?

明明逻辑没什么变化。 写在`li标签里面最后是成功了的`

```diff
      <li
      v-for="item in menuList"
      :key="item.id"
+     @mouseenter="categoryId === item.id"
      >
```

还出现了一个问题是，当页面刷新，数据没有一下子展示出来的时候，鼠标经过，全部都是绿色的是怎么回事？

### 14.5.2 左侧菜单品牌数据的展示

`左侧菜单 品牌也有数据`

1.brand 变量里面新增 brands 属性

2.封装 api 接口单独

3.接口数据的处理，记得不能用 async 和 await，不然要多写很多 template 模板标签，添加很多麻烦

- 可以用.then(data => {}) 的方式接受数据
- 可以写一个 onMounted 的形式接受数据

```js
getBrands().then((data) => {
  brand.brands = data.result
})
// onMounted是ok的
// onMounted(async () => {
//   const data = await getBrands()
//   brand.brands = data.result
// })

// 用async和await是会出错的 导致整个组件都没了
// const data = await getBrands()
// brand.brands = data
```

4.增加单独的品牌的结构，样式。数据进行渲染

5.新增的结构也要有 v-if 进行判断

```vue
      <!-- 品牌的结构 -->
      <ul v-if="currCategory && currCategory.brands">
```

`鼠标移动到右侧的弹层，左侧分类的指定小li能够一直被激活，而不是消失了`

1.新增样式 li &.active 动态 class，给小 li，如果当前的 item.id === categoryId 就有样式

```less
&:hover,
&.active {
  background: @xtxColor;
}
// 意思是增加了一个类名
```

```vue
      <li
      v-for="item in menuList"
      :key="item.id"
      @mouseenter="categoryId = item.id"
      :class="{active: categoryId === item.id}"
      >
       添加了动态class
```

`鼠标离开，激活能够消失`

给最大的盒子增加 mouseleave 事件，让 categoryId 等于 null

```vue
  <div class='home-category' @mouseleave="categoryId = null">
```

`弹层的文字 商品推荐和品牌推荐能够区分开来`

> 一定加 currCategory && 如果不加 没有 brands 就会报错 undefiend 的错误

```vue
<h4>{{currCategory && currCategory.brands ? '品牌推荐':'分类推荐'}}
        <small>根据您的购买或浏览记录推荐</small>
      </h4>
```

### 14.5.3 左侧菜单的子分类 懒加载

`希望在数据没有加载的时候，能够有一个缓冲的效果`。行业术语`骨架屏`

1.先测试这样一个组件

2.再思考挂载到全局，区分 vue2 和 vue3 插件挂载 install 的不同方式

```js
原型方法挂载的区别
// 之前 - Vue 2
Vue.prototype.$http = () => {}
// 之后 - Vue 3
const app = createApp({})
app.config.globalProperties.$http = () => {}
```

`vue3install使用方法`

```js
// 插件: 扩展vue原有的功能, 自定义指令、组件、方法
// 但是vue3 没有过滤器 过滤器本质就是方法

// vue2.0插件写法要素：导出一个对象，有install函数，默认传入了Vue构造函数，Vue基础之上扩展
// vue3.0插件写法要素：导出一个对象，有install函数，默认传入了app应用实例，app基础之上扩展

import xtxSkeleton from './xtx-skeleton.vue'

export default {
  install(app) {
    app.component(xtxSkeleton.name, xtxSkeleton)
  }
}
```

3.main.js 里面

```js
createApp(App).use(store).use(router).use(ui).mount('#app')
```

4.组件直接使用

```vue
<template v-else>
  <xtxSkeleton
    width="60px"
    height="18px"
    style="margin-right: 5px"
    bg="rgba(255,255,255, 0.2)"
    animated
  />
  <xtxSkeleton
    width="60px"
    height="18px"
    bg="rgba(255,255,255, 0.2)"
    animated
  />
</template>
```

记得加 v-else 和上面的 template 区分开 记得加 animated 就有动画效果

`vue2`的 install 的使用方法

全局注册 后期不用在分别注册

component 文件里面 index.js 里面 =》 install()方法 获取 vue 实例 里面 => 注册组件 Vue.component(1,2) => 导入到 main.js =》Vue.use

提供注册入口 `**src/componets/index.js**`

```plain
// 这个文件负责所有 公共组件的全局注册
import pageTools from './PageTools'
export default {
  install(Vue, component) {
    // 全局注册组件 还可以注册很多很多 引入 就接着写下面
    Vue.component('pageTools', pageTools)
  }
}
```

main.js

```plain
// 全局注册 导入component里面的index.js里面的组件
import component from '@/components'
Vue.use(component)
```

结果是 所有使用里面的组件 无须额外局部注册

## 14.6 轮播图的展示

### 14.6.1 轮播图的结构

轮播图的基本结构: `src/components/library/xtx-carousel.vue`

全局注册轮播图: `src/components/library/index.js`

使用轮播图，单独修改轮播图的样式: `src/views/home/components/home-banner.vue`

1.创建共用的轮播图组件 install 插件注册

2.在 banner 里面使用轮播图

banner 组件也要放到 home 的 index.vue 组件里面

3.最终要在 banner 组件里面单独修改样式

> 但是这里我没有修改成功
