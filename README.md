线上项目的笔记：http://erabbit.itheima.net/#/

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
轮播图组件 面包屑组件 render+createVnode 查看更多组件
骨架屏组件 复选框组件 单选框组件	
对话框组件 消息提示组件 函数调用
消息确认组件 函数调用 分页组件
步骤条组件 时间线组件
标签页组件 render + jsx 城市选择组件
```



# 4. 注意点：

2.vuex大展身手

3.vue3.0会有bug，但是会慢慢过渡

**4.重难点: 第三方登录，商品详情，购物车，支付结算，订单管理**

5.大量封装自己的组件







# 5. 初始化项目

**如何初始化一个vue3的项目？**

```bash
# 下载vue/cli脚手架
npm install --global @vue/cli
# 开启一个vue项目
vue create erabbit-pc-vue-project
```





# 6. 读懂一些目录文件

**.browserslistrc配置文件有什么用？**

- 决定哪些浏览器是可以使用的

```
> 1% 市场份额大于 1%
last 2 versions 最后两个版本
not dead 不是死的浏览器
```



**.editorconfig **

- 给编辑器读的，比如vscode webstorm

```
[*.{js,jsx,ts,tsx,vue}]
indent_style = space
indent_size = 2
trim_trailing_whitespace = true
insert_final_newline = true
```



**.eslintrc.js？**

eslintrc的校验语法



**.gitignore**

忽略文件，哪些文件不被放进git仓库





**jsconfig.json** 

- 为了输入@符号 自动出现新的路径

```diff
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
+      "@/*": ["./src/*"],
    }
  },
  "exclude": ["node_modules", "dist"]
}
```





**.eslintignore**

- eslint忽略校验文件

```js
/dist
/src/vender
```





# 7. vuex的补充使用

1.引入createStore方法

```js
import { createStore } from 'vuex'
```

2.默认导出**createStore**方法的调用

```diff
export default createStore({
	state: {
	
	},
	mutations: {
	
	},
	actions: {
	
	},
	modules: {
	
	}
})
```

3.注意main.js里面要这样使用

```js
import store from './store'
createApp(App).use(store).use(router).use(ui).mount('#app')
```

4.注意vue文件**setup**要这样使用

```js
import { useStore } from 'vuex'

setup里面这样用
const store = useStore()
// 使用state
console.log(store.state.userName)
// 使用getters
console.log(store.getters.getUserName)
// 使用mutations和actions
const updateUserName = () => {
  store.commit('updateUserName', '123')
  store.dispatch('updateUserName', 'wangwu')
}
```

5.注意template里面这样使用

```vue
// 使用state
<div>{{ $store.state.userName }}</div>
// 使用getters
<div>{{ $store.getters.getUserName }}</div>
// 使用mutations
<button @click="$store.commit('updateUserName', 'xiaohang')">
// 使用actions
<button @click="$store.dispatch('updateUserName')">
```

6.**开启命名空间**

- 模块化是什么 
  - 一个个文件。**为什么要模块化**：为了不同类型的数据 分类处理 好管理。能够减少命名冲突，能够更加清晰

- 在store文件夹下面，创建modules文件夹，写模块,比如cart.js。**namespaced: true就是表示开启命名空间**

```js
export default {
  namespaced: true,
  state: {
    name: '123456'
  },
  getters: {
  },
  mutations: {
    changeName (state, name) {
      state.name = name
    },
    changeName2 (state, name) {
      state.name = name
    }
  },
  actions: {
  },
  modules: {
  }
}
```

- 然后在store/index.js里面引入

```js
import { createStore } from 'vuex'
import cart from './modules/cart'
export default createStore({
  modules: {
    cart,
  },
})
```



- 使用state,没有开启命名空间，state都是要加模块名的

```vue
{{$store.state.a.username}} a是模块名
其它 getters mutations actions 都不需要加模块名就能够访问
```



- 开启命名空间时,**注意，在每个模块内部去开启**

```js

// getters
$store.getters['b/changeNameB']

// commit
$store.commit('b/changeB', '123')

// dispatch
$store.dispatch('b/updateB')
```

注意，`b.dispatch.updateB`这样的写法是错误的。

注意，getters也必须这样写，getters必须是`$store.getters['b/changeNameB']`





7. **其它补充:**

1. store/index.js里面配置好了，挂载到main.js里面后，可以直接在组件里面 $store.state.userName 这样使用。**不是说，引入了store，模块才能使用。**
1. **getters**是vuex的计算属性，也会有**缓存**,里面写函数 return值
1. 如果无ajax请求，`可以无需经过dispatch`，直接通过commit调用函数，那幅图不完整
1. actions里面的函数形参 `context包含了state,commit,getters等成员`





**8.如何实现vuex和本地存储结合呢？**

- 为什么要结合呢？
  - 只用vuex，那么数据不会保存，刷新就没了
  - 只用本地存储，数据存和取，麻烦，每次都要调用API，`localStorage.setItem和getItem`
  - 且数据希望能够存在本地，`用户信息、购物车`
- 如何使用呢？
  - **使用插件 vuex-persistedstate**

```diff
+import createPersistedstate from 'vuex-persistedstate'
+export default createStore({
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



**-D和-S的区别是什么：**

1.-D的文件放在devDependencies里面 （--save-dev）

  -S的文件放在dependencies里面 （--save的简写）

2. dependencied -S里面适合的开发和生产环境都需要的包。Vue Vue-Router Vant  

   devDependencies -D只适合开发环境，而生产环境不需要的包。babel loader webpack的插件等



`注意点`

1.模块内部的文件不需要使用 createStore啦，index.js里面写了就好

2.如果有模块，namespaced要写在模块的里面。且之前犯错，nameSpaced:true, 拼的是错的



# 9. axios的封装

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





为什么要配置token到请求拦截器? 

​	因为这样每次请求 附带token  比较省力。附带token时，先判断有无token

token从哪里来？

​	从用户的数据中来 profile.token



**拦截请求的业务逻辑**

```js

instance.interceptors.request.use(config => {
  const { profile } = store.state.user
  // 有profile就携带
  if (profile.token) {
    config.headers.Authorization = `Bearer ${profile.token}`
  }
  return config
}, err => {
  return Promise.reject(err)
})
```





------



**拦截响应的业务逻辑**

```vue
路由跳转
1. fullPath？
  是什么 一段完整的url
2. 组件内如何获取 当前的路由
  $router.path
3. 但是$router.path会忽略 参数 /user?a=10 只能拿到 /user
  $router.fullPath 能够拿到完整的
4. 但是不在组件里面怎么办 在js文件里面
  router.currentRoute.fullPath               注意 router.currentRoute 相当于 $router
5.  还不够 因为vue3获取到的router.currentRoute是响应式数据
  router.currentRoute.value.fullPath
6. 还不够 因为可能携带参数 /user?a=10&b=10
  /user?a=10&b=10里面有等号 被地址栏解析会出错 忽略b=10 要使用 encodeURIComponent
```



```js
// 拦截响应的业务逻辑
instance.interceptors.response.use(res => res.data, err => {
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
})
```





！JS的对象的属性，[]里面可以写表达式，这样写的是动态的键

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

1.利用axois创建的实例 传入配置项 method get 数据

2.难点 如果说传入的是get就用params传参，其他的都是data传参

**如何区分get和post传参?**

利用动态的key进行

>[method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
>
>这句代码是难点
>
>const obj = {name: 123, age: 19}
>
>​	obj.name 和 obj.age obj[name] 都可以访问
>
>里面还可以传递变量和表达式
>
>​	const key = name
>
>​	obj[key]可以访问到
>
>​	obj[10 > 9 ? ‘name’: ‘age’] 都可以访问到

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
  App<button @click="fn">点击发送请求</button>
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

​	是否有token

​	响应拦截器如果返回的是err，能否重定向，默认的是get方法



**axios的难点**

1. 响应拦截器 获取路由 

   这里涉及了获取当前路由的方法

   如何进行解码 =》涉及到了浏览器地址栏 解码参数的问题

   涉及到了vue3响应式数据 必须.value的问题

2. 如果调用方法 请求工具的封装

   因为传入的方法既可能是get也可能是post因此必须进行区分，可是对象里面无法写if和else 所以要用对象的动态key 

   可是涉及到了另外一个问题，就是对象不同于map对象，前者对象只能是字符，后者可以是任何的数据类型，那么[]里面写表达式的写法到底是什么呢





# 11. 路由设计

**1.总共有多少级路由**

- 总共有3级路由

- 比如首页，是一级，首页里面的home是二级，category是二级

![image-20221031130523766](https://typora-1309613071.cos.ap-shanghai.myqcloud.com/typora/image-20221031130523766.png)

**2.如何进行路由规则配置**

```js
// 1. 引入API
import { createRouter, createWebHashHistory } from 'vue-router'

// 2. 引入组件
const layout = () => import('@/views/layout.vue')
const home = () => import('@/views/home/index.vue')
// 3. 创建路由配置项
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
// 4. 创建路由实例 路由配置内容放入
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 4. 导出 在main.js里面进行具体挂载
export default router

```



**3.首页里面引入**

```js
import router from './router'

createApp(App).use(store).use(router).use(ui).mount('#app')
```



# 12. less使用

## **混入基本语法**

```js
// less 有哪些语法? 
// 1. 变量
// 2. 嵌套
// 3. 函数 混入 - 复用 
//    3.1 既可以是直接类的混入
//    3.2 也可以是函数方式的混入 类后面要加括号 同时可以传递变量
```



**解析两次的less复用**

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



**解析一次的less复用**

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



>less语法出错的可能性: 
>
>1. import导入 前面没有加@负号 也就是 @import ‘’
>2. 注意,@import ''引号里面**不能使用@**，不会被识别
>3. less语法必须结尾有分号
>4. import导入的路径 出错了也会报错

## 关于全局的css的混入

1. 为何要全局混入less文件

- 因为每个组件里面要使用混入的css 都要导入 太麻烦了

2. 如何全局混入

-  安装插件 注意是安装vue/cli的插件 因此用vue命令
-  vue add style-resources-loader
-  安装后呢? 自动生成 vue.config.js文件 配置Patterns数组配置项



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

patterns里面可以配置很多个路径，表示可以混入多个less文件里面的代码

这里用path.join 结合 __dirname 拼接 ，第二个参数用绝对路径 => **带盘符** 而 dirname是带盘符的。使用了dirname，就是要拼成**绝对路径**

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

index.html要使用平级的图片

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



path.join里面是什么路径？可以拼成绝对路径，要配合 dirname

path.resolve能够直接找到绝对路径



# 13. 导入公共样式和格式化的样式

**安装包**

```diff
yarn add normalize.css
```

**在main.js里面引入**

```diff
import 'normalize.css'
import './assets/styles/common.less'
```

**common.less文件**

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
     font: 1em/1.4 'Microsoft Yahei', 'PingFang SC', 'Avenir', 'Segoe UI', 'Hiragino Sans GB', 'STHeiti', 'Microsoft Sans Serif', 'WenQuanYi Micro Hei', sans-serif
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
   
   input[type="text"],
   input[type="search"],
   input[type="password"], 
   input[type="checkbox"]{
     padding: 0;
     outline: none;
     border: none;
     -webkit-appearance: none;
     &::placeholder{
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
     content: ".";
     display: block;
     visibility: hidden;
     height: 0;
     line-height: 0;
     clear: both;
   }
```





# 14. 首页

## **14.1 app-topnav**

1.先引入字体图片文件。这个文件存储到了`index.html`文件里面

><link rel="stylesheet" href="//at.alicdn.com/t/font_2143783_iq6z4ey5vu.css">

2.~是相邻选择器，修改后面所有相邻不相邻的兄弟

```diff
+     ~ li {
        a {
          border-left: 2px solid #666;
        }
      }
```



3**.区分登录和未登录的两种状态，**下面利用vuex里面user模块的profile.token进行区分。

- 因为用户存在登录和未登录的两种状态

```diff
+ <template v-if="$store.state.user.profile.token">
    <li><a href="javascript:;"><i class="iconfont icon-user"></i>周杰伦</a> </li>
    <li><a href="javascript:;">退出登录</a>
    </li>
</template>
+ <template v-else>
    <li><a href="javascript:;">请先登录</a></li>
    <li><a href="javascript:;">免费注册</a></li>
</template>
```







## **14.2 app-header**

拓展：**Vetur和Volar都是干嘛用的？**



**logo的布局注意**

h1里面放a标签，a标签设置背景图片

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
        <input
          type="text"
          placeholder="搜一搜"
        />
      </div>
```



**搜索search框的布局注意**

em是那个小图标

i是购物车图标

```html
      <div class="cart">
        <a
          class="curr"
          href="#"
        >
          <i class="iconfont icon-cart"></i><em>2</em>
        </a>
      </div>
```

## **14.3 头部分类导航渲染**

**如何避免，头部导航数据出现白屏？**

1.能够渲染出一级导航就很棒了

2.接口数据来了就用接口的，没有就用vuex的

3.需求：头部分类导航的数据，用写死的数据。为什么?

- 因为如果从后台获取，获取速度慢了，出现白屏，因此，和后台约定，这个9个大分类的数据不变化，先写死。这样写的好处是，减少白屏的可能性

<img src="https://typora-1309613071.cos.ap-shanghai.myqcloud.com/typora/image-20221015154057218.png" alt="image-20221015154057218" style="zoom:25%;" />





**接口问题**

如果报错，axios Error，要么是utils/request.js里面的文件内容写错，要么就是下面

**就是请求的接口有问题**

```js
export const baseURL = 'http://apipc-xiaotuxian-front.itheima.net/'
export const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'
```



## **14.4 头部分类交互**

**小结：头部分类导航有很多难点。**

**功能点：**

- 鼠标经过一级导航，显示二级类目；

- 离开一级导航，二级类目关闭(通过mouseenter+mouseleave)

- 鼠标点击一级导航，二级类目关闭(通过click事件来实现)
- 鼠标点击二级导航，二级类目要关闭(click事件)
- 鼠标点击一级导航，跳转到指定页面,**RouterLink**
- 鼠标点击二级导航，能够跳转到指定的页面，**RouterLink**

1. **mouseenter给谁加**：mouseenter如果给router-link添加是错误的。给li添加是正确的。要给面积和范围更大的添加

2. **to属性加冒号** 这里写法很容易出错

```vue
:to="`/category/${item.id}`"
```

```vue
  <!-- <a href="#">{{item.name}}</a> -->
  <router-link
    :to="`/category/${item.id}`"
    @click="hide(item)"
  >
    {{item.name}}
  </router-link>
```



3. 鼠标离开一级类目，想要去点二级类目时，弹层立马就消失了，**根本点击不到二级类目**。

- 在vuex里面**获取**所有的category分类数据。
- 然后每个分类category数据都给**open属性为false**。
- 在vuex里面声明方法，show和hide
- 如果鼠标**经过某个分类**，就**传递这个分类**来到vuex调用**show**方法，改变他的open为true
- 而.layer样式，通过**item各自的open**属性控制。鼠标离开，通过hide来实现

```js
// 显示二级类目
show (state, target) {
  // 对应的category分类的open属性改为true
  const category = state.list.find(item => item.id === target.id)
  category.open = true
},
// 隐藏二级类目
hide (state, target) {
  // 对应的category分类的open属性改为false
  const category = state.list.find(item => item.id === target.id)
  category.open = false
}
```

为什么要这么做？

- 首先是导航分类的数据，在vuex里面去存储的。为什么呢？因为下面的banner里面也要使用这个数据。
- 既然是在**vuex**存储的，那么我们修改的时候也希望是通过mutations来改**state**





4. **为什么，鼠标点击一级/二级类目时，layer没有消失？**

- 因为hover只能控制，`鼠标经过` 鼠标离开。我们这个场景需要，`鼠标经过` 鼠标离开 鼠标点击 三种情况。必须要用click+mouseenter+mouseleave来解决

- less语法 `&.open`{} 是交集选择器，两个选择器是同级的，不是后代也不是子代选择器。

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

用block属性值来控制是有问题的。应该用opacity属性值来控制。因为原本就是opacity设置为0，那么显示，要改为1

5.首次进入会有一个**白屏的**情况

**使用loading来解决**。做到了loading时，来修改这里



## **14.5 头部分类吸顶设置**

`需求:  鼠标滚轮往下滚动，超过78像素，此时头部的nav已经不见。出现了一个吸顶的nav`

实现：

传统和组合式API的实现两种。原理都是利用css属性，页面往下滚动超过78px，就显示这个nav组件。


```diff
+    <div class="app-header-sticky" :class="{show: y >= 78}">
```

**原生实现**

```js
// onMounted(() => {
//   window.onscroll = function () {
//   获取页面的距离顶部的滚动
//   const scrollTop = document.documentElement.scrollTop
//     y.value = scrollTop
//   }
// })
```



### vueuse/core包的使用

`需求: 使用vueuse/core包，进行滚动距离的监测，不是原生方法`

```bash
npm i @vueuse/core@4.9.0
```

```vue
import { useWindowScroll } from '@vueuse/core'
setup () {
    const { y } = useWindowScroll()
    return { y }
}
```



**css样式**

- 会把原本的opacity从0改为1，让他显示，同时，原本有一个transform: translateY(-100%); 也给他给为0，这样就能往下面移动

```diff
.app-header-sticky {
  width: 100%;
  height: 80px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;
+  transform: translateY(-100%);
+  opacity: 0;
  &.show {
    transition: all 0.3s linear;
+    transform: none;
+    opacity: 1;
  }
```



小结：

1.吸顶就是，页面滚动到一定距离，导航栏nav出现并且挂在顶部。在电商网站比较常用

2.通过原生，监听window.scroll事件或者是vueuse/core方法都可以实现，获取页面滚动高度，超过78，就添加动态添加样式

## 14.6 左侧菜单布局

`需求：左侧菜单的数据是动态的显示，而不是静态的。同时左侧有10个菜单，每个菜单有子菜单`

1.注意Router-link标签，设置样式时，写的是a标签，而不是 Router-link{}

2.这里布局的思路是:

- 上面的nav有九个数据 但是下面的左侧菜单要求10个，所以要拼接一个。因此要声明一个品牌，然后push进入数组的操作

- 而数组list的数据 从vuex里面取出来，list的每个数据都要改写一下，children很多但是只要**前两个**`slice(0, 2) `

```js
item.children && item.children.slice(0, 2)
```

- 最终的list用的是计算属性，为什么要用计算属性？
  - 因为list来自，vuex，不是响应式数据。但是computed数据是响应式的。

```js
    const menuList = computed(() => {
      const list = store.state.category.list.map(item => {
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

- **下面是错误的写法**

```js
      const list = store.state.category.list.map(item => {
        return {
          id: item.id,
          name: item.name,
          children: item.children && item.children.slice(0, 2)
        }
      })
      list.push(brand)
```

- 用了template模板结合v-if

```vue
<template v-if="item.children">
  <RouterLink :to="`/category/sub/${sub.id}`"
  v-for="sub in item.children"
  :key="sub.id"
  >
    {{sub.name}}
  </RouterLink>
</template>
```

- 如果没有children,直接item.children.slice(0, 2)是会报错的，所以先做一个判断 item.children && ……

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

3.但是页面的效果不好。子分类的数据 延迟加载，后续有骨架屏

4.brand是reactive数据，这个数据push到list里面去时，要计算属性里面去push，然后再返回，不能够直接push到计算属性里面的结果，不然就会产生bug

```diff
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
      const list = store.state.category.list.map(item => {
        return {
          id: item.id,
          name: item.name,
          children: item.children && item.children.slice(0, 2)
        }
      })
+      list.push(brand) 在这个里面push到list数组，而不是在外面
      return list
    })
+   menuList.value.push(list) 这样写不太妥当，是错误的
```



小结：这一节的技巧

1.数据不确定有无时，做一层保险处理。children: item.children && item.children.slice(0, 2)

2.计算属性的数据是响应式的，从vuex拿来的list再通过计算属性修改，更好

3.直接修改计算属性是不允许的，但是在计算属性里面去修改，是没问题的



### 14.6.1 左侧菜单的弹层展示

`需求: 鼠标经过不同左侧列表，右侧展示不同的商品`

template标签：

- 天生是display: none;打印，要操作它，必须通过它里面的dom元素

易错点：

- 赋值 `@mouseenter="categoryId === lis.id"` 明明是赋值，写成三个等于，就是错的；一个等于！

逻辑是什么呢：

- categoryId 控制当前鼠标经过的分类
- 每个小li菜单绑定鼠标经过事件 mouseenter,经过就改变categoryId的值 为当前的菜单的id值
- curCategory为计算属性， 每次categoryId值一改变，curCategory就改变，这个改变，那么鼠标经过 弹层显示的数据就会发生改变, 使用了find方法
- 动态class控制当前鼠标经过的小li
- 常用的指令：v-model、:class、v-bind、v-on、v-for、

```js
const categoryId = ref(null)    
const curCategory = computed(() => {
      return menuList.value.find(item => item.id === categoryId.value)
})
```





### 14.6.2 左侧菜单品牌数据的展示

目标：品牌小li弹框，要显示“新的内容和布局”，这个内容要从后台发送接口



(难点)

1.鼠标经过左侧弹层，显示layer没问题；但是鼠标离开，控制台打印，**computed is readonly**；

在mouseleave里面 curCategory = null 设置了这个导致，不能直接去修改计算属性。

(解决)那么如何在鼠标离开左侧menu时，layer也能够消失呢？ -> 直接把 categoryId 变为空即可

(难点)

2.**curCategory?.**curCategory.brandResult?.curCategory.brandResult.length这里使用了 ?.发现会报错 ?. 不能够替换&&嘛？

(难点)

3.**鼠标从menu -> 移动到layer上面，还没移动过去，layer就没了**

（解决）鼠标从menu -> 离开到layer，就触发了 categoryId = null -> 这个赋值不应该在鼠标离开小li的时候触发， 应该写到最大的div上面

(难点)

4.**鼠标没有经过menu的小li，进入了大的div，就显示了文字，不太靠谱**

 给layer弹层添加v-if即可，注意区分到底是分类还是品牌



5.`鼠标移动到右侧的弹层，左侧分类的指定小li能够一直被激活，而不是消失了`

- 鼠标移动到layer，此时的categoryId也是有值的，如何有值？鼠标离开最大的div而不是li和layer就清空categoryId,因此判断的条件也是categoryId === item.id而不是null

```less
&:hover,
&.active
{
background: @xtxColor;
}
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

给最大的盒子增加 mouseleave事件，让categoryId 等于null

```vue
  <div class='home-category' @mouseleave="categoryId = null">
```

`弹层的文字 商品推荐和品牌推荐能够区分开来`

>一定加 currCategory && 如果不加 没有brands 就会报错undefiend的错误

```vue
      <h4>{{currCategory && currCategory.brands ? '品牌推荐':'分类推荐'}}
        <small>根据您的购买或浏览记录推荐</small>
      </h4>
```



小结：

1. 这里最关键的一点是，什么时候清空categoryId呢？是在鼠标离开，div，最大的div时清空。能够解决如下两个问题

- 鼠标从li  移动到 layer，还没移动过去，layer就消失了
- 鼠标移动到layer时，左侧的小li并没有被高亮激活

2.还有一个很关键的类

在HomeCategory组件`.home-category `{里面设置了一个类,那么此时display: block

也就是只要鼠标经过`.home-category`，那么.layer类里面的display就要修改block而不是none。

```diff
&:hover {
  .layer {
    display: block;
  }
}
```



**这里用opacity去调试，就会很奇怪**

1.因为鼠标经过小li时，我们希望另一个解构里面的layer这个类能够显示，所以我们不能在li里面去添加一个layer，然后li:hover {.layer {opacity: 0;}} 因为layer本身不属于li。

2.我们去给layer自己本身添加hover也是不合理，因为这个东西一开始没有显示

3.所以我们去给更大的，home-category添加

### 14.6.3 左侧菜单的子分类 骨架屏

**骨架屏**：希望在数据没有加载的时候，能够有一个缓冲的效果，骨架屏能够帮我们实现，如下图。

<img src="https://typora-1309613071.cos.ap-shanghai.myqcloud.com/typora/image-20221103192851785.png" alt="image-20221103192851785" style="zoom:50%;" />

这个组件的逻辑是：

1. 组件需要暴露宽度 高度 背景颜色三个变量，同时还需要一个变量，animated来控制是否显示动画，因为添加了一个动画。

2. 骨架屏的结构如下。大盒子有宽高和一个伪元素，伪元素有动画。小盒子是背景的颜色

```vue
  <div
    class="xtx-skeleton"
    :class="{shan: animated}"
    :style="{width, height}"
  >
    <!-- 1 盒子-->
    <div
      class="block"
      :style="{backgroundColor: bg}"
    ></div>
    <!-- 2 闪效果 xtx-skeleton 伪元素 --->
  </div>
```



伪元素的动画的样式

```diff
.shan {
  &::after {
    content: "";
    position: absolute;
+animation: shan 1.5s ease 0s infinite;
    top: 0;
    width: 50%;
    height: 100%;
+    background: linear-gradient(
      to left,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0.3) 50%,
      rgba(255, 255, 255, 0) 100%
    );
+    transform: skewX(-45deg);
  }
}
@keyframes shan {
  0% {
    left: -100%;
  }
  100% {
    left: 120%;
  }
}
```

3. 我们是这样去使用骨架屏组件的

- 明确需要v-if和v-else配合
- 可能要传递多个这样的组件

```diff
+<template v-if="lis.children">
  <RouterLink
    :to="`/category/sub/${sub.id}`"
    v-for="sub in lis.children"
    :key="sub.id"
  >
    {{sub.name}}
  </RouterLink>
</template>
<!-- 骨架屏组件 -->
+<template v-else>
+  <xtx-skeleton
+    :animated="true"
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
```





4. 我们想要把这个组件挂载到全局里面，该怎么去处理呢？

**Vue2和Vue原型挂载区别**

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



3.main.js里面

```js
createApp(App).use(store).use(router).use(ui).mount('#app')
```



**`vue2`的install的使用方法**

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
