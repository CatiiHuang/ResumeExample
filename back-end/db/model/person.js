const mongoose = require('mongoose');
const  schema = new mongoose.Schema({
    name:{ type:String },
    workstate:{ type:String },
    birthday:{ type:String },
    phone:{ type:String },
    email:{ type:String },
    wechatnumber:{ type:String },
    avterurl:{ type:String },
    userid:{ type:Number },
    sex:{ type:String  }
});
module.exports = mongoose.model('Person',schema);
