var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var alog=new Schema({
    email:String,
    password:String

});

module.exports=mongoose.model("admin_login",alog);