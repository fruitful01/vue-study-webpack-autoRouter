<template>
  <div id="app">
    <router-view></router-view>
    <div style="margin: 0px auto; width: 562px; height: 640px;">111</div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {
    this.ajax();
  },
  methods: {
    ajax() {
      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          console.log(xhr);
          // if(xhr.status >)
        }
      };
      xhr.open("put", "/upload");
      xhr.send("发送的信息");
    }
  }
};
</script>
<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  color: red;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>