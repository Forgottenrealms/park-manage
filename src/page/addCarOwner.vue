<template>
    <div>
        <head-top></head-top>
        <el-row style="margin-top: 20px">
            <el-col :span="14" :offset="4">
                <el-form
                    :model="ownerForm"
                    :rules="foodrules"
                    ref="ownerForm"
                    label-width="110px"
                    class="form food_form"
                >
                    <el-form-item label="车主姓名" prop="name">
                        <el-input v-model="ownerForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="车牌号" prop="carNum">
                        <el-input v-model="ownerForm.carNum"></el-input>
                    </el-form-item>
                    <el-form-item label="车主电话" prop="phone">
                        <el-input v-model="ownerForm.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="车位编号" prop="parkId">
                        <el-input v-model="ownerForm.parkId"></el-input>
                    </el-form-item>
                    <el-form-item label="上传车辆图片">
                        <el-upload
                            class="avatar-uploader"
                            :action="baseUrl + '/v1/addimg/food'"
                            :show-file-list="false"
                            :on-success="uploadImg"
                            :before-upload="beforeImgUpload"
                        >
                            <img
                                v-if="ownerForm.image_path"
                                :src="baseImgPath + ownerForm.image_path"
                                class="avatar"
                            />
                            <i
                                v-else
                                class="el-icon-plus avatar-uploader-icon"
                            ></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="addFood('ownerForm')"
                            >确认添加</el-button
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
            baseUrl,
            baseImgPath,
            ownerForm: {
                name: "",
                carNum: "",
                phone: "",
                parkId: "",
                image_path: "",
            },
            foodrules: {
                name: [
                    {
                        required: true,
                        message: "请输入车主姓名",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    components: {
        headTop,
    },
    created() {},
    methods: {
        uploadImg(res, file) {
            if (res.status == 1) {
                this.ownerForm.image_path = res.image_path;
            } else {
                this.$message.error("上传图片失败！");
            }
        },
        beforeImgUpload(file) {
            const isRightType =
                file.type === "image/jpeg" || file.type === "image/png";
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isRightType) {
                this.$message.error("上传图片只能是 JPG 格式!");
            }
            if (!isLt2M) {
                this.$message.error("上传图片大小不能超过 2MB!");
            }
            return isRightType && isLt2M;
        },
        addFood(ownerForm) {
            this.$refs[ownerForm].validate(async (valid) => {
                if (valid) {
                    const params = {
                        ...this.ownerForm
                    };
                    this.$message({
                        type: "success",
                        message: "添加成功",
                    });
                    this.ownerForm = {
                        name: "",
                        carNum: "",
                        phone: "",
                        parkId: "",
                        image_path: "",
                    };
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
.form {
    min-width: 400px;
    margin-bottom: 30px;
    &:hover {
        box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
            0 2px 4px 0 rgba(232, 237, 250, 0.5);
        border-radius: 6px;
        transition: all 400ms;
    }
}
.food_form {
    border: 1px solid #eaeefb;
    padding: 10px 10px 0;
}
.form_header {
    text-align: center;
    margin-bottom: 10px;
}
.category_select {
    border: 1px solid #eaeefb;
    padding: 10px 30px 10px 10px;
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
}
.add_category_row {
    height: 0;
    overflow: hidden;
    transition: all 400ms;
    background: #f9fafc;
}
.showEdit {
    height: 185px;
}
.add_category {
    background: #f9fafc;
    padding: 10px 30px 0px 10px;
    border: 1px solid #eaeefb;
    border-top: none;
}
.add_category_button {
    text-align: center;
    line-height: 40px;
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
    border: 1px solid #eaeefb;
    border-top: none;
    transition: all 400ms;
    &:hover {
        background: #f9fafc;
        span,
        .edit_icon {
            color: #20a0ff;
        }
    }
    span {
        .sc(14px, #999);
        transition: all 400ms;
    }
    .edit_icon {
        color: #ccc;
        transition: all 400ms;
    }
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
.cell {
    text-align: center;
}
</style>
