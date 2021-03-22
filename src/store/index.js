import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

import {
    state,
    mutations,
    getters,
} from './mutations';
import actions from './actions'

import menu from './modules/menu'
import role from './modules/role';
import manager from './modules/manager';
import cate from './modules/cate';
import specs from './modules/specs';
import goods from './modules/goods';
import member from './modules/member';
import banner from './modules/banner';
import seckill from './modules/seckill';
export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules: {
        menu,
        role,
        manager,
        cate,
        specs,
        goods,
        member,
        banner,
        seckill
    }
})
