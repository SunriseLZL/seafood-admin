<template>
    <div class="container">
        <el-card class="box-card">
            <el-row style="text-align: right">
                <el-pagination
                        background
                        layout="prev, pager, next"
                        @current-change="handleCurrentChange"
                        :total="total">
                </el-pagination>
            </el-row>
            <el-row>
                <el-table
                        :data="tableData"
                        style="width: 100%;margin-top:20px">
                    <el-table-column
                            prop="orderCode"
                            label="订单号">
                    </el-table-column>
                    <el-table-column
                            label="联系人/电话">
                        <template slot-scope="scope">
                            <span>{{scope.row.name}}/{{scope.row.mobile}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="goodsTotal"
                            label="商品总价">
                    </el-table-column>
                    <el-table-column
                            prop="statusDesc"
                            label="订单状态">
                        <template slot-scope="scope">
                            <span :class="{'red':scope.row.statusDesc === '未付款'}">{{scope.row.statusDesc}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            width="500"
                            label="收货地址">
                        <template slot-scope="scope">
                            <span>{{scope.row.addressArea+scope.row.addressDetail}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="createTime"
                            label="创建时间">
                    </el-table-column>
                    <el-table-column
                            label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" size="mini" @click="view(scope.row.orderGoods)">查看详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
        </el-card>
        <el-dialog
                title="详情"
                :visible.sync="detailView"
                width="600">
            <el-table
                    :data="viewData"
                    style="width: 100%">
                <el-table-column
                        prop="orderId"
                        label="订单号">
                </el-table-column>
                <el-table-column
                        prop="title"
                        label="商品名">
                </el-table-column>
                <el-table-column
                        prop="photo"
                        label="图片">
                    <template slot-scope="scope">
                        <img :src="scope.row.photo" style="width: 100px;height: 100px">
                    </template>
                </el-table-column>
                <el-table-column
                        prop="goodsBuyNum"
                        label="数量">
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="detailView = false">取 消</el-button>
                <el-button type="primary" @click="">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {orderList} from '@/api/source.js';

    export default {
        name: 'Order',
        data() {
            return {
                form: {
                    current: 1,
                    size: 10
                },
                ruleForm: {
                    orderNo: '',
                    time: '',
                    price: ''
                },
                rules: {},
                detailView: false,
                total: 0,
                tableData: [],
                viewData: []
            };
        },
        methods: {
            async getOrderList() {
                const res = await orderList({
                    ...this.form
                });
                if (!!res) {
                    this.tableData = res.data.list;
                    this.total = res.data.count
                }
            },
            view(params) {
                console.log(params)
                this.viewData = params;
                this.detailView = true
            },
            handleCurrentChange(val) {
                this.form.current = val;
                this.getOrderList()
            }
        },
        mounted() {
            this.getOrderList();
        }
    };
</script>

<style lang="scss" scoped>
    .container {
        padding: 24px;
    }

    .red {
        color: red;
    }
</style>
