<template>
  <div id="dialog">
    <el-dialog
      :title="info.title"
      :visible.sync="info.show"
      :beforeClose="cancel"
    >
      <el-form :model="form">
        <!--  -->
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input
            v-model="form.phone"
            autocomplete="off"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <!--  -->
        <el-form-item label="昵称" :label-width="formLabelWidth">
          <el-input
            v-model="form.nickname"
            autocomplete="off"
            placeholder="请输入昵称"
          ></el-input>
        </el-form-item>
        <!--  -->
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input
            v-model="form.password"
            autocomplete="off"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <!--  -->
        <el-form-item label="" :label-width="formLabelWidth">
          <span>留空则不修改</span>
        </el-form-item>
        <!--  -->
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button
          type="primary"
          v-if="info.type == '添加'"
          @click="addMemberBtn"
          >添 加</el-button
        >
        <el-button
          type="primary"
          v-if="info.type == '修改'"
          @click="modifyMemberBtn"
          >修 改</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { register, modifyMember } from "../../../utils/request";
export default {
  data() {
    return {
      formLabelWidth: "120px",
      form: {
        nickname: "",
        phone: "",
        password: "",
        status: 1
      }
    };
  },
  props: ["info"],
  computed: {
    ...mapGetters({
      memberList: "member/memberList"
    })
  },
  methods: {
    addMemberBtn() {
      if (!this.testDialog()) {
        this.$message.error("请检查输入内容");
        return;
      }
      // 判断手机号
      if (this.memberList.some(i => i.phone == this.form.phone)) {
        this.$message.error("手机号重以重复");
        return;
      }
      register(this.form).then(res => {
        this.$message({
          type: "success",
          duration: 1000,
          message: "添加操作成功"
        });
        this.cancel();
        this.acMemberList();
      });
    },
    updataForm(data) {
      data.password = "";
      this.form = data;
    },
    // 编辑按钮
    modifyMemberBtn() {
      if (!this.testDialog(true)) {
        this.$message.error("请检查输入内容");
        return;
      }
      // 密码不填.数据也是空的.并没有实现不修改密码操作修改其它信息
      modifyMember(this.form).then(res => {
        this.$message({
          type: "success",
          duration: 1000,
          message: "添加操作成功"
        });
        this.cancel();
        this.acMemberList();
      });
    },
    cancel() {
      this.info.show = false;
      this.form = {
        nickname: "",
        phone: "",
        password: "",
        status: 1
      };
    },
    // 验证表单所有信息是否已经更改
    testDialog(modify = false) {
      let A = {
        nickname: "",
        phone: "",
        password: ""
      };
      if (modify) {
        A = {
          nickname: "",
          phone: ""
        };
      }
      let B = this.form;
      for (const k in A) {
        if (A[k] == B[k]) {
          return false;
        }
      }
      return true;
    },
    ...mapActions({
      acMemberList: "member/acMemberList"
    })
  },
  mounted() {}
};
</script>

<style scoped></style>
