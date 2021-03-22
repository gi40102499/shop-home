<template>
  <div id="banner-list">
    <el-table
      :data="bannerList"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="编号"> </el-table-column>
      <el-table-column prop="title" label="轮播图标题"> </el-table-column>
      <el-table-column prop="img" label="图片">
        <template v-slot="prop">
          <img :src="$localhost + prop.row.img" />
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
          <el-button type="primary" @click="editNowBanner(prop.row.id)"
            >编辑</el-button
          >
          <el-popconfirm
            title="确定删除当前【菜单】吗?"
            @confirm="delNowBanner(prop.row.id)"
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
      bannerList: "banner/bannerList"
    })
  },
  methods: {
    editNowBanner(id) {
      this.$emit("editNowBanner", id);
    },
    delNowBanner(id) {
      this.$emit("delNowBanner", id);
      this.acBannerList();
    },
    ...mapActions({
      acBannerList: "banner/acBannerList",
    })
  },
  mounted() {
    this.acBannerList();
  }
};
</script>

<style scoped>
img {
  height: 50px;
}
</style>
