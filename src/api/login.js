import http from "@/utils/axios.js"

function login(data) {
  return http({
    url: "/login",
    method: "post",
    data
  })
}

export { login }