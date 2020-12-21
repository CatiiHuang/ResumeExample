module.exports = app =>{
  const express = require('express');
  const router = express.Router();
  const Person = require('../../db/model/person');
  const Own = require('../../db/model/own');
  const WantWork = require('../../db/model/wantWork');
  const Language = require('../../db/model/language');
  const WorkExp = require('../../db/model/workExp');
  const Education = require('../../db/model/education');

  //添加工作经历
    router.post('/addEducation',(req,res)=>{
        Education.create(req.body,(err,docs)=>{
            console.log(docs);
            console.log(err);
            res.send(docs)
        })
    });
  //修改教育经历单项
    router.post('/editEducation',(req,res)=>{
        Education.updateOne({_id:req.body._id},req.body,(err,docs)=>{
            res.send(docs)
        })
    });
  //获取教育经历数组
    router.get("/getEducation/:id",(req,res)=>{
        let id = req.params.id;
        Education.find({userid:id},(err,docs)=>{
            res.send(docs);
        })
    });
  //删除工作经历单项
    router.get('/delWorExp',(req,res)=>{
        WorkExp.findByIdAndDelete(req.query.id,(err,docs)=>{
            res.send(docs);
        })
    });
  //修改工作经历单项
    router.post('/editWorkExp',(req,res)=>{
        WorkExp.updateOne({_id:req.body._id},req.body,(err,docs)=>{
            res.send(docs)
        })
    });
  //添加工作经历
    router.post('/addWorkExp',(req,res)=>{
        WorkExp.create(req.body,(err,docs)=>{
            res.send(docs)
        })
    });
  //获取工作经历列表
    router.get("/getWorkExp/:id",(req,res)=>{
       let id = req.params.id;
        WorkExp.find({userid:id},(err,docs)=>{
           res.send(docs);
       })
    });
  //获取求职意向
    router.get('/getLanguage/:id',(req,res)=>{
        let id = req.params.id;
        Language.findOne({userid:id},async (err,docs)=>{
            if(!docs){
                let x = await Language.create({
                    langExp:"",
                    cont:"",
                    userid:id
                });
                res.send(x);
                return ;
            }
            res.send(docs);
        });
    });
  //修改语言技能
    router.post('/upDateLanguage',(req,res)=>{
        Language.updateOne({userid:req.body.userid},{$set:req.body},(err,docs)=>{
            res.send(docs);
        });
    });
  //修改求职意向
    router.post('/upDateQzyx',(req,res)=>{
       WantWork.updateOne({userid:req.body.userid},{$set:req.body},(err,docs)=>{
           res.send(docs);
       });
    });
  //获取求职意向
    router.get('/getQzyx/:id',(req,res)=>{
        let id = req.params.id;
        WantWork.findOne({userid:id},async (err,docs)=>{
            if(!docs){
                let x = await WantWork.create({
                    qwzw:"",
                    xzyq:"",
                    hy:"",
                    city:"",
                    workType:"",
                    userid:id
                });
                res.send(x);
                return ;
            }
            res.send(docs);
        });

    });
    //修改个人技能
    router.post('/uoDateJn',async (req,res)=>{
        let x = await Own.updateOne({userid:req.body.userid},{$set:{jineng:req.body.cont}});
        res.send(x);
    });
  //修改个人优势
    router.post('/uoDateYs',async (req,res)=>{
        let x = await Own.updateOne({userid:req.body.userid},{$set:{youshi:req.body.cont}});
        res.send(x);
    });
  //获取个人优势
    router.get('/getOwn/:id',(req,res)=>{
        let id = req.params.id;
        Own.findOne({userid:id},async (err,docs)=>{
            if(!docs){
                let x = await Own.create({
                    youshi:"",
                    jineng:"",
                    userid:id
                });
                res.send(x);
                return ;
            }
            res.send(docs);
        })
    });

  //更新个人数据
    router.post('/updatePerson',(req,res)=>{
        Person.updateOne({userid:req.body.userid},{$set:req.body},(err,docs)=>{
            res.send(docs);
        })
    });
  //获取个人信息
  router.get('/getPerson/:id',(req,res)=>{
      const id = req.params.id;
      Person.findOne({userid:id},async (err,docs)=>{
          if(!docs){
               let x = await Person.create({
                   name:"",
                   workstate:"",
                   birthday:"",
                   phone:"",
                   email:"",
                   sex:"",
                   wechatnumber:"",
                   avterurl:"",
                   userid:id
               });
               res.send(x);
               return ;
          }
          res.send(docs);
      })
  });
  app.use('/api',router);
    //图片上传
    const multer = require('multer');
    const upload = multer({dest:__dirname + "/../../uploads"});
    app.post('/api/upload',upload.single('file'),async (req,res)=>{
        const  file = req.file;
        file.url = 'http://localhost:2333/uploads/'+file.filename;
        res.send(file);
    })
    app.use('/uploads',express.static(__dirname + '/../../uploads'));
};
