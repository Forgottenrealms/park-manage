<template>
    <div>
        <head-top></head-top>
        <section class="data_section">
            <header class="section_title">数据统计</header>
            <el-row :gutter="20" style="margin-bottom: 10px">
                <el-col :span="4"
                    ><div class="data_list today_head">
                        <span class="data_num head">当日数据：</span>
                    </div></el-col
                >
                <el-col :span="4"
                    ><div class="data_list">
                        <span class="data_num">{{ userCount }}</span> 临时车辆
                    </div></el-col
                >
                <el-col :span="4"
                    ><div class="data_list">
                        <span class="data_num">{{ orderCount }}</span> 新增车主
                    </div></el-col
                >
                <el-col :span="4"
                    ><div class="data_list">
                        <span class="data_num">{{ adminCount }}</span> 新增车位
                    </div></el-col
                >
            </el-row>
            <el-row :gutter="20">
                <el-col :span="4"
                    ><div class="data_list all_head">
                        <span class="data_num head">总数据：</span>
                    </div></el-col
                >
                <el-col :span="4"
                    ><div class="data_list">
                        <span class="data_num">{{ allUserCount }}</span>
                        空余临时车位
                    </div></el-col
                >
                <el-col :span="4"
                    ><div class="data_list">
                        <span class="data_num">{{ allOrderCount }}</span>
                        剩余车位
                    </div></el-col
                >
                <el-col :span="4"
                    ><div class="data_list">
                        <span class="data_num">{{ allAdminCount }}</span> 车主
                    </div></el-col
                >
            </el-row>
        </section>
    </div>
</template>

<script>
import headTop from "../components/headTop";
export default {
    data() {
        return {
            userCount: 20,
            orderCount: 2,
            adminCount: 0,
            allUserCount: 55,
            allOrderCount: 238,
            allAdminCount: 113,
            sevenDay: [],
            sevenDate: [[], [], []],
        };
    },
    components: {
        headTop,
    },
    mounted() {},
    computed: {},
    methods: {},
};
</script>

<style lang="less">
@import "../style/mixin";
.data_section {
    padding: 20px;
    margin-bottom: 40px;
    .section_title {
        text-align: center;
        font-size: 30px;
        margin-bottom: 10px;
    }
    .data_list {
        text-align: center;
        font-size: 14px;
        color: #666;
        border-radius: 6px;
        background: #e5e9f2;
        .data_num {
            color: #333;
            font-size: 26px;
        }
        .head {
            border-radius: 6px;
            font-size: 22px;
            padding: 4px 0;
            color: #fff;
            display: inline-block;
        }
    }
    .today_head {
        background: #ff9800;
    }
    .all_head {
        background: #20a0ff;
    }
}
.wan {
    .sc(16px, #333);
}
</style>
