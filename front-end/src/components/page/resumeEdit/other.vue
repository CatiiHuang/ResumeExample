<template>
    <div class="advantage_warp">
        <div class="show_wrap" v-if="!editFlag">
            <div class="warp_head">
                <span></span>
                <p>其它技能或者证书</p>
            </div>
            <div class="cont" @click="edit">
                <p>{{formData.cont}}</p>
                <el-button type="text" class="btn">编辑</el-button>
            </div>
        </div>
        <div class="edit_wrap" v-else>
            <div class="title">
                其它技能或者证书
            </div>
            <el-form :label-position="labelPosition" label-width="80px"  :model="formData">
                <el-row>
                    <el-col class="form_item" :xs="24" :md="24">
                        <el-form-item label="名称">
                            <el-input v-model="formData.cont" :rows="4" type="textarea"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="btns">
                    <el-button plain @click="cancel">取消</el-button>
                    <el-button type="primary" @click=save>完成</el-button>
                </el-row>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "other",
        props:["userId"],
        data(){
            return{
                editFlag:false,
                labelPosition:'top',
                formData:{
                    cont:""
                }
            }
        },
        created(){
          this.getInfo();
        },
        methods:{
            getInfo(){
                this.$http.get("/getOwn/"+this.userId).then(res=>{
                    this.formData.cont = res.data.jineng;
                    this.formData.userid = res.data.userid;
                })
            },
            edit(){
                this.copy = JSON.parse(JSON.stringify(this.formData));
                this. editFlag = true;
            },
            cancel(){
                this.formData = this.copy;
                this.editFlag = false;
            },
            save(){
                if(this.formData.cont.length<=0){
                    this.$message({type:"warning",message:"内容不能为空！"})
                    return;
                }
                this.$http.post("/uoDateJn",this.formData).then(res=>{
                    if(res.status == 200){
                        this.editFlag = false;
                        this.$message({
                            type:"success",
                            message:"修改成功！"
                        })
                        this.getInfo()
                    }
                });
            }
        }
    }
</script>

<style scoped lang="less">
    .el-form{
        padding: 0;
    }
    .advantage_warp{
        padding: 26px 0 15px;
        .edit_wrap{
            background-color: #f8f9fb;
            padding: 20px 30px;
            .btns{
                text-align: right;
                padding-right: 30px;
            }
            .form_item{
                padding: 0 30px;
            }
            .title{
                color: #24272e;
                font-size: 16px;
                font-weight: 500;
                margin: 0 0 16px 30px;
            }
        }
        .show_wrap{
            padding: 0 30px;
            .cont{
                display: flex;
                justify-content: start;
                padding-right: 20px;
                &:hover{
                    background-color: #f2f4f9;
                }
                .btn{
                    align-self: flex-start;
                }
                p{
                    flex: auto;
                    padding: 15px 20px;
                    color: #61687c;
                    white-space: pre-wrap;
                    overflow: hidden;
                    word-break: break-all;
                    cursor: pointer;
                }

            }
            .warp_head{
                display: flex;
                justify-content: start;
                align-items: center;
                p{
                    font-size: 18px;
                    margin-left: 15px;
                }
                span{
                    width: 3px;
                    height: 14px;
                    background-color: #53cac3;
                }
            }
        }

    }
</style>
