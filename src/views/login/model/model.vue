<template>
  <div class="model">
    <el-dialog width="600px" :visible.sync="dialogFormVisible">
      <div class="title" slot="title">用户注册</div>
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="70px">
        <el-form-item label="头像" prop="avatar">
          <el-upload
            name="image"
            class="avatar-uploader upload"
            :action="url"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="昵称" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="图形码" prop="code">
          <el-row>
            <el-col :span="16">
              <el-input v-model="form.code"></el-input>
            </el-col>
            <el-col :span="7" :offset="1">
              <img :src="codeImg" @click="loadImg" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="验证码" prop="rcode">
          <el-row>
            <el-col :span="16">
              <el-input v-model="form.rcode"></el-input>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-button @click="rcode">获取用户验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item class="btn">
          <el-button @click="resetForm('ruleForm')">取消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getCode, register } from "@/api/model.js";
export default {
  data() {
    return {
      codeImg: process.env.VUE_APP_URL + "/captcha?type=sendsms",
      url: process.env.VUE_APP_URL + "/uploads",
      imageUrl: "",
      dialogFormVisible: false,
      form: {
        avatar: "", //头像地址注册需要的接口
        touxiang: "",
        username: "",
        phone: "",
        email: "",
        password: "",
        rcode: "",
        code: ""
      },
      rules: {
        // 表单验证
        avatar: [{ required: true, message: "头像要上传哦", trigger: "blur" }],
        username: [{ required: true, message: "请输入昵称", taegger: "blur" }],
        email: [
          { required: true, message: "请输入邮箱", taegger: "blur" },
          {
            validator: (rule, value, callback) => {
              let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
              if (reg.test(value)) {
                callback();
              } else {
                callback("邮箱格式不正确");
              }
            },
            trigger: "change"
          }
        ],
        phone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
              if (reg.test(value)) {
                callback();
              } else {
                callback("手机格式不正确");
              }
            },
            trigger: "change"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "密码长度不够哦",
            trigger: "change"
          }
        ],
        code: [
          { required: true, message: "请输入图形验证码", trigger: "blur" },
          { min: 4, max: 4, message: "请输入4位图形验证码", trigger: "change" }
        ],
        rcode: [
          { required: true, message: "强输入手机验证码", trigger: "blur" },
          { min: 4, max: 4, message: "请输入4位手机验证码", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    //获取手机验证码
    rcode() {
      let flag = true;
      this.$refs.ruleForm.validateField(["code", "phone"], err => {
        if (err) {
          flag = false;
        }
      });
      if (flag) {
        getCode({ code: this.form.code, phone: this.form.phone }).then(res => {
          this.$message.success(res.data.captcha + "");
        });
      }
    },
    //刷新验证码
    loadImg() {
      this.codeImg =
        process.env.VUE_APP_URL + "/captcha?type=sendsms&t=" + Date.now();
    },
    handleAvatarSuccess(res, file) {
      //头像地址注册需要的接口
      this.form.avatar = res.data.file_path;
      this.imageUrl = URL.createObjectURL(file.raw);
      // 头像单独验证
      this.$refs.ruleForm.validateField("avatar");
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          register(this.form).then(() => {
            this.$message.success("注册成功");
            this.dialogFormVisible = false;
          });
        }
      });
    },
    resetForm(formName) {
      this.dialogFormVisible = false;
      this.$refs[formName].resetFields();
    }
  },
  watch: {
    dialogFormVisible(value) {
      if (!value) {
        this.$refs.ruleForm.resetFields();
        this.imageUrl = "";
      }
    }
  }
};
</script>

<style lang="less">
.model {
  .el-dialog__header {
    padding: 0;
  }
  .title {
    height: 53px;
    line-height: 53px;
    text-align: center;
    font-size: 18px;
    font-weight: 400;
    color: rgba(254, 254, 254, 1);
    background: linear-gradient(
      225deg,
      rgba(20, 147, 250, 1),
      rgba(1, 198, 250, 1)
    );
  }
  .upload {
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
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  img {
    width: 100%;
    height: 40px;
  }
  .btn {
    text-align: center;
  }
}
</style>