# **商城后台管理系统**

## 介绍:

​		本次案例主要以熟悉vue2的使用为主，配合插件进行开发。实现各个数据之间的获取传递,主要为添加,编辑,删除.每个组件之间实现联动.

​		管理员账户(root,111)可设置菜单栏的添加编辑删除,并给不同管理员分配不同权限,不同菜单.

​		商品管理:商品分类,商品规格中的数据,都会在商品管理添加时进行获取.一级分类管理二级分类,商品规格管理对应属性.

​		秒杀活动:秒杀活动中添加商品,是根据商品分类查找对应分类中的商品.

## 使用插件包括:

#### 数据交互插件:**router**、**axios**、**vuex**

#### 界面搭建插件:**element-ui**

#### 可视化数据展示使用:[**Highcharts**](https://www.highcharts.com.cn/demo/highcharts)、[**Apache ECharts**](http://echarts.apache.org/zh/index.html)

注:可视化数据展示未添加到界面,如需添加参考官方文档即可



## 1.**router**：路由

导入router并在vue实例中添加.

本次案例使用懒加载模式.

### router组件

router-view	路由出口,用于渲染匹配到的组件.

router-link	路由导航,它默认会被渲染成一个带有链接的a标签，通过to属性指定链接地址。

参考资料: [vue-router（路由）详细教程](https://blog.csdn.net/wulala_hei/article/details/80488727) -来自CSDN

### 代码

1.main.js

```js
import router from './router'
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
```

2.router.js

```js
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
const home = () => import('../pages/home/home');
const login = () => import('../pages/login/login');
const index = () => import('../pages/index/index');
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
      redirect: '/login'
    }

  ]
})

export default router

```

## 2.**axios**:[易用、简洁且高效的http库-点击跳转官网](http://axios-js.com/)

### qs

[qs内置模块说明-来自npm文档](https://www.npmjs.com/package/qs)

[qs内置模块说明-来自CSDN](https://blog.csdn.net/sansan_7957/article/details/82227040)

### 文件上传

[formData说明-来自CSDN](https://blog.csdn.net/AlbenXie/article/details/100103709)

### 前期准备

修改config/index.js

在proxyTable属性添加内容

```js
module.exports = {
  dev: {
    proxyTable: {
          '/api':{
            target:'http://127.0.0.1:3000',
            changeOrigin:true,
            pathRewrite:{
              '^/api':'http://127.0.0.1:3000'
            }
          }
        }
  }
}
```



### 代码

1.store/index.js

```js
import axios from 'axios';
import qs from 'qs';
// 请求拦截,config中存储着各种请求的数据,还未发送到服务器.最后必须返回一个数据.否则无请求内容
axios.interceptors.request.use(config => {
    return config
});
// 响应拦截,res中存储着响应的各种数据.最后必须返回一个数据.响应有数据,但实际没反应
axios.interceptors.response.use(res => {
    return res
});
//这是开发模式下,生成模式替换为空字符串
const BASE_URL = '/api';
//以下开始各种请求,并暴露
export const 自定义名方便调用 = (data) => {
    return axios({
        method: 'post',
        url: BASE_URL + '后端提供的api接口',
        //是将请求内容转为地址传参.
        //post属性为data
        //get改为params
        data: qs.stringify(data)
    })
};
//文件上传
export const 自定义名方便调用 = (data) => {
    let form = new FormData();
    for (const i in data) {
        form.append(i, data[i])
    };
    return axios({
        method: 'post',
        url: BASE_URL + '后端提供的api接口',
        data: form
    })
};

```

2.main.js

```js
// 引入vuex
import store from './store';
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  components: { App },
  template: '<App/>'
})
```

## 3.**element-ui**[网站快速成型工具-点击跳转官网](https://element.eleme.cn/#/zh-CN)

Element，一套为开发者、设计师和产品经理准备的基于 Vue 2.0 的桌面端组件库

# 主要文件截图

## 1.文件结构



<img src="https://raw.githubusercontent.com/gi40102499/gitImg/master/img/%E5%90%8E%E5%8F%B0%E9%A1%B9%E7%9B%AEimage-20210320100739299.png" alt="image-20210320100739299" style="zoom: 67%;" /><img src="https://raw.githubusercontent.com/gi40102499/gitImg/master/img/%E5%90%8E%E5%8F%B0%E9%A1%B9%E7%9B%AEimage-20210320100842731.png" alt="image-20210320100842731" style="zoom:50%;" />

## 2.项目截图

### 1.登陆

![image-20210320101111885](https://raw.githubusercontent.com/gi40102499/gitImg/master/img/%E5%90%8E%E5%8F%B0%E9%A1%B9%E7%9B%AEimage-20210320101111885.png)

### 2.首页

<img src="https://raw.githubusercontent.com/gi40102499/gitImg/master/img/%E5%90%8E%E5%8F%B0%E9%A1%B9%E7%9B%AEimage-20210320101451080.png" alt="image-20210320101451080" style="zoom:50%;" />

注:未添加可视化数据图标.如需添加到

### 3.菜单设置

<img src="https://raw.githubusercontent.com/gi40102499/gitImg/master/img/%E5%90%8E%E5%8F%B0%E9%A1%B9%E7%9B%AEimage-20210320101619122.png" alt="image-20210320101619122" style="zoom:50%;" />

### 4.角色管理

<img src="https://raw.githubusercontent.com/gi40102499/gitImg/master/img/%E5%90%8E%E5%8F%B0%E9%A1%B9%E7%9B%AEimage-20210320101640129.png" alt="image-20210320101640129" style="zoom:50%;" />

### 5.管理员管理

<img src="https://raw.githubusercontent.com/gi40102499/gitImg/master/img/%E5%90%8E%E5%8F%B0%E9%A1%B9%E7%9B%AEimage-20210320101702969.png" alt="image-20210320101702969" style="zoom:50%;" />

### 6.商品分类

<img src="https://raw.githubusercontent.com/gi40102499/gitImg/master/img/%E5%90%8E%E5%8F%B0%E9%A1%B9%E7%9B%AEimage-20210320101725018.png" alt="image-20210320101725018" style="zoom:50%;" />

### 7.商品规格

<img src="https://raw.githubusercontent.com/gi40102499/gitImg/master/img/%E5%90%8E%E5%8F%B0%E9%A1%B9%E7%9B%AEimage-20210320101751532.png" alt="image-20210320101751532" style="zoom:50%;" />

### 8.商品管理

<img src="https://raw.githubusercontent.com/gi40102499/gitImg/master/img/%E5%90%8E%E5%8F%B0%E9%A1%B9%E7%9B%AEimage-20210320101810536.png" alt="image-20210320101810536" style="zoom:50%;" />

9.会员管理

<img src="https://raw.githubusercontent.com/gi40102499/gitImg/master/img/%E5%90%8E%E5%8F%B0%E9%A1%B9%E7%9B%AEimage-20210320101827338.png" alt="image-20210320101827338" style="zoom:50%;" />

### 10.轮播图管理

<img src="https://raw.githubusercontent.com/gi40102499/gitImg/master/img/%E5%90%8E%E5%8F%B0%E9%A1%B9%E7%9B%AEimage-20210320101840413.png" alt="image-20210320101840413" style="zoom:50%;" />

### 11.秒杀活动

<img src="https://raw.githubusercontent.com/gi40102499/gitImg/master/img/%E5%90%8E%E5%8F%B0%E9%A1%B9%E7%9B%AEimage-20210320101857976.png" alt="image-20210320101857976" style="zoom:50%;" />