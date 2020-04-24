<template>
    <el-dialog
        :visible.sync="dialogVisible"
        align="center"
        width="60%"
    >
        <div slot="title">
            <div class="header">
                玩具详情
                <el-button :disabled="!showDownload" class="down" type="success" @click="down">一键下载素材</el-button>
            </div>
        </div>
        <div v-loading="loading">
            <iframe id="iframe" :src="src" frameborder="0" @load="load"></iframe>
        </div>
    </el-dialog>
</template>
<script>
import fs from 'fs';
import http from 'http';
import { imgUrl } from '@/apiUrl';
import $ from 'jquery';
export default {
    props: {
        src: {
            default: ''
        }
    },
    watch: {
        'src': function() {
            this.loading = true;
        }
    },
    data() {
        return {
            dialogVisible: false,
            showDownload: false,
            PID: '',
            ToySn: '',
            list: [],
            loading: true
        };
    },
    created() {
        fs.mkdir(`download`, function(error) {
            if (error) {
                console.log(error);
                return false;
            }
            console.log('创建目录成功');
        });
    },
    methods: {
        load(e) {
            this.loading = false;
            // 隐藏手机号码和QQ号
            const content = $(document.getElementById('iframe').contentWindow.document.body).find('.span_left');
            content.children().each((index, item) => {
                if ($(item).text().indexOf('电话') !== -1 || $(item).text().indexOf('QQ') !== -1) {
                    $(item).remove();
                }
            });
        },
        down() {
            console.log(fs);
            fs.mkdir('download/' + this.ToySn, (error) => {
                if (error) {
                    console.log(error);
                }
                console.log('创建目录成功');
                this.list.forEach(async (item, index) => {
                    let _imgurl = `${imgUrl}${item.Path}/${item.FName}`;
                    console.log(_imgurl);
                    await this.saveImg(_imgurl, item.FName);
                });
            });
        },
        saveImg(_imgurl, fileName) {
            const _this = this;
            http.get(_imgurl, function (req, res) {
                let imgData = '';
                req.on('data', function (chunk) {
                    imgData += chunk;
                });
                req.setEncoding('binary');
                req.on('end', function () {
                    fs.writeFile(`./download/${_this.ToySn}/${fileName}`, imgData, 'binary', (error) => {
                        console.log(error);
                    });
                });
            });
        },
        async searchPic() {
            this.list = [];
            await this.$http.get(`http://api.toysmodel.cn/toyN1.php?function=PicQuerySumDB&v1=${encodeURIComponent("and ((AreaID=1) or (AreaID=3)) and (PID=0) and (CONCAT(PName,Tag,ToySn,SName) like '%%') and (CONCAT(PName,Tag,ToySn,SName) like '%" + this.ToySn + "%') Order by ID desc  LIMIT 0,21")}`).then(res => {
                if (res.data) {
                    this.PID = res.data[0].ID;
                }
            });
            await this.$http.get(`http://api.toysmodel.cn/toyN1.php?function=PicQueryDB&v1=${encodeURIComponent('and ((PID=' + this.PID + ') or (PID=' + this.PID + ')) Order by ID DESC LIMIT 1,50')}`).then(response => {
                this.list = response.data;
                this.showDownload = true;
            });
        },
    }
};
</script>
<style lang="scss" scoped>
.el-dialog {
  iframe {
    width: 100%;
    height: 600px;
  }
  .header {
    line-height: 42px;
    position: relative;
    .down{
      position: absolute;
      top: 0;
      right: 30px;
    }
  }
}
</style>
