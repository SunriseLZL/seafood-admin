<template>
    <div class="container">
        <el-card class="box-card">
            <el-button type="primary" @click="addGoods">新增商品</el-button>
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
                            prop="title"
                            label="商品名">
                    </el-table-column>
                    <el-table-column
                            label="图片"
                            width="180">
                        <template slot-scope="scope">
                            <img :src="scope.row.photo" @click="handlePictureCardPreview(scope.row.photo)"
                                 style="width: 100px;height: 100px" alt="">
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="产地">
                    </el-table-column>
                    <el-table-column
                            prop="retailPrice"
                            label="零售价（元）">
                    </el-table-column>
                    <el-table-column
                            prop="wholesalePrice"
                            label="批发价（元）">
                    </el-table-column>
                    <el-table-column
                            prop="createTime"
                            label="创建时间">
                    </el-table-column>
                    <el-table-column
                            prop="updateTime"
                            label="更新时间">
                    </el-table-column>
                    <el-table-column
                            label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                            <el-button type="text" size="mini" @click="handleDel(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
        </el-card>
        <el-dialog
                title="添加/编辑"
                :visible.sync="dialogVisible"
                :close-on-click-modal="false"
                width="600">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="商品名：" prop="title">
                    <el-input v-model="ruleForm.title" style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item label="图片地址：" prop="photo">
                    <el-input v-model="ruleForm.photo" style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item label="库存：" prop="num">
                    <el-input v-model="ruleForm.num" style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item label="批发价：" prop="retailPrice">
                    <el-input v-model="ruleForm.retailPrice" style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item label="零售价：" prop="wholesalePrice">
                    <el-input v-model="ruleForm.wholesalePrice" style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item label="产地：" prop="address">
                    <el-input v-model="ruleForm.address" style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item label="是否轮播：" prop="inBanner">
                    <el-switch
                            v-model="ruleForm.inBanner"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                    </el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleSubmit">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog :visible.sync="preview">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>

<script>
    import {goodsList, goodsEdit, goodsDel} from '@/api/source.js';

    export default {
        name: 'Food',
        data() {
            return {
                form: {
                    current: 1,
                    size: 5
                },
                ruleForm: {
                    id: null,
                    title: '',
                    photo: '',
                    num: 0,
                    wholesalePrice: 0,
                    retailPrice: 0,
                    inBanner: false,
                },
                rules: {},
                dialogImageUrl: '',
                dialogVisible: false,
                preview: false,
                total: 0,
                tableData: []
            };
        },
        methods: {
            addGoods() {
                this.dialogVisible = true;
                this.ruleForm = {
                    id: null,
                    title: '',
                    photo: '',
                    num: 0,
                    wholesalePrice: 0,
                    retailPrice: 0,
                    inBanner: false,
                }
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(url) {
                this.dialogImageUrl = url;
                this.preview = true;
            },
            handleEdit(params) {
                console.log(params);
                this.ruleForm = {...params};
                this.dialogVisible = true
            },
            async handleDel(id) {
                this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    const res = await goodsDel({
                        id
                    });
                    if (!!res) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getGoodsList();
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            async getGoodsList() {
                const res = await goodsList({
                    ...this.form
                });
                if (!!res) {
                    this.tableData = res.data.list;
                    this.total = res.data.count
                }
            },
            handleCurrentChange(val) {
                this.form.current = val;
                this.getGoodsList()
            },
            async handleSubmit() {
                const res = await goodsEdit({
                    ...this.ruleForm
                });
                console.log(res)
                if (!!res) {
                    this.$message.success('添加成功');
                    this.dialogVisible = false;
                    this.getGoodsList();
                }

            }
        },
        mounted() {
            this.getGoodsList();
        }
    };
</script>

<style lang="scss" scoped>
    .container {
        padding: 24px;
    }
</style>
