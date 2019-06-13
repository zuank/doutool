<template>
    <el-dialog
        title="玩具详情"
        :visible.sync="dialogVisible"
        width="600px"
    >
        <iframe :src="src" frameborder="0"></iframe>
    </el-dialog>
</template>
<script>
export default {
    props: {
        src: {
            default: '',
            type: String
        }
    },
    data() {
        return {
            dialogVisible: false
        };
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

