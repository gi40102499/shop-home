<template>
  <div id="specs-list">
    <el-table
      :data="specsList"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="规格编号"> </el-table-column>
      <el-table-column prop="specsname" label="规格名称"> </el-table-column>
      <el-table-column label="规格属性">
        <template v-slot="prop">
          <template v-if="prop.row.attrs != 0">
            <el-tag
              :key="tag"
              v-for="tag in prop.row.attrs"
              @close="handleClose(tag)"
            >
              {{ tag }}
            </el-tag>
          </template>
          <template v-else>
            <el-tag :closable="false" disable-transitions>
              空
            </el-tag>
          </template>
        </template>
      </el-table-column>
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
          <el-button type="primary" @click="editNowSpecs(prop.row.id)"
            >编辑</el-button
          >
          <el-popconfirm
            title="确定删除当前【菜单】吗?"
            @confirm="delNowSpecs(prop.row.id)"
          >
            <el-button type="danger" slot="reference">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="specsCount"
      :page-size="2"
      :current-page="nowPage"
      hide-on-single-page
      @current-change="nowPageF"
      style="text-align: center;"
    >
    </el-pagination>
  </div>
</template>

<script>
// 开始写编辑修改删除
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      nowPage: 1
    };
  },
  computed: {
    ...mapGetters({
      specsCount: "specs/specsCount",
      specsList: "specs/specsList"
    })
  },
  methods: {
    editNowSpecs(id) {
      this.$emit("editNowSpecs", id);
    },
    delNowSpecs(id) {
      this.$emit("delNowSpecs", id);
      this.acSpecsCount();
      this.acSpecsList();
    },
    nowPageF(e) {
      this.acPage(e);
      this.acSpecsCount();
      this.acSpecsList();
    },
    ...mapActions({
      acSpecsCount: "specs/acSpecsCount",
      acSpecsList: "specs/acSpecsList",
      acPage: "specs/acPage"
    })
  },
  mounted() {
    this.nowPageF(1);
    this.acSpecsCount();
    this.acSpecsList();
  }
};
</script>

<style scoped>
.el-tag {
  margin: 0 2px;
}
</style>
