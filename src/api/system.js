import fetch from 'common/js/request'

// 获取模块列表
export function getModuleList(params) {
  return fetch('/api/admin/module/list', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 添加模块
export function addModule(params) {
  return fetch('/api/admin/module/add', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 更新模块
export function editModule(params) {
  return fetch('/api/admin/module/update', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 删除模块
export function deleteModule(params) {
  return fetch('/api/admin/module/delete', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 获取系统参数列表
export function getSystemPList(params) {
  return fetch('/api/admin/systemparam/list', 'post', params)
}

// 添加系统参数
export function addSystemP(params) {
  return fetch('/api/admin/systemparam/add', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 更新系统参数
export function editSystemP(params) {
  return fetch('/api/admin/systemparam/update', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 删除系统参数
export function deleteSystemP(params) {
  return fetch('/api/admin/systemparam/delete', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 获取业务参数类型列表
export function getBusSystemPList(params) {
  return fetch('/api/agent/manager/systemparam/type/list', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 添加业务参数类型
export function addBusSystemP(params) {
  return fetch('/api/agent/manager/systemparam/type/add', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 更新业务参数类型
export function editBusSystemP(params) {
  return fetch('/api/agent/manager/systemparam/type/modify', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 删除业务参数类型
export function deleteBusSystemP(params) {
  return fetch('/api/agent/manager/systemparam/type/delete', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 获取业务参数列表
export function getBusParamList(params) {
  return fetch('/api/agent/manager/systemparam/param/list', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 添加业务参数
export function addBusParam(params) {
  return fetch('/api/agent/manager/systemparam/param/add', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 更新业务参数
export function editBusParam(params) {
  return fetch('/api/agent/manager/systemparam/param/modify', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 删除业务参数类型
export function deleteBusParam(params) {
  return fetch('/api/agent/manager/systemparam/param/delete', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 获取API列表
export function getAPIList(params) {
  return fetch('/api/agent/manager/systemparam/saveip/list', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 添加API
export function addAPI(params) {
  return fetch('/api/agent/manager/systemparam/saveip/add', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 更新API
export function editAPI(params) {
  return fetch('/api/agent/manager/systemparam/saveip/modify', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 删除API类型
export function deleteAPI(params) {
  return fetch('/api/agent/manager/systemparam/saveip/delete', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 获取支付类型列表
export function getPayTypeList(params) {
  return fetch('/api/agent/manager/systemparam/payment/list', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 设置支付类型是否有效
export function setPay(params) {
  return fetch('/api/agent/manager/systemparam/payment/state/set', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 获取支付参数列表
export function getPayParamList(params) {
  return fetch('/api/agent/manager/systemparam/payment/param/list', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 编辑支付参数
export function editPayParam(params) {
  return fetch('/api/agent/manager/systemparam/payment/param/modify', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 获取广告类型列表
export function getBannerTypeList(params) {
  return fetch('/api/agent/manager/systemparam/banner/type/list', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 获取广告列表
export function getBannerList(params) {
  return fetch('/api/agent/manager/systemparam/banner/list', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 添加广告
export function addBanner(params) {
  return fetch('/api/agent/manager/systemparam/banner/add', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 删除广告
export function deleteBanner(params) {
  return fetch('/api/agent/manager/systemparam/banner/delete', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 编辑广告
export function editBanner(params) {
  return fetch('/api/agent/manager/systemparam/banner/modify', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 获取充值商品列表
export function getGoodsRList(params) {
  return fetch('/api/agent/manager/systemparam/recharge/list', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}
// 增加充值商品列表
export function addGoodsRList(params) {
  return fetch('/api/agent/manager/systemparam/recharge/add', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}
// 编辑充值商品列表
export function editGoodsRList(params) {
  return fetch('/api/agent/manager/systemparam/recharge/modify', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 删除充值商品列表
export function deleteGoodsRList(params) {
  return fetch('/api/agent/manager/systemparam/recharge/delete', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 修改充值商品列表状态
export function modifyGoodsRStatus(params) {
  return fetch('/api/agent/manager/systemparam/recharge/status/modify', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}
// 获取席位列表
export function getCallSeatList(params) {
  return fetch('/api/agent/manager/systemparam/call/seat/list', 'post', params)
}
// 修改席位列表状态
export function setCallSeatStatus(params) {
  return fetch('/api/agent/manager/systemparam/call/seat/status/modify', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}
// 添加席位列表
export function addCallSeat(params) {
  return fetch('/api/agent/manager/systemparam/call/seat/add', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}
// 修改席位列表
export function editCallSeat(params) {
  return fetch('/api/agent/manager/systemparam/call/seat/modify', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}
// 删除席位列表状态
export function deleteCallSeat(params) {
  return fetch('/api/agent/manager/systemparam/call/seat/delete', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}
// 获取电话列表
export function getCallMobileList(params) {
  return fetch('/api/agent/manager/systemparam/call/mobile/list', 'post', params)
}

// 修改电话列表状态
export function setCallMobileStatus(params) {
  return fetch('/api/agent/manager/systemparam/call/mobile/status/modify', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 增加电话列表
export function addCallMobile(params) {
  return fetch('/api/agent/manager/systemparam/call/mobile/add', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}
// 编辑电话列表
export function editCallMobile(params) {
  return fetch('/api/agent/manager/systemparam/call/mobile/modify', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}
// 删除电话列表
export function deleteCallMobile(params) {
  return fetch('/api/agent/manager/systemparam/call/mobile/delete', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}
// 获取问题列表
export function getQuestionList(params) {
  return fetch('/api/agent/manager/helpcenter/question/list', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}
// 修改问题所属分类
export function editQuestionType(params) {
  return fetch('/api/agent/manager/helpcenter/question/bytype/modify', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}
// 增加问题列表
export function addQuestionList(params) {
  return fetch('/api/agent/manager/helpcenter/question/add', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}
// 编辑问题列表
export function editQuestionList(params) {
  return fetch('/api/agent/manager/helpcenter/question/modify', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 删除问题列表
export function deleteQuestionList(params) {
  return fetch('/api/agent/manager/helpcenter/question/delete', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 修改问题是否有效
export function modifyQuestionStatus(params) {
  return fetch('/api/agent/manager/helpcenter/question/status/modify', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}
// 修改问题是否置顶
export function modifyQuestionTop(params) {
  return fetch('/api/agent/manager/helpcenter/question/top/modify', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 修改问题是否是常见问题
export function modifyQuestionCommon(params) {
  return fetch('/api/agent/manager/helpcenter/question/common/modify', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}
// 获取所有问题分类
export function getQuestionType(params) {
  return fetch('/api/agent/manager/helpcenter/question/type/all', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}
// 获取问题分类列表
export function getQuestClassifyList(params) {
  return fetch('/api/agent/manager/helpcenter/question/type/list', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}
// 增加问题分类
export function addQuestClassifyList(params) {
  return fetch('/api/agent/manager/helpcenter/question/type/add', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}
// 编辑问题分类
export function editQuestClassifyList(params) {
  return fetch('/api/agent/manager/helpcenter/question/type/modify', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 删除问题分类
export function deleteQuestClassifyList(params) {
  return fetch('/api/agent/manager/helpcenter/question/type/delete', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}