<template>
  <div id="app">
    <Home></Home>
  </div>
</template>

<script>
import Home from './views/Home.vue'

export default {
  name: 'app',
  components: {
    Home
  }
}
</script>

<style>
body,
html {
  background: #f4f4f4;
  margin: 0;
  padding: 0;
}
ul,
li,
ol {
  list-style: none;
}
/* ::-webkit-scrollbar{
  width: 4px;
  height: auto;
}
::-webkit-scrollbar-thumb{
  border-radius: 5px;
  background: rgba(0,0,0, .4);
}
::-webkit-scrollbar-track{
  background: rgba(0,0,0, .2);
  border-radius: 0;
} */
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.el-tabs--left.el-tabs--border-card .el-tabs__item.is-left {
  height: 90px;
  padding-top: 5px;
  padding-bottom: 5px;
}
.el-tabs--left.el-tabs--border-card .el-tabs__item.is-left.is-active{
  background: #f9f9f9;
}
</style>
