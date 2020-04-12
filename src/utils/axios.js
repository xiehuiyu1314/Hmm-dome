import axios from "axios"
import { Message } from 'element-ui';

const http = axios.create({
  baseURL: process.env.VUE_APP_URL,
  timeout: 5000,
  withCredentials: true //跨域照样携带token
})

//请求拦截
http.interceptors.request.use(config => {
  return config
}, function (err) {
  console.log(err)
})

//响应拦截
http.interceptors.response.use(res => {
  if (res.data.code == 200) {
    return res.data;
  } else if (res.data.code == 206) {
    //没有token直接去登录页
    // removeToken();
    // router.push('/');
    return Message.warning('你还未登录或登录失效');
  } else {
    Message.error(res.data.message);
    return Promise.reject("error");
  }
}, function (err) {
  console.log(err)
})

export default http;