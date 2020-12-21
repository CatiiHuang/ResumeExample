module.exports = app =>{
    const mongoose = require('mongoose');
    mongoose.connect("mongodb://127.0.0.1:27017/grjl",{
        useNewUrlParser:true,
        useUnifiedTopology:true
    });
    const db = mongoose.connection;
    db.once('error',() => console.log('Mongo connection error'));
    db.once('success',() => console.log('Mongo connection success'));
};
