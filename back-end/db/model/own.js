const mongoose = require('mongoose');
const  schema = new mongoose.Schema({
    youshi:{ type:String },
    jineng:{ type:String },
    userid:{ type:Number }

});
module.exports = mongoose.model('Own',schema);
