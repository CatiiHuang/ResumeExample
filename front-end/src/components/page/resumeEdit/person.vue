<template>
  <div class="person_box">
    <div class="model_head">
      <div>最后更新 2020.01.07 14:53</div>
      <a href="#"></a>
    </div>
    <div class="show_msg" v-if="!editFlag">
      <div class="info_flex">
        <div class="info">
          <div class="name">{{ formData.name }}</div>
          <div class="info_labels">
            <div>{{ formData.workstate }}</div>
            <div>{{ formData.email }}</div>
            <div>{{ formData.sex }}</div>
            <div>{{ formData.phone }}</div>
          </div>
        </div>
        <img :src="formData.avterurl" alt="" />
      </div>
      <div class="bottom">
        <el-button type="text" @click="edit">编辑</el-button>
      </div>
    </div>
    <div class="edit_wrap" v-else>
      <div class="title">
        编辑个人信息
      </div>
      <el-form
        :label-position="labelPosition"
        ref="myForm"
        :rules="rules"
        label-width="80px"
        :model="formData"
      >
        <el-row>
          <el-col class="form_item" :xs="24" :md="12">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="formData.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="form_item" :xs="24" :lg="12">
            <el-form-item label="头像">
              <div class="avatar-upload">
                <el-upload
                  class="avatar-uploader"
                  action="/api/upload"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                >
                  <img
                    v-if="formData.avterurl"
                    :src="formData.avterurl"
                    class="avatar"
                  />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="form_item" :xs="24" :md="12">
            <el-form-item label="性别" prop="sex">
              <el-select
                v-model="formData.sex"
                style="width:100%"
                placeholder="请选择性别"
              >
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="form_item" :xs="24" :md="12">
            <el-form-item label="当前求职状态" prop="workstate">
              <el-select
                v-model="formData.workstate"
                style="width:100%"
                placeholder="请选择求职状态"
              >
                <el-option
                  label="离校-随时到岗"
                  value="离校-随时到岗"
                ></el-option>
                <el-option label="在校-兼职" value="在校-兼职"></el-option>
                <el-option label="在校-实习" value="在校-实习"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="form_item" :xs="24" :md="12">
            <el-form-item label="生日" prop="birthday">
              <el-date-picker
                style="width: 100%"
                v-model="formData.birthday"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="form_item" :xs="24" :md="12">
            <el-form-item label="微信号">
              <el-input v-model="formData.wechatnumber"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="form_item" :xs="24" :md="12">
            <el-form-item label="电话" prop="phone">
              <el-input v-model="formData.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="form_item" :xs="24" :md="12">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="formData.email"></el-input>
            </el-form-item>
          </el-col>
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
  name: "person",
  props: ["userId"],
  data() {
    return {
      imageUrl: "",
      editFlag: false,
      labelPosition: "top",
      rules: {
        name: [{ required: true, message: "请填写姓名", trigger: "blur" }],
        sex: [{ required: true, message: "请填写姓名", trigger: "blur" }],
        birthday: [{ required: true, message: "请填写生日", trigger: "blur" }],
        phone: [{ required: true, message: "请填写电话", trigger: "blur" }],
        email: [
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
      },
      formData: {},
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      this.$http.get("/getPerson/" + this.userId).then((res) => {
        this.formData = res.data;
      });
    },

    handleAvatarSuccess(res, file) {
      this.formData.avterurl = res.url;
    },
    edit() {
      console.log(123);
      this.copy = JSON.parse(JSON.stringify(this.formData));
      this.editFlag = true;
    },
    cancel() {
      this.formData = this.copy;
      this.editFlag = false;
    },
    save() {
      this.$refs["myForm"].validate((valid) => {
        if (valid) {
          this.$http.post("/updatePerson", this.formData).then((res) => {
            if (res.status == 200) {
              this.editFlag = false;
              this.$message({
                type: "success",
                message: "修改成功！",
              });
              this.getInfo();
            }
            // this.editFlag = false;
          });
          console.log(this.formData);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped lang="less">
.avatar-uploader {
  height: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 75px;
  border: 1px solid #cccccc;
}
.el-icon-plus {
  height: 75px;
  width: 75px;
  line-height: 75px;
  text-align: center;
}
.avatar {
  width: 75px;
  height: 75px;
  display: block;
}

.person_box {
  .edit_wrap {
    background-color: #f8f9fb;
    padding: 20px 30px;
    .form_item {
      padding: 0 30px;
    }
    .btns {
      text-align: right;
      padding-right: 30px;
    }
    .title {
      color: #24272e;
      font-size: 16px;
      font-weight: 500;
      margin: 0 0 16px 30px;
    }
  }
  .show_msg {
    padding: 0 30px;
    .info_flex {
      display: flex;
      justify-content: flex-start;

      .info_labels {
        display: flex;
        flex-wrap: wrap;
        justify-content: start;
        align-items: center;
        font-size: 14px;
        line-height: 1.5;
        color: #414a60;
        div {
          overflow: hidden;
          padding: 0 20px;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 250px;
        }
        div:last-of-type {
          border-right: none;
        }
      }
      .info {
        flex: auto;
        .name {
          font-size: 24px;
          margin-bottom: 20px;
        }
      }
      img {
        display: block;
        width: 70px;
        height: 70px;
        border-radius: 50%;
      }
    }
  }
  .model_head {
    display: flex;
    justify-content: space-between;
    padding: 0 30px;
    padding-bottom: 10px;

    div:first-of-type {
      font-size: 12px;
      color: #9fa3b0;
    }
    a:last-of-type {
      text-decoration: none;
      font-size: 14px;
      color: #414a60;
    }
  }
  .bottom {
    padding-bottom: 10px;
    border-bottom: 1px solid #f2f3f3;
    text-align: right;
    padding-right: 20px;
  }
}
</style>
