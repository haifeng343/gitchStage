import fetch from 'common/js/request'
// 获取余额变更列表
export function getMoneyChangeList(params) {
  return fetch('/api/agent/manager/finance/money/change/list', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 获取商家充值排行
export function getRechargeRank(params) {
  return fetch('/api/agent/manager/finance/rechargerank/list', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 获取商家充值记录
export function getRechargeRecord(params) {
  return fetch('/api/agent/manager/finance/rechargerecord/list', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 商家充值退款
export function refund(params) {
  return fetch('/api/agent/manager/finance/recharge/refund/apply', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 获取退款详情
export function getRefundDetail(params) {
  return fetch('/api/agent/manager/finance/recharge/refund/details', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 获取库存日志
export function getStockLog(params) {
  return fetch('/api/agent/manager/finance/stock/log', 'post', params)
}

// 获取库存信息
export function getStockInfo(params) {
  return fetch('/api/agent/manager/finance/stock', 'post', params)
}

// 设置库存
export function setStock(params) {
  return fetch('/api/agent/manager/finance/stock/set', 'post', params).then(res => {
    return Promise.resolve(res)
  })
}

// 获取财务总览
export function StockOverview(params) {
  return fetch('/api/agent/manager/finance/overview', 'post', params)
}
