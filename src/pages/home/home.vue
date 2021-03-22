<template>
  <div id="home">
    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#e6a23c"
          text-color="#fff"
          active-text-color="#000"
          router
        >
          <!-- 首页 -->
          <el-menu-item index="/">
            <i class="el-icon-menu"></i>
            <span>首页</span>
          </el-menu-item>
          <!-- 开始遍历用户菜单 -->
          <template v-for="item in sessionMenuList">
            <el-submenu :index="item.title" :key="item.id" v-if="item.children">
              <template slot="title">
                <i :class="item.icon"></i>
                <span v-text="item.title"></span>
              </template>
              <el-menu-item
                v-for="cItem in item.children"
                :key="cItem.id"
                :index="'/' + cItem.url"
                >{{ cItem.title }}</el-menu-item
              >
            </el-submenu>
            <el-menu-item :key="item.id" :index="'/' + item.url" v-else>
              <span v-text="item.title"></span>
            </el-menu-item>
          </template>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header style="height: 80px;">
          <div class="username">欢迎用户|{{ username }}</div>
          <div class="quit">
            <el-dropdown>
              <span class="el-dropdown-link" placement="top">
                个人信息<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown" :split-button="true">
                <el-dropdown-item>修改信息</el-dropdown-item>
                <!-- 点击事件无法触发 
                :split-button='true'

                @click='quit'或@command='quit'
                -->
                <el-dropdown-item
                  ><span
                    @click="quit"
                    style="display: block; width: 100%; height: 100%;"
                    >退出</span
                  ></el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
            <div class="icon">
              <i class="el-icon-setting"></i>
            </div>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      sessionMenuList: [],
      username: ""
    };
  },
  computed: {},
  methods: {
    quit() {
      if (sessionStorage.getItem("user")) {
        sessionStorage.removeItem("user");
      }
      this.$router.push("/login");
    },
    ...mapActions({
      menuList: "menu/acMenuList"
    })
  },
  mounted() {
    // 发起一次请求,用于验证一下是否登陆.如果没登路.在路由响应时会跳转到登陆界面
    this.menuList();
    if (sessionStorage.getItem("user")) {
      this.username = JSON.parse(sessionStorage.getItem("user")).username;
      this.sessionMenuList = JSON.parse(sessionStorage.getItem("user")).menus;
    }
  }
};
</script>

<style>
.el-aside {
  position: relative;
  height: 100vh;
  background: #e6a23c;
}
/* 因为导航界右边有白条,所有添加白条使其美观 */
.el-aside::after {
  content: "";
  position: absolute;
  height: 100%;
  width: 1px;
  top: 0;
  right: 0;
  background: #fff;
}
/* 头部样式 */
.username {
  float: left;
  font-size: 20px;
  color: #fff;
  line-height: 80px;
  cursor: default;
}

.el-header {
  background: #67c23a;
}
.quit {
  float: right;
}
.quit .icon,
.quit .el-dropdown {
  float: left;
  margin-left: 10px;
}
.quit .icon i {
  color: #fff;
  line-height: 80px;
}
.el-header .el-dropdown-link {
  cursor: pointer;
  color: #fff;
  font-weight: bold;
  line-height: 80px;
}
.el-header .el-icon-arrow-down {
  font-size: 12px;
}
/* 重写菜单样式 */
/* 箭头样式 */
.el-submenu__title .el-submenu__icon-arrow {
  color: #000;
}
/* 图标样式 */
.el-submenu__title i,
.el-menu-item i {
  color: #ff0080;
}
/* 面包屑样式 */
#breadcrund {
  margin-bottom: 10px;
}
/* 表格样式 */
.cell {
  text-align: center;
}
.cell .el-button {
  width: 70%;
  padding: 5px 0;
}
/* 弹窗窗口样式 */
.el-dialog{
  max-width: 700px;
  min-width: 550px;
}
</style>
