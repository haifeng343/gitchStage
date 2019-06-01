<template>
    <div class="table">
        <el-breadcrumb separator-class="el-icon-arrow-right">
        </el-breadcrumb>
        <div class="container">
            <div class="img-box">
              <img :src="licenseUrl" alt="">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'License',
        data() {
            return {
                licenseUrl: `${localStorage.license}?usertoken=gudi20181212001`
            }
        },
        created() {
        },
        computed: {
        },
        methods: {
        }
    }

</script>

<style scoped lang="less">
    .handle-box {
        margin-bottom: 20px;
    }
    .handle-select {
        width: 120px;
    }
    .img-box{
        text-align: center;
    }
    .handle-input {
        width: 230px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .table{
        width: 100%;
        font-size: 14px;
    }
    .red{
        color: #ff0000;
    }
</style>