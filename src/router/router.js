import VueRouter from "vue-router"
import Vue from "vue"

//导航条
import nprogress from "nprogress"
import 'nprogress/nprogress.css'

import { getToken } from "@/utils/token.js"

const login = () => import("@/views/login/login.vue")
const home = () => import("@/views/home/home.vue")
// home下的二级路由
const subject = () => import("@/views/home/subject/subject.vue")
const chart = () => import("@/views/home/chart/chart.vue")
const userList = () => import("@/views/home/userList/userList.vue")
const question = () => import("@/views/home/question/question.vue")
const business = () => import("@/views/home/business/business.vue")

Vue.use(VueRouter);

//实例化router对象
const router = new VueRouter({
  routes: [
    { path: "/", redirect: "login", meta: { title: "登录页" } },
    { path: "/login", component: login, meta: { title: "登录页" }, },
    {
      path: '/home',
      component: home,
      redirect: "home/subject",
      meta: { title: "首页" },
      // 二级路由,meta路由原配置任何信息
      children: [
        { path: "subject", component: subject, meta: { title: "学科列表", icon: "el-icon-notebook-2" } },
        { path: 'chart', component: chart, meta: { title: "数据概览", icon: "el-icon-pie-chart" } },
        { path: 'userList', component: userList, meta: { title: "用户列表", icon: "el-icon-user" } },
        { path: 'question', component: question, meta: { title: "题库列表", icon: "el-icon-edit-outline" } },
        { path: 'business', component: business, meta: { title: "企业列表", icon: "el-icon-office-building" } },
      ]
    }
  ]
})

//守卫
router.beforeEach((to, from, next) => {
  //设置页面标题
  document.title = to.meta.title
  // 导航条开始
  nprogress.start()
  // 访问登录页时无条件放过
  if (to.path == "/login") return next()

  // 没有token时 ，直接滚去登录页
  if (!getToken()) return next("/login")

  //都不满足上条件直接过
  next()
})

router.afterEach(() => {
  //到航条结束
  nprogress.done()
})

export default router