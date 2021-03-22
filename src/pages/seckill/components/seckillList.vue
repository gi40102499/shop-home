<template>
  <div id="seckill-list">
    <el-table
      :data="seckillList"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="title" label="活动名称"> </el-table-column>
      <el-table-column prop="status" label="状态">
        <template v-slot="prop">
          <el-button type="primary" v-if="prop.row.status == 1"
            >已启用</el-button
          >
          <el-button type="danger" v-else>未启用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="prop">
          <el-button type="primary" @click="editNowSeckill(prop.row.id)"
            >编辑</el-button
          >
          <el-popconfirm
            title="确定删除当前【菜单】吗?"
            @confirm="delNowSeckill(prop.row.id)"
          >
            <el-button type="danger" slot="reference">删除</el-button>
          </el-popconfirm>
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
      seckillList: "seckill/seckillList"
    })
  },
  methods: {
    editNowSeckill(id) {
      this.$emit("editNowSeckill", id);
    },
    delNowSeckill(id) {
      this.$emit("delNowSeckill", id);
      this.acSeckillList();
    },
    ...mapActions({
      acSeckillList: "seckill/acSeckillList",
    })
  },
  mounted() {
    this.acSeckillList();
  }
};
</script>

<style scoped>
img {
  height: 50px;
}
</style>
