<template>
  <div class="advantage_warp">
    <div class="show_wrap" v-if="!editFlag">
      <div class="warp_head">
        <span></span>
        <p>求职意向</p>
      </div>
      <div class="cont" @click="edit">
        <div>
          <p>{{ formData.qwzw }}</p>
          <p>{{ formData.xzyq }}</p>
          <p>{{ formData.hy }}</p>
          <p>{{ formData.city }}</p>
          <p>{{ formData.workType }}</p>
        </div>
        <el-button type="text" class="btn">编辑</el-button>
      </div>
    </div>
    <div class="edit_wrap" v-else>
      <div class="title">编辑期望职位</div>
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="formData"
      >
        <el-row>
          <el-col class="form_item" :xs="24" :md="12">
            <el-form-item label="期望职位">
              <el-select
                v-model="formData.qwzw"
                style="width:100%"
                placeholder="请选择期望职位"
              >
                <el-option label="前端" value="前端"></el-option>
                <el-option label="后端" value="后端"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="form_item" :xs="24" :md="12">
            <el-form-item label="期望薪资">
              <el-select
                v-model="formData.xzyq"
                style="width:100%"
                placeholder="请选择期望薪资"
              >
                <el-option label="10k" value="10k"></el-option>
                <el-option label="20k" value="20k"></el-option>
                <el-option label="30k" value="30k"></el-option>
                <el-option label="60k" value="60k"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="form_item" :xs="24" :md="12">
            <el-form-item label="期望行业">
              <el-select
                v-model="formData.hy"
                style="width:100%"
                placeholder="请选择期望行业"
              >
                <el-option label="互联网" value="互联网"></el-option>
                <el-option label="其它行业" value="其它"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="form_item" :xs="24" :md="12">
            <el-form-item label="工作地">
              <el-select
                v-model="formData.city"
                style="width:100%"
                placeholder="请选择期城市"
              >
                <el-option label="北京" value="北京"></el-option>
                <el-option label="上海" value="上海"></el-option>
                <el-option label="深圳" value="深圳"></el-option>
                <el-option label="重庆" value="重庆"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="form_item">
          <el-col :xs="6" :lg="3">工作性质：</el-col>
          <el-radio-group class="form_item" v-model="formData.workType">
            <el-radio label="全职">全职</el-radio>
            <el-radio label="兼职">兼职</el-radio>
            <el-radio label="实习">实习</el-radio>
          </el-radio-group>
        </el-row>
        <el-row class="btns">
          <el-button plain @click="cancel">取消</el-button>
          <el-button type="primary" @click="save">完成</el-button>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  props: ["userId"],
  name: "advantage",
  data() {
    return {
      editFlag: false,
      labelPosition: "",
      formData: {
        qwzw: "",
        xzyq: "2",
        hy: "",
        city: "",
        workType: "",
      },
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      this.$http.get("/getQzyx/" + this.userId).then((res) => {
        this.formData = res.data;
      });
    },
    edit() {
      this.copy = JSON.parse(JSON.stringify(this.formData));
      this.editFlag = true;
    },
    cancel() {
      this.formData = this.copy;
      this.editFlag = false;
    },
    save() {
      this.$http.post("/upDateQzyx", this.formData).then((res) => {
        if (res.status == 200) {
          this.editFlag = false;
          this.$message({
            type: "success",
            message: "修改成功！",
          });
          this.getInfo();
        }
      });
    },
  },
};
</script>

<style scoped lang="less">
.form_item {
  padding: 0 30px;
}
.el-form {
  padding: 0;
}
.advantage_warp {
  padding: 26px 0 15px;
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
  .show_wrap {
    padding: 0 30px;
    .cont {
      display: flex;
      justify-content: start;
      padding-right: 20px;
      &:hover {
        background-color: #f2f4f9;
      }
      .btn {
        align-self: flex-start;
      }
      div {
        flex: auto;
        flex-wrap: wrap;
        display: flex;
        justify-content: flex-start;
        padding: 7px 10px;
        color: #61687c;
        cursor: pointer;
        p {
          overflow: hidden;
          padding: 0 20px;

          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 250px;
          font-size: 14px;
          line-height: 1.5;
          color: #414a60;
          &:last-of-type {
            border-right: none;
          }
        }
      }
    }
    .warp_head {
      display: flex;
      justify-content: start;
      align-items: center;
      p {
        font-size: 18px;
        margin-left: 15px;
      }
      span {
        width: 3px;
        height: 14px;
        background-color: #53cac3;
      }
    }
  }
}
</style>
