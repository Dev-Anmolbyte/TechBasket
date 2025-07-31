var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var clog=new Schema({
    email:String,
    password:String

});

module.exports=mongoose.model("customer_login",clog);