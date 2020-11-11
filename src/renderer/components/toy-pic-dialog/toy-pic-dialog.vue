<template>
    <el-dialog
        title="玩具素材"
        :visible.sync="dialogVisible"
        width="400px"
    >
        <div class="img-list">
            <el-image v-for="(item,index) in list" :key="index" scroll-container :src="`${imgUrl}${item.Path}/${item.FName}`"></el-image>
        </div>
    </el-dialog>
</template>
<script>
import { imgUrl } from '@/apiUrl'
export default {
  data () {
    return {
      list: [],
      PID: '',
      ToySn: '',
      imgUrl: imgUrl,
      dialogVisible: false
    }
  },
  methods: {
    async searchPic () {
      this.list = []
      await this.$http.get(`http://api.toysmodel.cn/toyN1.php?function=PicQuerySumDB&v1=${encodeURIComponent("and ((AreaID=1) or (AreaID=3)) and (PID=0) and (CONCAT(PName,Tag,ToySn,SName) like '%%') and (CONCAT(PName,Tag,ToySn,SName) like '%" + this.ToySn + "%') Order by ID desc  LIMIT 0,21")}`).then(res => {
        if (res.data) {
          this.PID = res.data[0].ID
          this.dialogVisible = true
        }
      })
      await this.$http.get(`http://api.toysmodel.cn/toyN1.php?function=PicQueryDB&v1=${encodeURIComponent('and ((PID=' + this.PID + ') or (PID=' + this.PID + ')) Order by ID DESC LIMIT 1,50')}`).then(response => {
        this.list = response.data
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.el-dialog {
  .img-list{
    height: 500px;
    overflow: auto;
    .el-image {
      width: 100%;
    }
  }
  .el-image image {
    width: 100%;
  }
}
</style>

