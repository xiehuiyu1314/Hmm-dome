<template>
  <div class="home">
    <el-container>
      <!-- 头部 -->
      <el-header>
        <div class="left">
          <!-- 点击实现左侧导航栏的动画 -->
          <i class="el-icon-s-fold" @click="isCollapse = !isCollapse"></i>
          <img src="@/assets/images/11.png" alt />
          <span>黑马面面</span>
        </div>
        <div class="right">
          <img v-if="user.avatar" :src="baseURl+'/'+user.avatar" alt />
          <span>{{user.username}}，你好</span>
          <el-button type="primary" size="mini" @click="out">退出</el-button>
        </div>
      </el-header>
      <el-container>
        <!-- 左侧导航栏 -->
        <el-aside width="auto">
          <el-menu
            router
            :default-active="$route.path"
            :collapse="isCollapse"
            class="el-menu-vertical-demo"
          >
            <el-menu-item
              v-for="(item,index) in $router.options.routes[2].children"
              :key="index"
              :index="'/home/'+item.path"
            >
              <i :class="item.meta.icon"></i>
              <span slot="title">{{item.meta.title}}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>

        <!-- 二级路由出口 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { getUser } from "@/api/home.js";
import { removeToken } from "@/utils/token.js";
export default {
  data() {
    return {
      user: "",
      baseURl: process.env.VUE_APP_URL,
      isCollapse: false
    };
  },
  methods: {
    // 退出功能
    out() {
      this.$confirm("是否退出登录", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          this.$message.success("退出成功");
          removeToken();
          this.$router.push("/login");
        })
        .catch(() => {
          this.$message.info("已取消");
        });
    }
  },
  created() {
    //获取用户名和头像
    getUser().then(res => {
      this.user = res.data;
    });
  }
};
</script>

<style lang="less">
.home {
  height: 100%;
  // 左侧导航的动画效果
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

  .el-header {
    height: 60px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
      display: flex;
      align-items: center;
      i {
        font-size: 28px;
      }
      img {
        width: 32px;
        height: 32px;
        margin: 0 10px;
      }
      span {
        font-size: 22px;
        font-weight: bold;
        color: rgba(73, 161, 255, 1);
      }
    }

    .right {
      img {
        width: 43px;
        height: 43px;
      }
      span {
        font-size: 14px;
        font-weight: bold;
        margin: 0 10px;
      }
    }
  }

  .el-container {
    height: 100%;

    .el-aside {
      width: 201px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);
    }
    .el-main {
      background: rgba(232, 233, 236, 1);
    }
  }
}
</style>