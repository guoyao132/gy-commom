<template>
  <div :id="$style.app">
    132
    <router-view/>
  </div>
</template>
<script>

  export default {
    name: 'App',
    data: function () {
      return {}
    },
    methods: {
    },
    mounted: function () {
      window.gyCom = this.$gyCom;
    },
  }
</script>
<style lang="less" module>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
}

#nav {
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
