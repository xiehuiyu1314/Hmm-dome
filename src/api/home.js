import http from "@/utils/axios.js"

//获取用户信息
function getUser() {
  return http({
    url: "/info",
    method: "get",
  })
}

export { getUser }