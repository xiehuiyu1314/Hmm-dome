<template>
  <div class="login">
    <div class="left">
      <div class="title">
        <img src="@/assets/images/11.png" alt />
        <span>黑马面面</span>
        <span>|</span>
        <span>用户登录</span>
      </div>
      <!-- 表单 -->
      <el-form class="form" :model="form" :rules="rules" ref="form">
        <el-form-item prop="phone">
          <el-input v-model="form.phone" prefix-icon="el-icon-user" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            prefix-icon="el-icon-lock"
            show-password
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-row>
            <el-col :span="16">
              <el-input v-model="form.code" prefix-icon="el-icon-key" placeholder="请输入验证码"></el-input>
            </el-col>
            <el-col :span="8">
              <img :src="codeImg" @click="code" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="key">
          <el-checkbox v-model="form.key">
            我已阅读并同意
            <el-link type="primary" :underline="false">用户协议</el-link>和
            <el-link type="primary" :underline="false">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button class="btn" type="primary" @click="submit">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-button class="btn" type="primary" @click="model">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="right">
      <img src="@/assets/images/login_banner_ele.png" />
    </div>
    <!-- 模态框 -->
    <model ref="model" />>
  </div>
</template>

<script>
import model from "@/views/login/model/model.vue";
import { login } from "@/api/login.js";
import { setToken, getToken } from "@/utils/token.js";
export default {
  components: {
    model
  },
  data() {
    return {
      codeImg: process.env.VUE_APP_URL + "/captcha?type=login",
      form: {
        phone: "",
        password: "",
        code: "",
        key: ""
      },
      rules: {
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
        key: [
          { required: true, message: "请勾选用户协议", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (value === true) {
                callback();
              } else {
                callback("请勾选选协议");
              }
            },
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    //注册
    submit() {
      this.$refs.form.validate(data => {
        if (data) {
          login(this.form).then(res => {
            //设置token就完事了
            setToken(res.data.token);
            this.$router.push("/home");
          });
        }
      });
    },
    //刷新验证码
    code() {
      this.codeImg =
        process.env.VUE_APP_URL + "/captcha?type=login&t=" + Date.now();
    },
    model() {
      this.$refs.model.dialogFormVisible = true;
    }
  },
  //有token不用登陆，直接去home首页
  created() {
    if (getToken()) {
      this.$router.push("/home");
    }
  }
};
</script>

<style lang="less">
.login {
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  .left {
    width: 478px;
    height: 550px;
    padding: 40px;
    background: rgba(245, 245, 245, 1);
    .title {
      display: flex;
      align-items: center;
      img {
        width: 22px;
        height: 17px;
        margin-right: 8px;
      }
      span {
        margin: 0 5px;
      }
      span:nth-of-type(1) {
        font-size: 24px;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
      }
      span:nth-of-type(2) {
        font-size: 24px;
        color: #ccc;
      }
      span:nth-of-type(3) {
        font-size: 22px;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
      }
    }
    .form {
      margin-top: 20px;
      img {
        width: 100%;
        height: 40px;
      }
      .btn {
        width: 100%;
      }
    }
  }
  .right {
    img {
      width: 100%;
    }
  }
}
</style>