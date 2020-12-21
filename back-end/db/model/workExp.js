const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    userid:{ type:Number },
    name:{ type:String },
    major:{ type:String },
    workBm:{ type:String },
    workName:{ type:String },
    workType:{ type:String },
    hy:{ type:String },
    workTime:{ type:Array },
    jineng:{ type:Array },
    workCont:{ type:String },
    workYj:{ type:String }
});
module.exports = mongoose.model('WorkExp',schema);
