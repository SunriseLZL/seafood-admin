<template>
    <div class="container">
        <el-row>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="ruleForm">
                <el-col :span="4">
                    <el-form-item label="订单号" prop="orderNo">
                        <el-input v-model="ruleForm.orderNo"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="下单时间" prop="time">
                        <el-input v-model="ruleForm.time"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="金额" prop="price">
                        <el-input v-model="ruleForm.price"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4" :offset="1">
                    <el-button type="primary">查询</el-button>
                </el-col>
            </el-form>
        </el-row>
        <el-row>
            <el-table
                    :data="tableData"
                    style="width: 100%;margin-top:20px">
                <el-table-column
                        prop="date"
                        label="日期"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="姓名"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="地址">
                </el-table-column>
            </el-table>
        </el-row>


    </div>

</template>

<script>
  export default {
    name: "User",
    data() {
      return {
        ruleForm: {
          orderNo: "",
          time: "",
          price: ""
        },
        rules: {},
        tableData: [{
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }, {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        }, {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        }, {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }]
      };
    },
    methods: {},
  };
</script>

<style lang="scss" scoped>
    .container {
        padding: 24px;
    }
</style>
