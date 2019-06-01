import * as types from './mutation-types'

const mutations = {
  [types.ISCHANGEROLE](state, IsChangeRole) {
    state.IsChangeRole = IsChangeRole
  },
  [types.ISMODIFYFAMILY](state, IsModifyFamily) {
    state.IsModifyFamily = IsModifyFamily
  },
}

export default mutations