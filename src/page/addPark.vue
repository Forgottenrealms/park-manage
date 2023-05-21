<template>
    <div>
        <head-top></head-top>
        <el-row style="margin-top: 20px">
            <el-col :span="12" :offset="4">
                <el-form
                    :model="formData"
                    :rules="rules"
                    ref="formData"
                    label-width="110px"
                    class="demo-formData"
                >
                    <el-form-item label="车位编号" prop="name">
                        <el-input v-model="formData.name"></el-input>
                    </el-form-item>
                    <el-form-item label="车位分区">
                        <el-cascader
                            :options="areaOptions"
                            v-model="selectedArea"
                            change-on-select
                        ></el-cascader>
                    </el-form-item>
                    <el-form-item
                        label="小时计费"
                        prop="float_minimum_order_amount"
                    >
                        <el-input-number
                            v-model="formData.float_minimum_order_amount"
                            :min="0"
                            :max="100"
                        ></el-input-number>
                    </el-form-item>
                    <el-form-item label="是否空闲" style="white-space: nowrap">
                        <el-switch
                            on-text=""
                            off-text=""
                            v-model="formData.is_premium"
                        ></el-switch>
                    </el-form-item>

                    <el-form-item label="上传车位图片">
                        <el-upload
                            class="avatar-uploader"
                            :action="baseUrl + '/v1/addimg/shop'"
                            :show-file-list="false"
                            :on-success="handleShopAvatarScucess"
                            :before-upload="beforeAvatarUpload"
                        >
                            <img
                                v-if="formData.image_path"
                                :src="baseImgPath + formData.image_path"
                                class="avatar"
                            />
                            <i
                                v-else
                                class="el-icon-plus avatar-uploader-icon"
                            ></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item class="button_submit">
                        <el-button
                            type="primary"
                            @click="submitForm('formData')"
                            >立即创建</el-button
                        >
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import headTop from "@/components/headTop";
import { baseUrl, baseImgPath } from "@/config/env";
export default {
    data() {
        return {
            formData: {
                name: "", //店铺名称
                float_minimum_order_amount: 20, //起价
                is_premium: true,
                image_path: "",
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入车位编号",
                        trigger: "blur",
                    },
                ],
            },
            baseUrl,
            baseImgPath,
            areaOptions: [
                {
                    label: "A区",
                },
                {
                    label: "B区",
                },
                {
                    label: "C区",
                },
                {
                    label: "D区",
                },
                {
                    label: "E区",
                },
            ],
            selectedArea: ["A区"],
        };
    },
    components: {
        headTop,
    },
    mounted() {},
    methods: {
        handleShopAvatarScucess(res, file) {
            if (res.status == 1) {
                this.formData.image_path = res.image_path;
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
        submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    try {
                        this.$message({
                            type: "success",
                            message: "添加成功",
                        });
                        this.formData = {
                            name: "", //店铺名称
                            float_minimum_order_amount: 20, //起价
                            is_premium: true,
                            image_path: "",
                        };
                    } catch (err) {
                        console.log(err);
                    }
                } else {
                    this.$notify.error({
                        title: "错误",
                        message: "请检查输入是否正确",
                        offset: 100,
                    });
                    return false;
                }
            });
        },
    },
};
</script>

<style lang="less">
@import "../style/mixin";
.button_submit {
    text-align: center;
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
.el-table .info-row {
    background: #c9e5f5;
}

.el-table .positive-row {
    background: #e2f0e4;
}
</style>
