const express=require("express");
const path=require("path");
const db=require("./config/mongoose");
const Contact=require("./models/contact");
const port=8000;
const app=express();
app.use(express.urlencoded());
app.use(express.static("assets"));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.get("/",function(req,res){
    Contact.find({},function(err,contacts){
        if(err){
            console.log('Error in fetching contacts from db');
            return ;
        }
        return res.render("home",{
            title : "Contacts-list",
            contact_list:contacts
        });
    })        
});
app.get('/delete-contact/',function(req,res){
    let id=req.query.id;
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log("their is error in delete contact by id");
            return;
        }
        return res.redirect('back');
    });
});
app.post("/create-contact",function(req,res){
    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    },function(err,newContact){
        if(err){
            console.log(err,"error in creating contact");
            return;
        }
        console.log("**************",newContact);
        return res.redirect('back');
    });
});
app.listen(port,function(err){
    if(err){
        console.log("hi server is not working",err);
        return;
    }
    console.log("yup! our server is up & running",port);
});
