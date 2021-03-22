<template>
  <div id="member-list">
    <el-table
      :data="memberList"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
    >
      <el-table-column prop="id" label="用户编号"> </el-table-column>
      <el-table-column prop="nickname" label="昵称"> </el-table-column>
      <el-table-column prop="phone" label="手机号">
        <template v-slot="prop">
          <el-button type="primary" v-if="prop.row.status == 1"
            >已启用</el-button
          >
          <el-button type="danger" v-else>未启用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="prop">
          <el-button type="primary" @click="editNowMember(prop.row.uid)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters({
      memberList: "member/memberList"
    })
  },
  methods: {
    editNowMember(uid) {
      this.$emit("editNowMember", uid);
    },
    ...mapActions({
      acMemberList: "member/acMemberList",
    })
  },
  mounted() {
    this.acMemberList();
  }
};
</script>

<style scoped>
.el-tag {
  margin: 0 2px;
}
</style>
