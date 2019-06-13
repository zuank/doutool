<template>
    <div id="thing-list">
        <el-header>
            <div class="nav">
                <span v-for="(item,index) in typeList" :key="index" :class="{ active: type === item.value }" @click="getList(item.value)">{{item.name}}</span>
                <el-input v-model="QueryString" clearable placeholder="请输入商品名称或编号" @keydown.enter.native="search">
                    <template slot="append">
                        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
                    </template>
                </el-input>
            </div>
        </el-header>
        <el-main>
            <el-row v-infinite-scroll="loadMore" infinite-scroll-disabled="disabled" :gutter="20">
                <div>
                    <el-col v-for="(item, index) in list" :key="index" :span="span">
                        <el-card :body-style="{ padding: '0px' }">
                            <img :src="imgUrl + item.Picture" class="image">
                            <div style="padding: 14px;">
                                <p class="title">{{item.PName}}</p>
                                <div class="bottom clearfix">
                                    <time class="time">SN:{{item.ToySn}}</time>
                                    <el-button type="text" class="button" @click="showInfo(item)">查看</el-button>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </div>
                <p v-if="loading" class="list-message">加载中...</p>
                <p v-else-if="noMore" class="list-message">没有更多了</p>
            </el-row>
        </el-main>

        <el-dialog
            title="玩具详情"
            :visible.sync="dialogVisible"
            width="600px"
        >
            <iframe :src="baseUrl + info.html" frameborder="0"></iframe>
        </el-dialog>
    </div>
</template>

<script>
import { imgUrl, baseUrl } from '@/apiUrl';
export default {
    name: 'List',
    data() {
        return {
            typeList: [
                { name: '推荐', value: 1 },
                { name: '新款', value: 2 },
                { name: '版权', value: 3 },
                { name: '品牌', value: 4 },
                { name: '全部', value: 5 },
            ],
            type: 1,
            page: 1,
            size: 20,
            list: [],
            imgUrl: imgUrl,
            baseUrl: baseUrl,
            span: 8,
            loading: false,
            noMore: false,
            info: {},
            dialogVisible: false,
            QueryString: ''
        };
    },
    created() {
        this.getList();
    },
    mounted() {
        this.initPic();
    },
    computed: {
        disabled() {
            return this.loading || this.noMore;
        }
    },
    methods: {
        // 搜索框搜索
        search() {
            this.noMore = false;
            this.type = null;
            this.page = 1;
            this.list = [];
            this.searchList();
        },
        // 展示详情
        showInfo(item) {
            this.info = item;
            this.dialogVisible = true;
        },
        // 初始化排版
        initPic() {
            const bodyWidth = document.body.clientWidth;
            if (bodyWidth <= 300) {
                this.span = 24;
            }
            else if (bodyWidth <= 600) {
                this.span = 12;
            }
            else if (bodyWidth <= 830) {
                this.span = 8;
            }
            else if (bodyWidth <= 830) {
                this.span = 8;
            } else if (bodyWidth <= 1200) {
                this.span = 6;
            } else {
                this.span = 4;
            }
        },
        // 搜索列表
        searchList() {
            this.loading = true;
            this.$http.post('http://api.toysmodel.cn/Shop/index.php?s=/App/get_product_list', {
                area_id: 1,
                page: this.page,
                pagesize: 20,
                QueryString: this.QueryString
            }).then(response => {
                this.loading = false;
                if (response.data.list) {
                    this.list = [...this.list, ...response.data.list];
                } else {
                    this.noMore = true;
                }
            });
        },
        // 按分类获取列表
        getList(type) {
            if (type) {
                this.type = type;
                this.noMore = false;
                this.list = [];
                this.page = 1;
            }
            this.loading = true;
            this.$http.post('http://api.toysmodel.cn/Shop/index.php?s=/App/get_product_list', {
                area_id: 1,
                page: this.page,
                pagesize: 20,
                type: this.type
            }).then(response => {
                this.loading = false;
                if (response.data) {
                    this.list = [...this.list, ...response.data.list];
                }

            });
        },
        // 懒加载
        loadMore() {
            this.page++;
            if (this.type === null) {
                this.searchList();
            } else {
                this.getList();
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.el-header {
  z-index: 100;
  line-height: 60px;
  background: #87994D;
  position: fixed;
  top: 0;
  width: 100%;
}
.nav {
  .el-input {
    width: 300px;
    float: right;
    margin: 10px
  }
  span {
    color: #333;
    font-size: 20px;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    &.active {
      background-color:tan
    }
  }
}
.el-main {
  padding: 80px 20px 20px 20px;
}
.el-dialog {
  iframe {
    width: 100%;
    height: 600px;
  }
}
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
  line-height: 40px;
}
</style>
