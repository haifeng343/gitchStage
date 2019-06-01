import Cookies from 'js-cookie'
// js-cookie,设置、读取、删除cookie(Cookies.set、get、remove)

const TokenKey = 'Admin-Token'
const UserKey = 'Admin-User'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUser() {
  return Cookies.get(UserKey)
}

export function setUser(user) {
  return Cookies.set(UserKey, user)
}

export function removeUser() {
  return Cookies.remove(UserKey)
}

// //设置用户uuid
// export function setUserUuid(uuid) {
//   return Cookies.set('UserUuid',uuid,{expires: 730})
// }

// //获取用户uuid
// export function getUserUuid() {
//   return Cookies.get('UserUuid')
// }