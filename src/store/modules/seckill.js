
import { seckillList } from '../../utils/request'

const state = {
    seckillList: []
};
const mutations = {
    muSeckillList(state, arr) {
        state.seckillList = arr
    }
};
const actions = {
    acSeckillList(context) {
        seckillList().then(res => {
            if(!res.data.list){
                context.commit('muSeckillList', [])
                return
            }
            context.commit('muSeckillList', res.data.list)
        })
    }
}
const getters = {
    seckillList(state) {
        return state.seckillList
    }
}
export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}