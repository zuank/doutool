<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'doutool',
    created(){
      this.$http.post('http://api.toysmodel.cn/Shop/index.php?s=/App/get_product_list').then(response => {
        console.log(response)
      })
    }
  }
</script>

<style>
  /* CSS */
</style>
