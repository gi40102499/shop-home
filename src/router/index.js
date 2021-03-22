import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
const home = () => import('../pages/home/home');
const login = () => import('../pages/login/login');
const index = () => import('../pages/index/index');
const menu = () => import('../pages/menu/menu');
const role = ()=> import('../pages/role/role');
const manager = ()=>import('../pages/manager/manager');
const cate = ()=>import('../pages/cate/cate');
const specs = ()=>import('../pages/specs/specs');
const goods = ()=>import('../pages/goods/goods');
const member = ()=>import('../pages/member/member');
const banner = ()=>import('../pages/banner/banner');
const seckill = ()=>import('../pages/seckill/seckill');
const router = new Router({
  routes: [
    {
      path: '/',
      component: home,
      children: [
        {
          path: 'index',
          component: index
        },
        {
          path:'menu',
          component:menu,
          name:'菜单管理'
        },
        {
          path:'role',
          component:role,
          name:'角色管理'
        },
        {
          path:'manager',
          component:manager,
          name:'管理员管理'
        },
        {
          path:'cate',
          component:cate,
          name:'商品分类'
        },
        {
          path:'specs',
          component:specs,
          name:'商品规格'
        },
        {
          path:'goods',
          component:goods,
          name:'商品管理'
        },
        {
          path:'member',
          component:member,
          name:'会员管理'
        },
        {
          path:'banner',
          component:banner,
          name:'轮播图管理'
        },
        {
          path:'seckill',
          component:seckill,
          name:'秒杀活动'
        },
        {
          path:'/',
          redirect:'/index'
        }
      ]
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '*',
      redirect: '/index'
    }

  ]
})

export default router
