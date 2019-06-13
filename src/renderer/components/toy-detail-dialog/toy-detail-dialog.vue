<template>
    <el-dialog
        :visible.sync="dialogVisible"
        width="600px"
    >
        <span slot="title">玩具详情111</span>
        <iframe :src="src" frameborder="0"></iframe>

        <el-button @click="down">一键下载素材</el-button>
    </el-dialog>
</template>
<script>
import fs from 'fs';
import http from 'http';
import { imgUrl } from '@/apiUrl';
export default {
    props: {
        src: {
            default: ''
        }
    },
    data() {
        return {
            dialogVisible: false,
            PID: '',
            ToySn: '',
            list: []
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
        down() {
            console.log(fs);
            const _this = this;
            fs.mkdir('./download/' + _this.ToySn, function(error) {
                if (error) {
                    console.log(error);
                    return false;
                }
                console.log('创建目录成功');
                _this.list.forEach((item, index) => {
                    let _imgurl = `${imgUrl}${item.Path}/${item.FName}`;

                    _this.saveImg(_imgurl, item.FName);
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

                    });
                });
            });
        },
        async searchPic() {
            this.list = [];
            await this.$http.get(`http://api.toysmodel.cn/toyN1.php?function=PicQuerySumDB&v1=${encodeURIComponent("and ((AreaID=1) or (AreaID=3)) and (PID=0) and (CONCAT(PName,Tag,ToySn,SName) like '%%') and (CONCAT(PName,Tag,ToySn,SName) like '%" + this.ToySn + "%') Order by ID desc  LIMIT 0,21")}`).then(res => {
                if (res.data) {
                    this.PID = res.data[0].ID;
                    this.dialogVisible = true;
                }
            });
            await this.$http.get(`http://api.toysmodel.cn/toyN1.php?function=PicQueryDB&v1=${encodeURIComponent('and ((PID=' + this.PID + ') or (PID=' + this.PID + ')) Order by ID DESC LIMIT 1,50')}`).then(response => {
                this.list = response.data;
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
}
</style>

