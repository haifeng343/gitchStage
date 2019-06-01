import fetch from 'common/js/request'

// 获取登录日志
export function getLoginLog(params) {
  return fetch('/api/admin/loginlog/list', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 获取操作日志
export function getOperationLog(params) {
  return fetch('/api/admin/operationlog/list', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}