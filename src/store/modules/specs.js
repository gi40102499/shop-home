import { specsCount, specsList } from "../../utils/request";

const state = {
    specsCount: 0,
    specsList: [],
    page: 1,
    size: 2
};
const mutations = {
    muSpecsCount(state, num) {
        state.specsCount = num
    },
    muSpecsList(state, arr) {
        state.specsList = arr
    },
    muPage(state, num) {
        state.page = num
    }
};
const actions = {
    acSpecsCount(context) {
        specsCount().then(res => {
            context.commit('muSpecsCount', res.data.list[0].total)
        })
    },
    acSpecsList(context, isAll = false) {
        let params = {
            page: context.state.page,
            size: context.state.size
        };
        // 是否获取全部信息
        if (isAll) {
            params.size = null;
        }
        specsList(params).then(res => {
            let specsList = res.data.list;
            if ((!specsList || specsList.length == 0) && params.page > 1) {
                context.commit('muPage', --params.page);
                context.dispatch('acSpecsList');
                return
            };
            if (!specsList || specsList.length == 0) {
                context.commit('muSpecsList', []);
            }
            context.commit('muSpecsList', specsList)
        })
    },
    acPage(context, num) {
        context.commit('muPage', num)
    }
};
const getters = {
    specsCount(state) {
        return state.specsCount
    },
    specsList(state) {
        return state.specsList
    }
};

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}