const cloudinary=require("cloudinary");

//1 on doit faire le config

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME ,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
});

//cloudinary upload image function 

const cloudinaryUploadImage=async(fileToUpload)=>{
    try{
        const data= await cloudinary.v2.uploader.upload(fileToUpload, {timeout:60000}, function(error,result){}
 ,   {
            resource_type:'auto',

        }); 
     return data; 
    }catch(error){
        //return error;

        console.log(error)
      //  throw new Error("Internal server error(cloudeniary")

    }
}
//cloudinary delete image function 

const cloudinaryRemoveImage=async(ImagepublicId)=>{
    try{
       const result = await cloudinary.uploader.destroy(ImagepublicId)
       return result;

    }catch(error){
        console.log(error)
        // throw new Error("Internal server error(cloudeniary");
    }
}

//cloudinary delete  multiple image function 

const cloudinaryRemoveMultioleImage=async(ImagepublicId)=>{
    try{
       const result = await cloudinary.v2.api.delete_resources(ImagepublicId)
       return result;

    }catch(error){
        // console.log(error)
        // throw new Error("Internal server error(cloudeniary");
    }
}


module.exports={
    cloudinaryRemoveImage,cloudinaryUploadImage, cloudinaryRemoveMultioleImage}