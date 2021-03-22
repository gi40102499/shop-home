<template>
  <div id="dialog">
    <el-dialog
      :title="info.title"
      :visible.sync="info.show"
      :beforeClose="cancel"
      @opened="openDiaLog"
    >
      <el-form :model="form">
        <!--  -->
        <el-form-item label="一级分类" :label-width="formLabelWidth">
          <el-select v-model="form.first_cateid" @change="firstCateChange">
            <el-option label="--请选择--" disabled :value="10000"></el-option>
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
          <el-select v-model="form.second_cateid">
            <el-option label="--请选择--" disabled :value="10000"></el-option>
            <el-option
              v-for="i in cateListChidren"
              :key="i.id"
              :label="i.catename"
              :value="i.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!--  -->
        <el-form-item label="商品名称" :label-width="formLabelWidth">
          <el-input
            v-model="form.goodsname"
            autocomplete="off"
            placeholder="请输入商品名称"
          ></el-input>
        </el-form-item>
        <!--  -->
        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input
            v-model="form.price"
            autocomplete="off"
            placeholder="请输入价格"
          ></el-input>
        </el-form-item>
        <!--  -->
        <el-form-item label="市场价格" :label-width="formLabelWidth">
          <el-input
            v-model="form.market_price"
            autocomplete="off"
            placeholder="请输入市场价格"
          ></el-input>
        </el-form-item>
        <!--  -->
        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="uploadImg"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <!--  -->
        <el-form-item label="商品规格" :label-width="formLabelWidth">
          <el-select v-model="form.specsid" @change="specsattrArrChange">
            <el-option label="--请选择--" disabled :value="10000"></el-option>
            <el-option
              v-for="i in specsList"
              :key="i.id"
              :label="i.specsname"
              :value="i.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!--  -->
        <el-form-item label="规格属性" :label-width="formLabelWidth">
          <template>
            <el-select
              v-model="specsattrArr"
              multiple
              filterable
              allow-create
              default-first-option
              placeholder="请选择规格属性"
            >
              <el-option
                v-for="item in specsListAttrs"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </template>
        </el-form-item>
        <!--  -->
        <el-form-item label="是否新品" :label-width="formLabelWidth">
          <el-radio v-model="form.isnew" :label="1">是</el-radio>
          <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>
        <!--  -->
        <el-form-item label="是否热卖" :label-width="formLabelWidth">
          <el-radio v-model="form.ishot" :label="1">是</el-radio>
          <el-radio v-model="form.ishot" :label="2">否</el-radio>
        </el-form-item>
        <!--  -->
        <el-form-item label="商品状态" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
        <!--  -->
        <el-form-item label="描述" :label-width="formLabelWidth">
          <div id="wangedit"></div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button
          type="primary"
          v-if="info.type == '添加'"
          @click="addGoodsBtn"
          >添 加</el-button
        >
        <el-button
          type="primary"
          v-if="info.type == '编辑'"
          @click="modifyGoodsBtn"
          >编 辑</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import E from "wangeditor";
import { mapActions, mapGetters } from "vuex";
import { addGoods, modifyGoods } from "../../../utils/request";
export default {
  data() {
    return {
      formLabelWidth: "180px",
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: "",
        isnew: 1,
        ishot: 1,
        status: 1
      },
      imageUrl: "",
      specsattrArr: [],
      editor: null //富文本初始状态
    };
  },
  props: ["info"],
  computed: {
    // 商品二级分类
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
    // 规格
    specsListAttrs() {
      if (this.form.specsid) {
        let nowAttrs;
        this.specsList.forEach(i => {
          // console.log(nowAttrs,i.id,this.form.specsid);
          if (i.id == this.form.specsid) {
            nowAttrs = i.attrs;
          }
        });
        return nowAttrs;
      }
      return [];
    },
    ...mapGetters({
      cateList: "cate/cateList",
      specsList: "specs/specsList"
    })
  },
  methods: {
    // 打开弹窗时的事件,创建富文本编辑框
    openDiaLog() {
      this.editor = new E("#wangedit");
      this.editor.create();
      // 防止富文本嵌套富文本
      this.editor.txt.html(this.form.description);
    },
    // 一级目录值改变,二级目录初始化
    firstCateChange() {
      this.form.second_cateid = "";
    },
    // 商品规格改变时,商品属性初始化
    specsattrArrChange() {
      this.specsattrArr = [];
    },
    // 上传照片
    uploadImg(file) {
      console.log(file);
      // 判断图片类型,不采用type判断.用文件后缀判断
      let imgType = [".jpg", ".png", ".jpeg", ".gif"];
      let nowImgType = file.name.slice(file.name.lastIndexOf("."));
      // const isJPG = file.type === "image/jpeg";
      // 判断文件大小
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!imgType.some(item => item == nowImgType)) {
        this.$message.error("上传头像图片只能是" + imgType.join("|") + "格式!");
        return;
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
        return;
      }
      // 上传图片,并显示在img标签中
      this.imageUrl = URL.createObjectURL(file.raw);
      this.form.img = file.raw;
    },
    addGoodsBtn() {
      // console.log(this.form);
      // 调用验证方法,如有未填写内容不予通过
      if (!this.testDialog()) {
        this.$message.error("请输入完整信息");
        return;
      }
      addGoods(this.form).then(res => {
        this.$message({
          type: "success",
          duration: 1000,
          message: "添加操作成功"
        });
        this.cancel();
        this.acGoodsCount();
        this.acGoodsList();
      });
    },
    // 接收goodsList文件传来的数据,更新表单内容.从而编辑
    updataForm(data) {
      console.log(data);
      this.form = data;
      this.imageUrl = this.$localhost + data.img;
      this.specsattrArr = JSON.parse(data.specsattr);
    },
    // 编辑按钮
    modifyGoodsBtn() {
      if (!this.testDialog()) {
        this.$message.error("请输入完整信息");
        return;
      };
      // console.log(this.form);
      modifyGoods(this.form).then(res => {
        this.$message({
          type: "success",
          duration: 1000,
          message: "编辑操作成功"
        });
        this.cancel();
        this.acGoodsList();
      });
    },
    cancel() {
      this.info.show = false;
      this.form = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: null,
        market_price: null,
        img: null,
        description: "",
        specsid: "",
        specsattr: "",
        isnew: 1,
        ishot: 1,
        status: 1
      };
      this.imageUrl = "";
      this.specsattrArr = [];
    },
    // 验证表单所有信息是否已经更改
    testDialog() {
      // 富文本内容赋值
      this.form.description = this.editor.txt.html();
      // 商品属性数组转换字符串赋值
      this.form.specsattr = JSON.stringify(this.specsattrArr);
      const A = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: ""
      };
      const B = this.form;
      for (const k in A) {
        if (A[k] == B[k]) {
          return false;
        }
      }
      return true;
    },

    ...mapActions({
      acCateList: "cate/acCateList",
      acSpecsList: "specs/acSpecsList",
      acGoodsCount: "goods/acGoodsCount",
      acGoodsList: "goods/acGoodsList"
    })
  },
  mounted() {
    this.acCateList();
    this.acSpecsList(true);
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
/* 输入框过长,缩短 */
.el-input {
  width: 280px;
}
</style>
