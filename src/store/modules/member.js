
import { memberList } from '../../utils/request'

const state = {
    memberList: []
};
const mutations = {
    muMemberList(state, arr) {
        state.memberList = arr
    }
};
const actions = {
    acMemberList(context) {
        memberList().then(res => {
            context.commit('muMemberList', res.data.list)
        })
    }
}
const getters = {
    memberList(state) {
        return state.memberList
    }
}
export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}