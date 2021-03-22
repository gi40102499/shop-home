
import { bannerList } from '../../utils/request'

const state = {
    bannerList: []
};
const mutations = {
    muBannerList(state, arr) {
        state.bannerList = arr
    }
};
const actions = {
    acBannerList(context) {
        bannerList().then(res => {
            if(res.data.list){
                context.commit('muBannerList', res.data.list)
                return
            }
            context.commit('muBannerList', [])

        })
    }
}
const getters = {
    bannerList(state) {
        return state.bannerList
    }
}
export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}