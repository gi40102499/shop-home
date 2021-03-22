<template>
  <div id="dialog">
    <el-dialog
      :title="info.title"
      :visible.sync="info.show"
      :beforeClose="cancel"
    >
      <el-form :model="form">
        <!--  -->
        <el-form-item label="规格名称" :label-width="formLabelWidth">
          <el-input
            v-model="form.specsname"
            autocomplete="off"
            placeholder="请输入添加规格名称"
          ></el-input>
        </el-form-item>
        <!--  -->
        <el-form-item label="规格属性" :label-width="formLabelWidth">
          <el-col :span="18">
            <el-input
              v-model="nowAttrs"
              autocomplete="off"
              placeholder="回车键添加或点击新增"
              @keyup.enter.native="addAttrs"
            ></el-input>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" @click="addAttrs" style="width:100%"
              >新增</el-button
            >
          </el-col>
        </el-form-item>
        <!--  -->
        <el-form-item label="规格属性" :label-width="formLabelWidth">
          <template v-if="dynamicTags != 0">
            <el-tag
              :key="tag"
              v-for="tag in dynamicTags"
              closable
              :disable-transitions="false"
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
          @click="addSpecsBtn"
          >添 加</el-button
        >
        <el-button
          type="primary"
          v-if="info.type == '编辑'"
          @click="modifySpecsBtn"
          >编 辑</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { addSpecs, modifySpecs, specsList } from "../../../utils/request";
export default {
  data() {
    return {
      formLabelWidth: "120px",
      form: {
        specsname: "",
        attrs: "",
        status: 1
      },
      nowAttrs: "",
      dynamicTags: []
    };
  },
  props: ["info"],
  computed: {
    ...mapGetters({
      specsList: "specs/specsList"
    })
  },
  methods: {
    addAttrs() {
      if (this.nowAttrs) {
        // 判断是否重复添加
        if (this.dynamicTags.indexOf(this.nowAttrs) != -1) {
          this.$message.error("不能重复添加");
          return;
        }
        this.dynamicTags.push(this.nowAttrs);
      } else {
        this.$message.error("新增不能为空");
      }
      this.nowAttrs = "";
    },
    // 删除添加后的规格
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    addSpecsBtn() {
      if (!this.form.specsname) {
        this.$message.error("请输入分类名称");
        return;
      }
      // 首先判断添加内容是否重复,如果没有再添加
      specsList().then(res => {
        if (!res.data.list.some(i => i.specsname == this.form.specsname)) {
          // 将规格数组转为字符串;
          this.form.attrs = JSON.stringify(this.dynamicTags);
          addSpecs(this.form).then(res => {
            this.$message({
              type: "success",
              duration: 1000,
              message: "添加操作成功"
            });
            this.cancel();
            this.acSpecsCount();
            this.acSpecsList();
          });
        } else {
          this.$message.error("商品规格名重复");
        }
      });
    },
    // 接收specsList文件传来的数据,更新表单内容.从而编辑
    updataForm(data) {
      // console.log(data);
      this.form = data;
      this.dynamicTags = JSON.parse(data.attrs);
    },
    // 编辑按钮
    modifySpecsBtn() {
      if (!this.form.specsname) {
        this.$message.error("请输入分类名称");
        return;
      }
      // 将规格数组转为字符串
      this.form.attrs = JSON.stringify(this.dynamicTags);
      // console.log(this.form);
      modifySpecs(this.form).then(res => {
        this.$message({
          type: "success",
          duration: 1000,
          message: "添加操作成功"
        });
        this.cancel();
        this.acSpecsList();
      });
    },
    cancel() {
      this.info.show = false;
      this.form = {
        specsname: "",
        attrs: [],
        status: 1
      };
      this.nowAttrs = "";
      this.dynamicTags = [];
    },

    ...mapActions({
      acSpecsCount: "specs/acSpecsCount",
      acSpecsList: "specs/acSpecsList"
    })
  },
  mounted() {}
};
</script>

<style scoped></style>
