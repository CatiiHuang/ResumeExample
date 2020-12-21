<template>
  <div class="big_warp">
    <div class="show_wrap" v-if="!editFlag">
      <div class="warp_head">
        <div>
          <span></span>
          <p>工作经历</p>
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
          <!--                    实习经历-->
          <div class="item_title">
            <div class="head">
              <div class="componey_name">{{ item.name }}</div>
              <div class="work_time">
                {{ item.workTime[0] + " 至 " + item.workTime[1] }}
              </div>
            </div>
            <div class="title_btns">
              <el-button type="text" @click.stop="delItem(item._id)"
                >删除</el-button
              >
              <el-button type="text">编辑</el-button>
            </div>
          </div>
          <div class="item_body">
            <div class="bm">
              <div>{{ item.workBm }}</div>
              <div></div>
              <div>{{ item.workType }}</div>
            </div>
            <div class="work_cont">
              内容：<span>{{ item.workCont }}</span>
            </div>
            <div class="work_cont">
              业绩：<span>{{ item.workYj }}</span>
            </div>
            <div class="jineng">
              <p v-for="it in item.jineng" :key="it">{{ it }}</p>
            </div>
          </div>
          <!--                    实习经历-->
        </div>
      </div>
    </div>
    <div class="edit_wrap" v-else>
      <internshipEdit
        :formData="editObject"
        :flag="flag"
        @editSave="save"
      ></internshipEdit>
    </div>
  </div>
</template>

<script>
import internshipEdit from "./internshipEdit";
export default {
  name: "internship",
  props: ["userId"],
  data() {
    return {
      editFlag: false,
      labelPosition: "top",
      editObject: "", //传递对象
      flag: "",
      formDataArr: [
        {
          name: "",
          workBm: "",
          workName: "",
          workType: "",
          workTime: [],
          jineng: [],
          workCont: "",
          workYj: "",
        },
      ],
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      this.$http.get("/getWorkExp/" + this.userId).then((res) => {
        this.formDataArr = res.data;
      });
    },
    delItem(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$http.get("/delWorExp?id=" + id).then((res) => {
            if (res.data) {
              this.$message({ type: "success", message: "删除成功！" });
              this.getInfo();
            }
          });
        })
        .catch();
    },
    //添加
    addItem() {
      //初始化数据
      this.editObject = {
        name: "",
        major: "",
        workBm: "",
        workName: "",
        workType: "",
        hy: "",
        workTime: "",
        jineng: [],
        workCont: "",
        workYj: "",
        userid: this.userId,
      };
      //改变标志 添加
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
    //保存
    save(msg, obj) {
      if (msg == "cancel") {
        this.editFlag = false;
      } else if (msg == "add") {
        this.$http.post("/addWorkExp", obj).then((res) => {
          if (res.status == 200) {
            this.$message({ type: "success", message: "添加成功！" });
            this.editFlag = false;
            this.getInfo();
          }
        });
      } else if (msg == "edit") {
        this.$http.post("/editWorkExp", obj).then((res) => {
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
    internshipEdit,
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
          .item_title {
            .title_btns {
              display: block;
            }
          }
        }
        .item_body {
          .jineng {
            p {
              display: inline-block;
              font-size: 12px;
              box-sizing: border-box;
              line-height: 20px;
              color: #9fa3b0;
              padding: 0 14px;
              margin-right: 10px;
              border: 1px solid #cfd1d7;
              border-radius: 50px;
            }
          }
          .work_cont {
            color: #61687c;
            font-weight: 700;
            font-size: 14px;
            margin-bottom: 10px;
            span {
              font-weight: normal;
            }
          }
          .bm {
            margin-bottom: 10px;
            div:nth-of-type(2) {
              width: 1px;
              background: #cccccc;
              margin: 0 20px;
              height: 15px;
            }
            div {
              line-height: 15px;
              font-size: 15px;
              display: inline-block;
              vertical-align: middle;
              max-width: 140px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
        .item_title {
          display: flex;
          justify-content: space-between;
          padding-right: 20px;
          .title_btns {
            display: none;
          }
          .head {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-bottom: 20px;
            color: #9fa3b0;
            font-size: 12px;
            .componey_name {
              max-width: 420px;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              font-size: 15px;
              color: #414a60;
              margin-right: 20px;
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
