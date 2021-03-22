<template>
  <div id="dialog">
    <el-dialog
      :title="info.title"
      :visible.sync="info.show"
      :beforeClose="cancel"
    >
      <el-form :model="form">
        <!--  -->
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input
            v-model="form.title"
            autocomplete="off"
            placeholder="请输入轮播图标题"
          ></el-input>
        </el-form-item>
        <!--  -->
        <el-form-item label="活动期限" :label-width="formLabelWidth">
          <!-- begintime\endtime -->
          <div class="block">
            <el-date-picker
              value-format="timestamp"
              v-model="duration"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00', '23:59:59']"
            >
            </el-date-picker>
          </div>
        </el-form-item>
        <!--  -->
        <el-form-item label="一级分类" :label-width="formLabelWidth">
          <el-select v-model="form.first_cateid" @change="firstCateChange">
            <el-option label="--请选择--" disabled value=""></el-option>
            <el-option
              v-for="i in cateList"
              :key="i.id"
              :label="i.catename"
              :value="i.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!--  -->
        <el-form-item label="二级分类" :label-width="formLabelWidth">
          <el-select v-model="form.second_cateid" @change="secondCateChange">
            <el-option label="--请选择--" disabled value=""></el-option>
            <el-option
              v-for="i in cateListChidren"
              :key="i.id"
              :label="i.catename"
              :value="i.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!--  -->
        <el-form-item label="商品" :label-width="formLabelWidth">
          <el-select v-model="form.goodsid">
            <el-option label="--请选择--" disabled value=""></el-option>
            <el-option
              v-for="i in goodsList"
              :key="i.id"
              :label="i.goodsname"
              :value="i.id"
            ></el-option>
          </el-select>
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
          @click="addSeckillBtn"
          >添 加</el-button
        >
        <el-button
          type="primary"
          v-if="info.type == '编辑'"
          @click="modifySeckillBtn"
          >编 辑</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { addSeckill, modifySeckill } from "../../../utils/request";
export default {
  data() {
    return {
      formLabelWidth: "120px",
      form: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1
      },
      duration: ""
    };
  },
  props: ["info"],
  computed: {
    // 点击一级商品分类获取二级商品分类
    cateListChidren() {
      if (this.form.first_cateid) {
        let nowChidren;
        this.cateList.forEach(i => {
          if (i.id == this.form.first_cateid) {
            nowChidren = i.children;
          }
        });
        return nowChidren;
      }
      return [];
    },
    ...mapGetters({
      seckillList: "seckill/seckillList",
      cateList: "cate/cateList",
      goodsList: "goods/goodsList"
    })
  },
  methods: {
    // 一级商品目录值改变,二级商品目录初始化
    firstCateChange() {
      this.form.second_cateid = "";
    },
    // 点击二级商品分类获取对应分类商品列表
    secondCateChange() {
      // 获取已添加商品全部列表
      let isCate = {
        fid: this.form.first_cateid,
        sid: this.form.second_cateid
      };
      this.acGoodsList({ isCate });
    },
    addSeckillBtn() {
      // console.log(this.duration);
      if (!this.testForm()) {
        return;
      }
      addSeckill(this.form).then(res => {
        this.$message({
          type: "success",
          duration: 1000,
          message: "添加操作成功"
        });
        this.cancel();
        this.acSeckillList();
      });
    },
    // 接收seckillList文件传来的数据,更新表单内容.从而编辑
    updataForm(data) {
      this.duration = [data.begintime, data.endtime];
      this.form = data;
    },
    // 编辑按钮
    modifySeckillBtn() {
      // console.log(this.form);
      if (!this.testForm(true)) {
        return;
      }
      modifySeckill(this.form).then(res => {
        console.log(this.form);
        if (res.data.code != 200) {
          this.$message.error(res.data.msg);
          return;
        }
        this.$message({
          type: "success",
          duration: 1000,
          message: "修改秒杀活动操作成功"
        });
        this.cancel();
        this.acSeckillList();
      });
    },
    cancel() {
      this.info.show = false;
      this.form = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1
      };
      this.duration = "";
    },
    testForm(modify) {
      // 秒杀活动期限期限
      this.form.begintime = this.duration[0]
      this.form.endtime = this.duration[1]
      // console.log(this.duration[0].getTime(),this.duration[1].getTime());
      console.log(this.form);
      // 判断弹出框是否填写完整
      const A = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: ""
      };
      const B = this.form;
      for (const k in A) {
        if (A[k] == B[k]) {
          this.$message.error("请检查输入内容是否有误!");
          return false;
        }
      }
      if (modify) {
        return true;
      }
      if (this.seckillList.some(i => i.title == this.form.title)) {
        this.$message.error("秒杀活动已存在，不能重复!");
        return false;
      }
      return true;
    },
    ...mapActions({
      acSeckillList: "seckill/acSeckillList",
      acGoodsList: "goods/acGoodsList",
      acCateList: "cate/acCateList"
    })
  },
  mounted() {
    // 获取商品分类列表
    this.acCateList();
  }
};
</script>

<style scoped>
.avatar-uploader >>> .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader >>> .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
