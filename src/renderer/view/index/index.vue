<template>
  <el-row v-infinite-scroll="loadMore" :gutter="20" id="thing-list">
    <el-col :span="span" v-for="(item, index) in list" :key="index">
      <el-card :body-style="{ padding: '0px' }">
        <img :src="imgUrl+item.Picture" class="image">
        <div style="padding: 14px;">
          <p class="title">{{item.PName}}</p>
          <div class="bottom clearfix">
            <time class="time">SN:{{item.ToySn}}</time>
            <el-button type="text" class="button">查看</el-button>
          </div>
        </div>
      </el-card>
    </el-col>
    <p v-if="loading" class="list-message">加载中...</p>
    <p v-if="noMore" class="list-message">没有更多了</p>
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
      imgUrl:imgUrl,
      span:8,
      loading: false,
      noMore: false,
    }
  },
  created(){
    this.getList()
  },
  mounted(){
    this.initPic()
  },
  methods:{
    initPic(){
      const bodyWidth = document.body.clientWidth;
      if (bodyWidth<=300) {
        this.span = 24;
      }
      else if (bodyWidth<=600) {
        this.span = 12;
      }
      else if (bodyWidth<=830) {
        this.span = 8;
      }
      else if (bodyWidth<=830) {
        this.span = 8;
      } else if (bodyWidth<=1200) {
        this.span = 6;
      } else {
        this.span = 4;
      }
    },
    getList(){
      this.loading = true;
      this.$http.post('http://api.toysmodel.cn/Shop/index.php?s=/App/get_product_list',{
        area_id:1,
        page:this.page,
        pagesize:20,
        type:3
      }).then(response => {
        this.loading = false;
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
}
.image {
  width: 100%;
}
.el-card {
  margin-bottom: 10px;
  .title {
    font-size: 14px;
    color: #333333;
    white-space:nowrap; 
    overflow:hidden; 
    text-overflow:ellipsis;
    padding: 0;
    margin: 0;
  }
  .bottom {
    line-height: 40px;
    .button {
      float: right;
    }
  }
}
.list-message {
  text-align: center;
  font-size: 20px;
}
</style>
