<template>
  <div id="seckill">
    <div id="breadcrund">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ this.$route.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div id="addManager">
      <el-button type="success" round @click="addSeckill">添加秒杀活动商品</el-button>
    </div>
    <v-MeunMessageBox :info="info" ref="meunMessageBox"></v-MeunMessageBox>
    <v-SeckillList
      @editNowSeckill="editNowSeckill"
      @delNowSeckill="delNowSeckill"
    ></v-SeckillList>
  </div>
</template>

<script>
import vMeunMessageBox from "./components/meunMessageBox";
import vSeckillList from "./components/seckillList";
import { delSeckill, editSeckill } from "../../utils/request";
export default {
  data() {
    return {
      info: {
        show: false
      }
    };
  },

  methods: {
    addSeckill() {
      this.info = {
        show: true,
        title: "添加秒杀活动",
        type: "添加"
      };
    },
    editNowSeckill(id) {
      editSeckill({ id }).then(res => {
        this.info = {
          show: true,
          title: "编辑秒杀活动",
          type: "编辑"
        };
        console.log('编辑秒杀活动=====',res);
        res.data.list.id = id; //修改的必要条件
        this.$refs.meunMessageBox.updataForm(res.data.list);
      });
    },
    delNowSeckill(id) {
      console.log(id);
      delSeckill({ id }).then(res => {
        this.$message({
          type: "success",
          duration: 1000,
          message: "删除秒杀活动操作成功"
        });
      });
    }
  },
  mounted() {},
  components: {
    vMeunMessageBox,
    vSeckillList
  }
};
</script>

<style scoped></style>
