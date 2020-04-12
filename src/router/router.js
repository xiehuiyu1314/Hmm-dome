import VueRouter from "vue-router"
import Vue from "vue"

const Login = () => import("@/views/login/login.vue")
const Home = () => import("@/views/home/home.vue")

Vue.use(VueRouter);

//实例化router对象
const router = new VueRouter({
  mode: "history",
  routes: [
    { path: "/", component: Login },
    { path: '/home', component: Home }
  ]
})

export default router