
import { getRoleList, managerCount, managerList } from '../../utils/request'

const state = {
    managerList: [],
    managerCount: null,
    page: 1,
    size: 2
};
const mutations = {
    muManagerList(state, arr) {
        state.managerList = arr
    },
    muManagerCount(state, num) {
        state.managerCount = num
    },
    muPage(state, page) {
        state.page = page
    }

};
const actions = {
    acManagerList(context) {
        let pageSize = {
            page: context.state.page,
            size: context.state.size
        }
        managerList(pageSize).then(res => {
            let managerList = res.data.list;
            // 判断返回的数据是否为空,且页数大于1.
            if (!managerList && pageSize.page > 1) {
                context.commit('muPage', --pageSize.page);
                context.dispatch('acManagerList')
                return
            };
            // 如果删除第一页最后一条数据,managerList也会返回null.
            // 所以muManagerList传入[空]
            if (!managerList) {
                context.commit('muManagerList', []);
                return
            }
            /**
             * 老师判断返回数据是否为空
             * // 判断返回列表的数据是否为空.如果为空,将page-1,如果不为空则直接获取列表数据
             * if((res.data.list == null || res.data.list.length == 0) && context.state.page > 1){
             * 将page-1
             * var p = context.state.page -1;
             * context.commit('changePage',p);
             * 自调
             * context.dispatch('managerListActions');
             * return;
             * }
             */
            // 发起角色列表请求,在返回角色列表中新添加一个roleidname属性.
            getRoleList().then(res => {
                let roleidnameArr = res.data.list;
                for (let i = 0; i < managerList.length; i++) {
                    for (let a = 0; a < roleidnameArr.length; a++) {
                        if (managerList[i].roleid == roleidnameArr[a].id) {
                            managerList[i].roleidname = roleidnameArr[a].rolename;
                            break;
                        };
                    };
                };
                context.commit('muManagerList', managerList)
            })
        })
    },
    acManagerCount(context) {
        managerCount().then(res => {
            context.commit('muManagerCount', res.data.list[0].total)
        })
    },
    acPage(context, page) {
        context.commit('muPage', page)
    }
};
const getters = {
    managerList(state) {
        return state.managerList
    },
    managerCount(state) {
        return state.managerCount
    },
    page(state){
        return state.page
    }
};
export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}