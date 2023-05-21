<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="name" label="姓名" width="180">
                </el-table-column>
                <el-table-column prop="carNum" label="车牌号" width="180">
                </el-table-column>
                <el-table-column prop="phone" label="联系电话" width="180">
                </el-table-column>
                <el-table-column prop="id" label="车位编号"> </el-table-column>
            </el-table>
            <div class="Pagination" style="text-align: left; margin-top: 10px">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="20"
                    layout="total, prev, pager, next"
                    :total="count"
                >
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import headTop from "../components/headTop";
export default {
    data() {
        return {
            tableData: [],
            offset: 0,
            limit: 20,
            count: 100,
            currentPage: 1,
        };
    },
    components: {
        headTop,
    },
    created() {
        this.getAdmin();
    },
    methods: {
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.offset = (val - 1) * this.limit;
            this.getAdmin();
        },
        async getAdmin() {
            try {
                this.tableData = [];
                for (let i = 1; i < 100; i++) {
                    const tableData = {};
                    tableData.id = i;
                    tableData.name = "车主" + i;
                    tableData.phone = "18732739472";
                    tableData.carNum = this.getPlate();
                    this.tableData.push(tableData);
                }
            } catch (err) {
                console.log("获取数据失败", err);
            }
        },
        // 生成随机车牌
        getPlate(total = 5) {
            let stateList = "川";
            let charList = "ABCDEFGHJKLMNQPRSTUVWXYZ";
            let numList = "1234567890";
            let halfList = [charList, numList];
            let state = this.dicingChar(stateList);
            let city = this.dicingChar(charList);
            let sequence = "";
            while (total--) {
                sequence += this.dicingChar(
                    halfList[Math.round(Math.random())]
                );
            }
            return `${state}${city} ${sequence}`;
        },
        dicingChar(series) {
            return series[~~(Math.random() * series.length)];
        },
    },
};
</script>

<style lang="less">
@import "../style/mixin";
.table_container {
    padding: 20px;
}
</style>
