const mongoose=require('mongoose');
const contacListSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    }
});
const Contact=mongoose.model('Contact',contacListSchema);
module.exports=Contact;