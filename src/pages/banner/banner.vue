<template>
  <div id="banner">
    <div id="breadcrund">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ this.$route.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div id="addManager">
      <el-button type="success" round @click="addBanner">添加轮播图</el-button>
    </div>
    <v-MeunMessageBox :info="info" ref="meunMessageBox"></v-MeunMessageBox>
    <v-BannerList
      @editNowBanner="editNowBanner"
      @delNowBanner="delNowBanner"
    ></v-BannerList>
  </div>
</template>

<script>
import vMeunMessageBox from "./components/meunMessageBox";
import vBannerList from "./components/bannerList";
import { delBanner, editBanner } from "../../utils/request";
export default {
  data() {
    return {
      info: {
        show: false
      }
    };
  },

  methods: {
    addBanner() {
      this.info = {
        show: true,
        title: "添加轮播图",
        type: "添加"
      };
    },
    editNowBanner(id) {
      editBanner({ id }).then(res => {
        this.info = {
          show: true,
          title: "编辑轮播图",
          type: "编辑"
        };
        res.data.list.id = id; //修改的必要条件
        this.$refs.meunMessageBox.updataForm(res.data.list);
      });
    },
    delNowBanner(id) {
      delBanner({ id }).then(res => {
        this.$message({
          type: "success",
          duration: 1000,
          message: "删除轮播图操作成功"
        });
      });
    }
  },
  mounted() {},
  components: {
    vMeunMessageBox,
    vBannerList
  }
};
</script>

<style scoped></style>
