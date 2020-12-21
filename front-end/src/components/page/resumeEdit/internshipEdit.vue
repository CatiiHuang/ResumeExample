<template>
  <div class="edit_wrap">
    <div class="title">工作经历</div>
    <el-form
      :label-position="labelPosition"
      :rules="rules"
      label-width="80px"
      ref="myForm"
      :model="formData"
    >
      <el-row>
        <el-col class="form_item" :xs="24" :md="12">
          <el-form-item label="公司名称" prop="name">
            <el-input v-model="formData.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="form_item" :xs="24" :md="12">
          <el-form-item label="所属行业" prop="hy">
            <el-select v-model="formData.hy" style="width: 100%">
              <el-option label="计算机行业" value="计算机行业"></el-option>
              <el-option label="其它行业" value="其它行业"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="form_item" :xs="24" :md="12">
          <el-form-item label="所属部门(选填)">
            <el-input v-model="formData.workBm"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="form_item" :xs="24" :md="12">
          <el-form-item label="职位名称(选填)">
            <el-input v-model="formData.workName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="form_item" :xs="24" :md="12">
          <el-form-item label="职位类型" prop="workType">
            <el-select v-model="formData.workType" style="width: 100%">
              <el-option label="程序开发" value="程序开发"></el-option>
              <el-option label="其它类型" value="其它类型"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col class="form_item" :xs="24" :md="12">
          <el-form-item label="在职时间" prop="workTime">
            <el-date-picker
              v-model="formData.workTime"
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
        <el-col class="form_item" :xs="24" :lg="24">
          <el-form-item label="技能标签" prop="jineng">
            <el-select
              v-model="formData.jineng"
              style="width: 100%"
              multiple
              filterable
              allow-create
              default-first-option
              placeholder="请选择技能标签"
            >
              <el-option label="java" value="java"></el-option>
              <el-option label="数据可视化" value="数据可视"></el-option>
              <el-option label="JavaScript" value="JavaScript"></el-option>
              <el-option label="Html" value="Html"></el-option>
              <el-option label="Vue" value="Vue"></el-option>
              <el-option label="Three.js" value="Three.js"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="form_item" :xs="24" :md="24">
          <el-form-item label="工作内容" prop="workCont">
            <el-input
              v-model="formData.workCont"
              :rows="4"
              type="textarea"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="form_item" :xs="24" :md="24">
          <el-form-item label="工作业绩(选填)">
            <el-input
              v-model="formData.workYj"
              :rows="4"
              type="textarea"
            ></el-input>
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
    formData: Object,
  },
  data() {
    return {
      labelPosition: "top",
      rules: {
        name: [{ required: true, message: "请输入公司名称", trigger: "blur" }],
        hy: [{ required: true, message: "请选择所属行业", trigger: "blur" }],
        jineng: [{ required: true, message: "请选择技能", trigger: "blur" }],
        workCont: [
          { required: true, message: "请填写工作内容", trigger: "blur" },
        ],
        workTime: [
          { required: true, message: "请填写工作时间", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    editCancel() {
      this.$emit("editSave", "cancel");
    },
    editOk() {
      this.$refs["myForm"].validate((valid) => {
        if (valid) {
          //校验成功
          if (this.flag == "add") {
            this.$emit("editSave", "add", this.formData);
          } else if (this.flag == "edit") {
            this.$emit("editSave", "edit", this.formData);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  name: "internshipEdit",
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
