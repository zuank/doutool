<template>
  <el-row v-infinite-scroll="loadMore" :gutter="20">
    <el-col :span="8" v-for="(item, index) in list" :key="index">
      <el-card :body-style="{ padding: '0px' }">
        <img :src="imgUrl+item.Picture" class="image">
        <div style="padding: 14px;">
          <p class="title">{{item.PName}}</p>
          <div class="bottom clearfix">
            <!-- <time class="time">{{ currentDate }}</time>
            <el-button type="text" class="button">操作按钮</el-button> -->
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import {imgUrl} from '@/apiUrl'
export default {
  name: 'List',
  data(){
    return {
      page:3,
      size:20,
      list:[],
      imgUrl:imgUrl
    }
  },
  created(){
    this.getList()
  },
  methods:{
    getList(){
      this.$http.post('http://api.toysmodel.cn/Shop/index.php?s=/App/get_product_list',{
        area_id:1,
        page:this.page,
        pagesize:20,
        type:3
      }).then(response => {
        this.list = [...this.list, ...response.data.list]
      })
    },
    loadMore(){
      this.page++;
      this.getList()
    }
  }
}
</script>

<style lang="scss" scoped>
.el-row {
  height: calc(100vh - 100px);
  overflow: auto;
  min-width: 800px;
}
.image {
  width: 100%;
}
.el-card {
  margin-bottom: 10px;
  .title {
    font-size: 14px;
    color: #333333;
  }
}
</style>
