import fetch from 'common/js/request'
// 获取家庭列表
export function getFamilyList(params) {
  return fetch('/api/agent/manager/userdata/family/base/list', 'post', params)
}
// 设置有效状态
export function setFamilyStatus(params) {
  return fetch('/api/agent/manager/userdata/family/status/set', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 新增家庭基础信息
export function addFamilyList(params) {
  return fetch('/api/agent/manager/userdata/family/base/add', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}
// 获取家庭详细信息
export function getFamilyDetail(params) {
  return fetch('/api/agent/manager/userdata/family/details', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}
// 修改家庭详细信息
export function editFamilyList(params) {
  return fetch('/api/agent/manager/userdata/family/modify', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}
// 添加家庭地址
export function addAddressInfo(params) {
  return fetch('/api/agent/manager/userdata/family/address/add', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 编辑家庭地址
export function editAddressInfo(params) {
  return fetch('/api/agent/manager/userdata/family/address/modify', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}
// 删除家庭地址
export function deleteAddressInfo(params) {
  return fetch('/api/agent/manager/userdata/family/address/delete', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 添加家庭孩子
export function addChildrenInfo(params) {
  return fetch('/api/agent/manager/userdata/family/child/add', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}
// 删除家庭孩子
export function deleteChildInfo(params) {
  return fetch('/api/agent/manager/userdata/family/child/status/set', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 编辑家庭孩子
export function editChildInfo(params) {
  return fetch('/api/agent/manager/userdata/family/child/modify', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}
// 获取孩子信息
export function getChildrenList(params) {
  return fetch('/api/agent/manager/userdata/children/list', 'post', params)
}

// 获取年龄统计
export function getAgeStatistic(params) {
  return fetch('/api/agent/manager/userdata/age/statistic', 'post', params)
}

// 获取性别统计
export function getSexStatistic(params) {
  return fetch('/api/agent/manager/userdata/sex/statistic', 'post', params)
}

// 获取地区统计
export function getAreaStatistic(params) {
  return fetch('/api/agent/manager/userdata/area/statistic', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 获取客服微信列表
export function wechatList(params) {
  return fetch('/api/agent/manager/systemparam/wechat/list', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 添加客服微信号
export function wechatAdd(params) {
  return fetch('/api/agent/manager/systemparam/wechat/add', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 修改客服微信号
export function wechatModify(params) {
  return fetch('/api/agent/manager/systemparam/wechat/modify', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 删除客服微信号
export function wechatDelete(params) {
  return fetch('/api/agent/manager/systemparam/wechat/delete', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 修改客服微信号状态
export function wechatStatusModify(params) {
  return fetch('/api/agent/manager/systemparam/wechat/status/modify', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 修改客服微信号是否当前使用
export function wechatCurrentModify(params) {
  return fetch('/api/agent/manager/systemparam/wechat/current/modify', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 新增家庭基础数据(原始数据)
export function addFamilybase(params) {
  return fetch('/api/agent/manager/userdata/family/base/add', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 获取家庭基础信息列表(原始数据)
export function getFamilyBaseList(params) {
  return fetch('/api/agent/manager/userdata/family/base/list', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 设置数据有效状态(原始数据)
export function setFamilyStatusSet(params) {
  return fetch('/api/agent/manager/userdata/family/status/set', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 修改家庭基础信息(原始数据)
export function setFamilySourceModify(params) {
  return fetch('/api/agent/manager/userdata/family/modify', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 新增家庭地址数据(原始数据)
export function addAddressSourceInfo(params) {
  return fetch('/api/agent/manager/userdata/family/address/add', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 编辑家庭地址数据(原始数据)
export function editAddressSourceInfo(params) {
  return fetch('/api/agent/manager/userdata/family/address/source/modify', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 修改家庭孩子信息状态(原始数据)
export function setChildStatusInfo(params) {
  return fetch('/api/agent/manager/userdata/family/child/status/set', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 获取孩子列表(原始数据)
export function getChildrenSourceList(params) {
  return fetch('/api/agent/manager/userdata/children/source/list', 'post', params)
}

// 编辑家庭孩子
export function editChildSourceInfo(params) {
  return fetch('/api/agent/manager/userdata/family/child/modify', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 原始数据导出到TMK
export function setExportTmk(params) {
  return fetch('/api/agent/manager/userdata/family/export/tmk', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 获取AI过滤记录
export function setFamilyAiRecord(params) {
  return fetch('/api/agent/manager/userdata/family/ai/record', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 获取AI过滤记录对话信息
export function setFamilyAiRecordDialog(params) {
  return fetch('/api/agent/manager/userdata/family/ai/record/dialog', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 获取短信任务列表
export function smsTaskList(params) {
  return fetch('/api/agent/manager/userdata/sms/task/list', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 创建短信任务
export function smsTaskAdd(params) {
  return fetch('/api/agent/manager/userdata/sms/task/add', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 获取短信任务详情
export function smsTaskDetails(params) {
  return fetch('/api/agent/manager/userdata/sms/task/details', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 修改短信任务发送状态
export function smsTaskStatusModify(params) {
  return fetch('/api/agent/manager/userdata/sms/task/status/modify', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 查询短信任务发送记录
export function smsTaskSendRecord(params) {
  return fetch('/api/agent/manager/userdata/sms/task/send/record', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 删除短信任务
export function smsTaskDelete(params) {
  return fetch('/api/agent/manager/userdata/sms/task/delete', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

//百度地圖
export function ask(params) {
  return fetch('/mock/user/geocoder', 'get', params).then(res => {
    return Promise.resolve(res)
  })
}
