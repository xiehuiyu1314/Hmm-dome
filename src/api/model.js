import http from "@/utils/axios.js"

function getCode(data) {
  return http({
    url: "/sendsms",
    method: "post",
    data
  })
}
function register(data) {
  return http({
    url: "/register",
    method: "post",
    data
  })
}

export { getCode, register }