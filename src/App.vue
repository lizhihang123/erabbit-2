<template>
  <!-- <nav>
    <button @click="$store.commit('cart/changeName', 123)">点击改变值</button>
    {{$store.state.cart.name}}
  </nav> -->
  <router-view/>
</template>

<script>
import { useStore } from 'vuex'
export default {
  setup () {
    const store = useStore()
    const changename = () => {
      console.log(store.state.cart.name)
      store.commit('changeName2', 123)
    }
    return {
      changename
    }
  }
}
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
