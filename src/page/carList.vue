<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form
                            label-position="left"
                            inline
                            class="demo-table-expand"
                        >
                            <el-form-item label="车位编号">
                                <span>{{ props.row.id }}</span>
                            </el-form-item>
                            <el-form-item label="车位分区">
                                <span>{{ props.row.area }}</span>
                            </el-form-item>
                            <el-form-item label="车位计费">
                                <span>{{ props.row.recent_order_num }}</span>
                            </el-form-item>
                            <el-form-item label="车主姓名">
                                <span>{{ props.row.name }}</span>
                            </el-form-item>
                            <el-form-item label="车牌号">
                                <span>{{ props.row.carNum }}</span>
                            </el-form-item>
                            <el-form-item label="联系电话">
                                <span>{{ props.row.phone }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column label="车位编号" prop="id"> </el-table-column>
                <el-table-column label="车位分区" prop="area">
                </el-table-column>
                <el-table-column label="车位计费" prop="recent_order_num">
                </el-table-column>
                <el-table-column label="是否空闲" prop="isFree">
                </el-table-column>
                <el-table-column label="车牌号" prop="carNum">
                </el-table-column>
                <el-table-column label="车主姓名" prop="name">
                </el-table-column>
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)"
                            >编辑</el-button
                        >
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)"
                            >删除</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
            <div class="Pagination">
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
            <el-dialog title="修改店铺信息" v-model="dialogFormVisible">
                <el-form :model="selectTable">
                    <el-form-item label="车主姓名" label-width="100px">
                        <el-input
                            v-model="selectTable.name"
                            auto-complete="off"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="车牌号" label-width="100px">
                        <el-input v-model="selectTable.carNum"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话" label-width="100px">
                        <el-input v-model="selectTable.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="车辆图片" label-width="100px">
                        <el-upload
                            class="avatar-uploader"
                            :action="baseUrl + '/v1/addimg/shop'"
                            :show-file-list="false"
                            :on-success="handleServiceAvatarScucess"
                            :before-upload="beforeAvatarUpload"
                        >
                            <img
                                v-if="selectTable.image_path"
                                :src="baseImgPath + selectTable.image_path"
                                class="avatar"
                            />
                            <i
                                v-else
                                class="el-icon-plus avatar-uploader-icon"
                            ></i>
                        </el-upload>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false"
                        >取 消</el-button
                    >
                    <el-button type="primary" @click="updateShop"
                        >确 定</el-button
                    >
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import headTop from "../components/headTop";
import { baseUrl, baseImgPath } from "@/config/env";
import { searchplace } from "@/api/getData";
export default {
    data() {
        return {
            baseUrl,
            baseImgPath,
            city: {},
            offset: 0,
            limit: 20,
            tableData: [],
            currentPage: 1,
            selectTable: {},
            dialogFormVisible: false,
            categoryOptions: [],
            address: {},
        };
    },
    created() {
        this.initData();
        console.log(11111);
    },
    components: {
        headTop,
    },
    computed: {
        count() {
            return this.tableData.length;
        },
    },
    methods: {
        async initData() {
            try {
                this.getResturants();
            } catch (err) {
                console.log("获取数据失败", err);
            }
        },
        async getResturants() {
            // const {latitude, longitude} = this.city;
            // const restaurants = await getResturants({latitude, longitude, offset: this.offset, limit: this.limit});
            this.tableData = [];
            for (let i = 1; i < 100; i++) {
                const tableData = {};
                tableData.id = i;
                tableData.area =
                    i < 25 ? "A区" : i < 50 ? "B区" : i < 75 ? "C区" : "D区";
                tableData.name = "车主" + i;
                tableData.phone = "18732739472";
                tableData.recent_order_num = Math.round(Math.random() * 100);
                tableData.isFree = Math.random() > 0.5 ? "是" : "否";
                tableData.carNum = this.getPlate();
                this.tableData.push(tableData);
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
        // 获取姓名
        genNickName(len) {
            let name = "";
            for (let i = 0; i < len; i++) {
                let unicodeNum = "";
                unicodeNum = this.randomAccess(0x4e00, 0x9fa5).toString(16);
                name += this.decodeUnicode(unicodeNum);
            }
            return name;
        },
        // 获取指定范围内的随机数
        randomAccess(min, max) {
            return Math.floor(Math.random() * (min - max) + max);
        },
        // 解码
        decodeUnicode(str) {
            //Unicode显示方式是|u4e00
            str = "\\u" + str;
            str = str.replace(/\\/g, "%");
            //转换中文
            str = unescape(str);
            //将其他受影响的转换回原来
            str = str.replace(/%/g, "\\");
            return str;
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.offset = (val - 1) * this.limit;
            this.getResturants();
        },
        handleEdit(index, row) {
            this.selectTable = row;
            this.address.address = row.address;
            this.dialogFormVisible = true;
        },
        async handleDelete(index, row) {
            try {
                this.$message({
                    type: "success",
                    message: "删除店铺成功",
                });
                this.tableData.splice(index, 1);
            } catch (err) {
                this.$message({
                    type: "error",
                    message: "删除店铺失败",
                });
                console.log("删除店铺失败");
            }
        },
        handleServiceAvatarScucess(res, file) {
            if (res.status == 1) {
                this.selectTable.image_path = res.image_path;
            } else {
                this.$message.error("上传图片失败！");
            }
        },
        beforeAvatarUpload(file) {
            const isRightType =
                file.type === "image/jpeg" || file.type === "image/png";
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isRightType) {
                this.$message.error("上传头像图片只能是 JPG 格式!");
            }
            if (!isLt2M) {
                this.$message.error("上传头像图片大小不能超过 2MB!");
            }
            return isRightType && isLt2M;
        },
        async updateShop() {
            this.dialogFormVisible = false;
            try {
                this.$message({
                    type: "success",
                    message: "更新车位信息成功",
                });
            } catch (err) {
                console.log("更新车位信息失败", err);
            }
        },
    },
};
</script>

<style lang="less">
@import "../style/mixin";
.demo-table-expand {
    font-size: 0;
}
.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}
.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}
.table_container {
    padding: 20px;
}
.Pagination {
    display: flex;
    justify-content: flex-start;
    margin-top: 8px;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
}
.avatar {
    width: 120px;
    height: 120px;
    display: block;
}
</style>
