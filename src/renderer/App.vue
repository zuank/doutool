<template>
  <div id="app">
    <el-container>
      <el-header>
        <span style="float:right">
          DouTool
        </span>
        <el-menu mode="horizontal">
          <el-menu-item index="1">推荐</el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'doutool',
  }
</script>

<style lang='scss' scoped>
body {
  font-family: "PingFang SC","Helvetica Neue",Helvetica,"Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
.el-header {
  z-index: 100;
  line-height: 60px;
  background: #87994D;
  position: fixed;
  top: 0;
  width: 100%;
}
.el-menu {
  float: left;
  background-color: transparent;
}
.el-menu--horizontal>.el-menu-item {
  color: rgb(80, 7, 110);
  font-size: 24px;
}
.el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
  color: rgb(80, 7, 10);
  background-color: transparent;
}
.el-main {
  padding: 80px 20px 20px 20px;
}
</style>
