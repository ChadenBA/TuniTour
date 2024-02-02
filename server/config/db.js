const mongoose = require("mongoose")


module.exports = async ()=>{
    try{
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.MONGO_URI)
        console.log("conncted")

    }catch(error){
        // console.log("connexion failed to mongodb " , error)
    }
}