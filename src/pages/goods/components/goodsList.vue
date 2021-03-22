<template>
  <div id="manager-list">
    <el-table
      :data="goodsList"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="商品编号"> </el-table-column>
      <el-table-column prop="goodsname" label="商品名称"> </el-table-column>
      <el-table-column prop="price" label="商品价格">
        <template v-slot="prop">
          {{ prop.row.price | toFixed }}
        </template>
      </el-table-column>
      <el-table-column prop="market_price" label="市场价格">
        <template v-slot="prop">
          {{ prop.row.market_price | toFixed }}
        </template>
      </el-table-column>
      <el-table-column prop="img" label="图片">
        <template v-slot="prop">
          <img :src="$localhost + prop.row.img" />
        </template>
      </el-table-column>
      <el-table-column prop="isnew" label="是否新品">
        <template v-slot="prop">
          <el-button type="primary" v-if="prop.row.isnew == 1">时</el-button>
          <el-button type="danger" v-else>否</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="ishot" label="是否热卖">
        <template v-slot="prop">
          <el-button type="primary" v-if="prop.row.ishot == 1">是</el-button>
          <el-button type="danger" v-else>否</el-button>
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
          <el-button type="primary" @click="editNowGoods(prop.row.id)"
            >编辑</el-button
          >
          <el-popconfirm
            title="确定删除当前【菜单】吗?"
            @confirm="delNowGoods(prop.row.id)"
          >
            <el-button type="danger" slot="reference">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="goodsCount"
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
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      nowPage: 1
    };
  },
  computed: {
    ...mapGetters({
      goodsCount: "goods/goodsCount",
      goodsList: "goods/goodsList"
    })
  },
  methods: {
    editNowGoods(id) {
      this.$emit("editNowGoods", id);
    },
    delNowGoods(id) {
      this.$emit("delNowGoods", id);
      this.acGoodsCount();
      this.acGoodsList();
    },
    nowPageF(e) {
      this.acPage(e);
      this.acGoodsCount();
      this.acGoodsList();
    },
    ...mapActions({
      acGoodsCount: "goods/acGoodsCount",
      acGoodsList: "goods/acGoodsList",
      acPage: "goods/acPage"
    })
  },
  mounted() {
    this.nowPageF(1);
    this.acGoodsCount();
    this.acGoodsList();
  }
};
</script>

<style scoped>
img {
  width: 100%;
}
</style>
