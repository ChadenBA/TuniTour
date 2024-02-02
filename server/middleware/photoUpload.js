const path = require("path")
const multer = require("multer")


//photo storge
//the place where the pic will be saved ( images)
const photoStorage = multer.diskStorage({
    destination:function(req, file,cb){
        cb(null,path.join(__dirname,"../images"))
    },
    filename:function(req,file,cb){
        if(file){
            cb(null, new Date().toISOString() + file.originalname)
        }else{
            cb(null,false)
        }
    }
})

//pic uplode middleware
//on doit filter les files pour que il accept juste des images (using filefilter)
const photoUpload=multer({
    storage:photoStorage,
    fileFilter:function(req,file,cb){
        if(file.mimetype.startsWith("image")){
            cb(null,true)
        }else{
            cb({message:"unsupported file format"},false)
        }
    },
   limits:{fileSize:1024*1024} //1Mo
})

module.exports=photoUpload;