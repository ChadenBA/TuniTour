//not found middleware

const notFound=(req,res,next)=>{
    const error =new Error(`not found -${req.originallUrl} `);
    res.status(404);
    next(error)
}

//Error handler middleware 
const errorHandler=(err,req,res,next)=>{
    const statusCode=res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message:err.message,
        //stack will gives us the path 
        stack:process.env.NODE_ENV === "production" ?  null :err.stack,
    });
}
module.exports={
    errorHandler,notFound
}