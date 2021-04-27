import request from "@/utils/request";

export function getDictByType(params) {
  return request({
    url: `${window.globalVar.contextPath}/sys/dict/info/${params}`,
    method: "get"
  });
}

export function getDictByTypes(params) {
  return request({
    url: `${window.globalVar.contextPath}/sys/dict/infos`,
    method: "post",
    data: params
  });
}
