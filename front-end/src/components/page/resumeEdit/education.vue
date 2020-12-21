<template>
  <div class="big_warp">
    <div class="show_wrap" v-if="!editFlag">
      <div class="warp_head">
        <div>
          <span></span>
          <p>教育经历</p>
        </div>
        <el-button type="text" class="add_btn" @click="addItem">添加</el-button>
      </div>
      <div class="cont">
        <div
          class="exp_item"
          v-for="(item, i) in formDataArr"
          @click="edit(item, i)"
          :key="i"
        >
          <!--                    教育经历-->
          <div class="school_head">
            <div class="head_l">
              <div>{{ item.schoolName }}</div>
              <div></div>
              <div style="color: #9fa3b0;font-size: 12px;">
                {{ item.schoolTime[0] + " 至 " + item.schoolTime[1] }}
              </div>
            </div>
            <div class="head_r">
              <el-button type="text" @click.stop="delItem(item._id)"
                >删除</el-button
              >
              <el-button type="text">编辑</el-button>
            </div>
          </div>
          <div class="school_body">
            <div class="majios">
              <div>{{ item.major }}</div>
              <div></div>
              <div>{{ item.xl }}</div>
            </div>
            <p>{{ item.schoolExp }}</p>
          </div>
          <!--                    教育经历-->
        </div>
      </div>
    </div>
    <div class="edit_wrap" v-else>
      <educationEdit
        :formData="editObject"
        :flag="flag"
        @editSave="save"
      ></educationEdit>
    </div>
  </div>
</template>

<script>
import educationEdit from "./educationEdit";
export default {
  name: "education",
  props: ["userId"],
  data() {
    return {
      editFlag: false,
      labelPosition: "top",
      editObject: "", //传递对象
      flag: "",
      formDataArr: [
        { schoolName: "", major: "", xl: "", schoolTime: [], schoolExp: "" },
      ],
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      this.$http.get("/getEducation/" + this.userId).then((res) => {
        this.formDataArr = res.data;
      });
    },
    //添加
    addItem() {
      //初始化数据
      this.editObject = {
        schoolName: "",
        major: "",
        xl: "",
        schoolTime: "",
        schoolExp: "",
        userid: this.userId,
      };
      //改变标志 添加
      console.log(this.editObject);
      this.flag = "add";
      //显示组件
      this.editFlag = true;
    },
    edit(item, i) {
      this.index = i;
      this.editObject = item;
      this.flag = "edit";
      this.editFlag = true;
    },
    delItem(id) {
      this.$confirm("确定删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$http.get("/delEducation?id=" + id).then((res) => {
            if (res.data) {
              this.$message({ type: "success", message: "删除成功！" });
              this.getInfo();
            }
          });
        })
        .catch();
    },
    //保存
    save(msg, obj) {
      if (msg == "cancel") {
        this.editFlag = false;
      } else if (msg == "add") {
        this.$http.post("/addEducation", obj).then((res) => {
          if (res.status == 200) {
            this.$message({ type: "success", message: "添加成功！" });
            this.editFlag = false;
            this.getInfo();
          }
        });
      } else if (msg == "edit") {
        this.$http.post("/editEducation", obj).then((res) => {
          if (res.status == 200) {
            this.$message({ type: "success", message: "修改成功！" });
            this.editFlag = false;
            this.getInfo();
          }
        });
      }
      this.index = -1;

      this.editObject = {};
    },
  },
  components: {
    educationEdit,
  },
};
</script>

<style scoped lang="less">
.el-form {
  padding: 0;
}
.big_warp {
  padding: 26px 0 15px;
  .edit_wrap {
    background-color: #f8f9fb;
    padding: 20px 30px;
  }
  .show_wrap {
    padding: 0 30px;
    .cont {
      .exp_item {
        padding: 7px;
        padding-left: 20px;
        &:hover {
          background-color: #f2f4f9;
          .school_head {
            .head_r {
              display: block;
            }
          }
        }
        .school_body {
          p {
            color: #61687c;
            white-space: pre-wrap;
            font-size: 14px;
            overflow: hidden;
            word-break: break-all;
          }
          .majios {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            div {
              line-height: 34px;
              font-size: 15px;
              display: inline-block;
              vertical-align: middle;
              max-width: 140px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            div:nth-of-type(2) {
              width: 1px;
              height: 16px;
              background-color: #ccc;
              margin: 0 20px;
            }
          }
        }
        .school_head {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
          .head_r {
            display: none;
            padding-right: 20px;
          }
          .head_l {
            display: flex;
            align-items: center;
            div {
              line-height: 34px;
              font-size: 16px;
              display: inline-block;
              vertical-align: middle;
              max-width: 180px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            div:last-of-type {
              margin-left: 30px;
              font-size: 15px;
            }
          }
        }
      }
    }
    .warp_head {
      display: flex;
      justify-content: space-between;
      padding-right: 20px;
      align-items: center;

      div {
        display: flex;
        justify-content: flex-start;
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
}
</style>
