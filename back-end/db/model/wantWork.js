const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    qwzw:{ type:String },
    xzyq:{ type:String },
    hy:{ type:String },
    city:{ type:String },
    workType:{ type:String },
    userid:{ type:Number }
});
module.exports = mongoose.model('WantWork',schema);
