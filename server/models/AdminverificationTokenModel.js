const mongoose=require("mongoose");


//verification token schema
const VerificationTokenSchema = new mongoose.Schema({
    adminId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"admin",
        required:true,
    },
    token:{
        type:String,
        required:true,
    },
},{
    timestamps:true,
})

//verification token Model 
const VerficationToken = mongoose.model("verficationtoken", VerificationTokenSchema)
module.exports={
    VerficationToken,
}

