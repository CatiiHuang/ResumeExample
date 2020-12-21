<template>
  <div class="edit_wrap">
    <div class="title">教育经历</div>
    <el-form
      :label-position="labelPosition"
      ref="myForm"
      :rules="rules"
      label-width="80px"
      :model="formData"
    >
      <el-row>
        <el-col class="form_item" :xs="24" :md="12">
          <el-form-item label="学校名称" prop="schoolName">
            <el-input v-model="formData.schoolName"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="form_item" :xs="24" :md="12">
          <el-form-item label="学历" prop="xl">
            <el-select v-model="formData.xl" style="width: 100%">
              <el-option label="本科" value="本科"></el-option>
              <el-option label="研究生" value="研究生"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="form_item" :xs="24" :md="12">
          <el-form-item label="专业" prop="major">
            <el-input v-model="formData.major"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="form_item" :xs="24" :md="12">
          <el-form-item label="在校时间" prop="schoolTime">
            <el-date-picker
              v-model="formData.schoolTime"
              type="daterange"
              style="width: 100%"
              range-separator="至"
              value-format="yyyy-MM-dd"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="form_item" :xs="24" :md="24">
          <el-form-item label="在校经历">
            <el-input v-model="formData.schoolExp" :rows="4" type="textarea"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="btns">
        <el-button plain @click="editCancel">取消</el-button>
        <el-button type="primary" @click="editOk">完成</el-button>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    flag: String,
    formData: Object
  },
  data() {
    return {
      labelPosition: "top",
      rules: {
        schoolName: [
          { required: true, message: "请填写学校名称", trigger: "blur" }
        ],
        xl: [{ required: true, message: "请填写学历", trigger: "blur" }],
        major: [{ required: true, message: "请填写专业", trigger: "blur" }],
        schoolTime: [
          { required: true, message: "请填写在校时间", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    editCancel() {
      this.$emit("editSave", "cancel");
    },
    editOk() {
      this.$refs["myForm"].validate(vali => {
        if (vali) {
          if (this.flag == "add") {
            this.$emit("editSave", "add", this.formData);
          } else if (this.flag == "edit") {
            this.$emit("editSave", "edit", this.formData);
          }
        } else {
          return false;
        }
      });
    }
  },
  name: "educationEdit"
};
</script>

<style scoped lang="less">
.el-form {
  padding: 0;
}
.edit_wrap {
  background-color: #f8f9fb;
  padding: 20px 30px;
  .btns {
    text-align: right;
    padding-right: 30px;
  }
  .form_item {
    padding: 0 30px;
  }
  .title {
    color: #24272e;
    font-size: 16px;
    font-weight: 500;
    margin: 0 0 16px 30px;
  }
}
</style>
