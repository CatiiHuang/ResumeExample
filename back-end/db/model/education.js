const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    userid:{ type:Number },
    schoolName:{ type: String },
    major: {type: String },
    xl: {type: String },
    schoolTime:{type: Array },
    schoolExp:{type: String }
});
module.exports = mongoose.model('Education',schema)
