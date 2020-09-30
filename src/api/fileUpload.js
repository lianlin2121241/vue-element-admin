import request from '@/utils/request'

export function uploadFile(data) {
  return request({
    url: `${window.globalVar.contextPath}/file-upload/upload`,
    method: 'post',
    params: data
  })
}

export function downloadFile(id) {
  return request({
    url: `${window.globalVar.contextPath}/file-upload/download`,
    method: 'post',
    data: {
      fileId:id
    }
  })
}

export function findFileUpload(ids) {
  let idsStr=ids.join(",");
  return request({
    url: `${window.globalVar.contextPath}/file-upload/${idsStr}`,
    method: 'get'
  })
}
