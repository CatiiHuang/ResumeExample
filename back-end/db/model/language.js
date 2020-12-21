const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    userid:{ type:Number },
    langExp:{ type:String},
    cont:{ type:String}
});
module.exports = mongoose.model('Language',schema);
