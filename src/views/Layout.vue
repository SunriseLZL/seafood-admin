<template>
    <div class="layout">
        <div class="menu-box">
            <div class="logo">后台管理系统</div>
            <el-menu
                    default-active="2"
                    class="el-menu-vertical"
                    background-color="#051423"
                    text-color="#CCC"
                    :router="true"
                    :default-active="currentPath"
                    active-text-color="#fff">
                <el-menu-item index="/order">
                    <i class="el-icon-eleme"></i>
                    <span slot="title">订单查询</span>
                </el-menu-item>
                <el-menu-item index="/store">
                    <i class="el-icon-goods"></i>
                    <span slot="title">商品查询</span>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="main-container">
            <div class="box">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Layout",
        computed: {
            currentPath() {
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
                return this.$route.path;
            }
        }
    };
</script>

<style lang="scss" scoped>
    .layout {
        height: 100%;
        width: 100%;
        position: relative;
        display: flex;
    }

    .logo {
        width: 200px;
        height: 40px;
        background-color: #051423;
        color: #ffffff;
        text-align: center;
        line-height: 40px;
        font-size: 20px;
        font-weight: bold;
    }

    .el-menu-vertical {
        height: 100%;

        /deep/ .el-submenu__title:hover {
            background: rgba(35, 135, 230, 0.1) !important;
            color: #2387E6 !important;
        }

        /deep/ .el-menu-item:hover {
            background: #2387E6 !important;
            color: #ffffff !important;
        }

        /deep/ .el-menu-item.is-active {
            background: #2387E6 !important;
            color: #ffffff !important;
        }
    }

    .menu-box {
        width: 200px;
        height: calc(100% - 40px);
    }

    .main-container {
        height: 100%;
        overflow: auto;
        -webkit-transition: margin-left .3s ease-in-out;
        transition: margin-left .3s ease-in-out;
        position: relative;
        flex: 1;
        background-color: #f4f4f4;
    }

    .box {
        min-width: 1366px;
        background-color: #f4f4f4;
    }

    .el-menu-vertical {
        /deep/ .el-submenu__title:hover {
            background: rgba(35, 135, 230, 0.1) !important;
            color: #2387E6 !important;
        }

        /deep/ .el-menu-item:hover {
            background: #2387E6 !important;
            color: #ffffff !important;
        }

        /deep/ .el-menu-item.is-active {
            background: #2387E6 !important;
            color: #ffffff !important;
        }
    }
</style>
