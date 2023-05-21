<template>
    <div>
        <head-top></head-top>
        <el-row style="margin-top: 20px">
            <el-col :span="12" :offset="4">
                <el-form
                    :model="formData"
                    ref="formData"
                    label-width="110px"
                    class="demo-formData"
                >
                    <el-form-item label="上传车位图片">
                        <input
                            accept="image/*"
                            type="file"
                            name="source_image"
                            id="source_image"
                            value="选择图片"
                            autocomplete="off"
                            style="padding: 4px; width: 170px"
                        />
                        <img
                            id="show_image"
                            style="width: 800px; height: auto"
                        />
                    </el-form-item>
                    <el-form-item class="button_submit">
                        <el-button type="primary" @click="submit()"
                            >立即识别</el-button
                        >
                    </el-form-item>
                </el-form>
                <div class="spinner" hidden>
                    <div class="spinner-container container1">
                        <div class="circle1"></div>
                        <div class="circle2"></div>
                        <div class="circle3"></div>
                        <div class="circle4"></div>
                    </div>
                    <div class="spinner-container container2">
                        <div class="circle1"></div>
                        <div class="circle2"></div>
                        <div class="circle3"></div>
                        <div class="circle4"></div>
                    </div>
                    <div class="spinner-container container3">
                        <div class="circle1"></div>
                        <div class="circle2"></div>
                        <div class="circle3"></div>
                        <div class="circle4"></div>
                    </div>
                </div>
                <el-row
                    v-if="isRequestOver"
                    :gutter="20"
                    style="margin-bottom: 10px"
                >
                    <el-col :span="8"
                        ><div class="data_list today_head">
                            <span class="data_num head">识别结果</span>
                        </div></el-col
                    >
                    <el-col :span="8"
                        ><div class="data_list">
                            共有车位
                            <span class="data_num">{{ totalNum }}</span>
                        </div></el-col
                    >
                    <el-col :span="8"
                        ><div class="data_list">
                            可用车位
                            <span class="data_num">{{ availableNum }}</span>
                        </div></el-col
                    >
                </el-row>
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
                image_path: "",
            },
            baseUrl,
            baseImgPath,
            isRequestOver: false, // 车位识别完成
            totalNum: 0, // 所有车位
            availableNum: 0, // 可用车位
        };
    },
    components: {
        headTop,
    },
    mounted() {
        document.getElementById("source_image").onchange = function () {
            if (this.files.length > 0) {
                let the_type = this.files[0].type;
                if (the_type != "image/jpeg" && the_type != "image/png") {
                    this.value = "";
                    this.$message.error("请选择格式为jpeg,jpg,png的图片！");
                    return false;
                } else if (this.files[0].size > 1024 * 1024 * 1) {
                    this.value = "";
                    this.$message.error("请选择1M大小以内的图片！");
                    return false;
                }
            } else {
                this.value = "";
                this.$message.error("请选择图片！");
                return false;
            }
            var reader = new FileReader();
            reader.readAsDataURL(this.files[0]);
            reader.onload = function () {
                document.getElementById("show_image").src = reader.result;
            };
        };
    },
    methods: {
        handleShopAvatarScucess(res, file) {
            console.warn("res======", res);
            console.warn("file======", file);
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
        submit() {
            let source_image = document.getElementById("source_image");
            if (source_image.files.length > 0) {
                let the_type = source_image.files[0].type;
                if (the_type != "image/jpeg" && the_type != "image/png") {
                    source_image.value = "";
                    this.$message.error("请选择格式为jpeg,jpg,png的图片！");
                    return false;
                } else if (source_image.files[0].size > 1024 * 1024 * 1) {
                    source_image.value = "";
                    this.$message.error("请选择1M大小以内的图片！");
                    return false;
                }
            } else {
                source_image.value = "";
                this.$message.error("请选择图片！");
                return false;
            }
            let formData = new FormData();
            formData.append("source_image", source_image.files[0]);
            this.post(formData);
        },
        post(data) {
            const loading = this.$loading({
                lock: true,
                text: "Loading",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)",
            });
            document.getElementsByClassName("spinner")[0].hidden = false;
            let httpRequest = new XMLHttpRequest();
            httpRequest.open(
                "POST",
                "http://43.143.74.227/identify/parking_identify",
                true
            );
            httpRequest.send(data);
            httpRequest.onreadystatechange = () => {
                if (httpRequest.readyState == 4) {
                    document.getElementsByClassName("spinner")[0].hidden = true;
                    if (httpRequest.status == 200) {
                        let result = JSON.parse(httpRequest.responseText);
                        if (result.code == 0) {
                            document.getElementById("source_image").src =
                                result["identify_image"];
                            this.isRequestOver = true;
                            this.totalNum = result["total"];
                            this.availableNum = result["available"];
                        } else {
                            this.$message.error("车位识别失败！");
                        }
                    }
                }
                loading.close();
            };
            httpRequest.onerror = () => {
                this.$message.error("车位识别失败！");
                this.isRequestOver = false;
                loading.close();
            };
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
    width: 500px;
    height: auto;
    display: block;
}
.el-table .info-row {
    background: #c9e5f5;
}

.el-table .positive-row {
    background: #e2f0e4;
}

.data_list {
    text-align: center;
    font-size: 14px;
    color: #666;
    border-radius: 6px;
    background: #e5e9f2;
    padding: 10px;
    width: auto;
    height: auto;
    .data_num {
        color: #333;
        font-size: 26px;
        white-space: nowrap;
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
</style>
