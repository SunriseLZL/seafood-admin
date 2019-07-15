<template>
    <div class="container">
        <el-card class="box-card">
            <el-row>
                <el-col :span="4">
                    <el-button type="primary" @click="getOrderList">刷新</el-button>
                </el-col>
                <el-col :span="20" style="text-align: right">
                    <el-pagination
                            background
                            layout="prev, pager, next"
                            @current-change="handleCurrentChange"
                            :total="total">
                    </el-pagination>
                </el-col>
            </el-row>
            <el-row>
                <el-table
                        :data="tableData"
                        v-loading="loading"
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
                            <span :class="{'red':scope.row.statusDesc === '未付款','green':scope.row.statusDesc === '已付款'}">{{scope.row.statusDesc}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            width="300"
                            label="收货地址">
                        <template slot-scope="scope">
                            <span>{{scope.row.addressArea+scope.row.addressDetail}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="orderNote"
                            label="备注">
                    </el-table-column>
                    <el-table-column
                            prop="createTime"
                            label="创建时间">
                        <template slot-scope="scope">
                            <p>{{formatDate(scope.row.createTime)}}</p>
                        </template>
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
                timer: null,
                loading: false,
                total: 0,
                tableData: [],
                viewData: []
            };
        },
        methods: {
            async getOrderList() {
                this.loading = true;
                const res = await orderList({
                    ...this.form
                });
                if (!!res) {
                    this.tableData = res.data.list;
                    this.total = res.data.count;
                }
                this.loading = false;
            },
            formatDate(date) {
                return moment(date).format(`YYYY-MM-DD HH:mm:ss`)
            },
            view(params) {
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
            this.timer = setInterval(() => {
                this.getOrderList();
            }, 10000)
        },

        destroy() {
            if (this.timer) {
                clearInterval(this.timer);
            }
        },

        beforeDestroy() {
            if (this.timer) {
                clearInterval(this.timer);
            }
        }
    };
</script>

<style lang="scss" scoped>
    .container {
        padding: 24px;
    }

    .red {
        color: red;
        font-weight: bold;
    }

    .green {
        color: green;
        font-weight: bold;
    }
</style>
