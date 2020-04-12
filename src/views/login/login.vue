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
      <el-form class="form" :model="form">
        <el-form-item>
          <el-input v-model="form.phone" prefix-icon="el-icon-user" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="form.password"
            prefix-icon="el-icon-lock"
            show-password
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-row>
            <el-col :span="16">
              <el-input v-model="form.code" prefix-icon="el-icon-key" placeholder="请输入验证码"></el-input>
            </el-col>
            <el-col :span="8">
              <img src="@/assets/images/login_banner_ele.png" alt />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-checkbox>
            我已阅读并同意
            <el-link type="primary" :underline="false">用户协议</el-link>和
            <el-link type="primary" :underline="false">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button class="btn" type="primary">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-button class="btn" type="primary">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="right">
      <img src="@/assets/images/login_banner_ele.png" alt />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        phone: "",
        password: ""
      }
    };
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