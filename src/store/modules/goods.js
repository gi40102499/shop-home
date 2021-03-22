import { goodsCount, goodsList } from "../../utils/request";

const state = {
    goodsCount: 0,
    goodsList: [],
    page: 1,
    size: 2
};
const mutations = {
    muGoodsCount(state, num) {
        state.goodsCount = num
    },
    muGoodsList(state, arr) {
        state.goodsList = arr
    },
    muPage(state, num) {
        state.page = num
    }
};
const actions = {
    acGoodsCount(context) {
        goodsCount().then(res => {
            context.commit('muGoodsCount', res.data.list[0].total)
        })
    },
    acGoodsList(context, changeData = {}) {
        // 接收参数合并
        let defualt = {
            isAll: false,
            isCate: null
        };
        let result =Object.assign(defualt,changeData);
        console.log('测试打印',result);
        let params = {
            page: context.state.page,
            size: context.state.size
        };
        // 是否获取全部信息
        if (result.isAll) {
            params.size = null;
        };
        // 是否根据商品分类获取全部信息
        if (result.isCate) {
            params = result.isCate
        };
        goodsList(params).then(res => {
            let goodsList = res.data.list;
            if ((!goodsList || goodsList.length == 0) && params.page > 1) {
                context.commit('muPage', --params.page);
                context.dispatch('acGoodsList');
                return
            };
            if (!goodsList || goodsList.length == 0) {
                context.commit('muGoodsList', []);
                return
            }
            context.commit('muGoodsList', goodsList)
        })
    },
    acPage(context, num) {
        context.commit('muPage', num)
    }
};
const getters = {
    goodsCount(state) {
        return state.goodsCount
    },
    goodsList(state) {
        return state.goodsList
    }
};

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}