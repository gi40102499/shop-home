<template>
  <div id="memver">
    <div id="breadcrund">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ this.$route.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div id="addManager">
      <el-button type="success" round @click="addMember">添加会员</el-button>
    </div>
    <v-MeunMessageBox :info="info" ref="meunMessageBox"></v-MeunMessageBox>
    <v-MemberList
      @editNowMember="editNowMember"
    ></v-MemberList>
  </div>
</template>

<script>
import vMeunMessageBox from "./components/meunMessageBox";
import vMemberList from "./components/memberList";
import { editMember } from "../../utils/request";
export default {
  data() {
    return {
      info: {
        show: false
      }
    };
  },

  methods: {
    addMember() {
      this.info = {
        show: true,
        title: "添加会员",
        type: "添加"
      };
    },
    editNowMember(uid) {
      editMember({ uid }).then(res => {
        this.info = {
          show: true,
          title: "编辑会员",
          type: "修改"
        };
        res.data.list.uid = uid; //修改的必要条件
        this.$refs.meunMessageBox.updataForm(res.data.list);
      });
    },
  },
  mounted() {},
  components: {
    vMeunMessageBox,
    vMemberList
  }
};
</script>

<style></style>
