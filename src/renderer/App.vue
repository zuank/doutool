<template>
  <div id="app">
    <el-container>
      <el-header>
        <span style="float:right">
          DouTool
        </span>
        <div class="nav">
          <span class="active">推荐</span>
        </div>
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
.nav span {
  color: #333;
  font-size: 20px;
  padding: 10px;
  border-radius: 5px;
  &.active {
    background-color:tan
  }
}

.el-main {
  padding: 80px 20px 20px 20px;
}
</style>
