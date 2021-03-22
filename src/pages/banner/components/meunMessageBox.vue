<template>
  <div id="dialog">
    <el-dialog
      :title="info.title"
      :visible.sync="info.show"
      :beforeClose="cancel"
    >
      <el-form :model="form">
        <!--  -->
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input
            v-model="form.title"
            autocomplete="off"
            placeholder="请输入轮播图标题"
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
          @click="addBannerBtn"
          >添 加</el-button
        >
        <el-button
          type="primary"
          v-if="info.type == '编辑'"
          @click="modifyBannerBtn"
          >编 辑</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { addBanner, modifyBanner } from "../../../utils/request";
export default {
  data() {
    return {
      formLabelWidth: "120px",
      form: {
        title: "",
        img: "",
        status: 1
      },
      imageUrl: ""
    };
  },
  props: ["info"],
  computed: {
    ...mapGetters({
      bannerList: "banner/bannerList"
    })
  },
  methods: {
    addBannerBtn() {
      if (!this.testForm()) {
        return;
      }
      addBanner(this.form).then(res => {
        this.$message({
          type: "success",
          duration: 1000,
          message: "添加操作成功"
        });
        this.cancel();
        this.acBannerList();
      });
    },
    // 接收bannerList文件传来的数据,更新表单内容.从而编辑
    updataForm(data) {
      // this.imageUrl = this.$localhost + data.img;
      data.img = "";
      this.form = data;
    },
    // 编辑按钮
    modifyBannerBtn() {
      console.log(this.form);
      if (!this.testForm()) {
        return;
      }
      modifyBanner(this.form).then(res => {
        this.$message({
          type: "success",
          duration: 1000,
          message: "修改商品分类操作成功"
        });
        this.cancel();
        this.acBannerList();
      });
    },
    cancel() {
      this.info.show = false;
      this.form = {
        title: "",
        img: "",
        status: 1
      };
      this.imageUrl = "";
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
    ...mapActions({
      acBannerList: "banner/acBannerList"
    }),
    testForm() {
      // 判断弹出框是否填写完整
      if (!(this.form.title && this.form.img)) {
        this.$message.error("请检查输入内容");
        return false;
      };
      if (this.bannerList.some(i=>i.title==this.form.title)) {
        this.$message.error("轮播图标题已存在，不能重复！");
        return false;
      };
      return true
    }
  },
  mounted() {}
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
