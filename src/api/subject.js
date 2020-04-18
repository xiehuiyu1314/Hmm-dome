import http from "@/utils/axios.js"

//获取学科列表
function subjectList(params) {
  return http({
    url: "/subject/list",
    method: "get",
    params
  })
}

// 学科状态设置
function setStatus(data) {
  return http({
    url: "/subject/status",
    method: "POST",
    data
  })
}

// 添加学科
function addSubject(data) {
  return http({
    url: "/subject/add",
    method: "POST",
    data
  })
}

// 删除学科
function removeSubject(data) {
  return http({
    url: "/subject/remove",
    method: "POST",
    data
  })
}

// 编辑学科
function editSubject(data) {
  return http({
    url: "/subject/edit",
    method: "POST",
    data
  })
}

export { subjectList, setStatus, addSubject, removeSubject, editSubject }