import fetch from 'common/js/request'
// import { createUuid } from 'common/js/utils'
// import { setUserUuid,getUserUuid } from 'common/js/auth'
// import Router from 'vue-router'
// import Vue from 'vue'
// import qs from 'qs'
// Vue.use(Router)
export function login(params) {
  return fetch('/api/admin/account/login', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 退出登录
export function logout(params) {
  return fetch('/api/admin/account/logout', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 修改密码
export function changePassword(params) {
  return fetch('/api/admin/account/updatepassword/my', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 获取图形验证码
export function beforeAuthCode(params){
  return fetch('/api/common/getimageverifycode', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 获取模块
export function getHomeMenu(params){
  return fetch('/api/admin/module/my', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

//获取模块菜单
export function getSlider(params){
  return fetch('/api/admin/menu/my', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}
// // 点击广告时跳转log
// export function setBrowseLog(params){
//   let uuid = getUserUuid()
// 	let data = {}
// 	if(!uuid){
// 		uuid = createUuid()
// 		setUserUuid(uuid)
// 	}
//   data['uuid'] = uuid
//   Object.assign(params,data)
//   params = qs.stringify(params)
//   return fetch('https://log.qiuxuemao.com', 'post', params).then(res => {
//     return Promise.resolve(res)
//   })
// }