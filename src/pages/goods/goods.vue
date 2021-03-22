<template>
  <div id="goods">
    <div id="breadcrund">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ this.$route.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div id="addManager">
      <el-button type="success" round @click="addGoods">添加商品</el-button>
    </div>
    <v-MeunMessageBox :info="info" ref="meunMessageBox"></v-MeunMessageBox>
    <v-GoodsList
      @editNowGoods="editNowGoods"
      @delNowGoods="delNowGoods"
    ></v-GoodsList>
  </div>
</template>

<script>
import vMeunMessageBox from "./components/meunMessageBox";
import vGoodsList from "./components/goodsList";
import { delGoods, editGoods } from "../../utils/request";
export default {
  data() {
    return {
      info: {
        show: false
      }
    };
  },

  methods: {
    addGoods() {
      this.info = {
        show: true,
        title: "添加商品",
        type: "添加"
      };
    },
    editNowGoods(id) {
      editGoods({ id }).then(res => {
        this.info = {
          show: true,
          title: "编辑商品",
          type: "编辑"
        };
        res.data.list.id = id; //修改的必要条件
        this.$refs.meunMessageBox.updataForm(res.data.list);
      });
    },
    delNowGoods(id) {
      delGoods({ id }).then(res => {
        this.$message({
          type: "success",
          duration: 1000,
          message: "删除商品规格操作成功"
        });
      });
    },
  },
  mounted() {},
  components: {
    vMeunMessageBox,
    vGoodsList
  }
};
</script>

<style scoped>

</style>
